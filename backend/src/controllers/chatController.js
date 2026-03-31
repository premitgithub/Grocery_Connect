import { GoogleGenAI } from "@google/genai";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import dotenv from "dotenv";

dotenv.config();

// Initialize SDK. It will automatically pick up GEMINI_API_KEY from process.env 
// or you can explicitly pass it.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
You are an intelligent Grocery E-Commerce Assistant.
Your goal is to parse user messages (in ANY language) and return a STRICT JSON object representing their intent and actions. 
DO NOT wrap the output in markdown \`\`\`json blocks. Return ONLY the raw JSON string.
You must normalize spelling and translate foreign items into English base words (e.g. "seb" -> "apple", "pan" -> "bread").

Expected Output Format:
{
  "intent": "add_to_cart" | "clear_cart" | "remove_item" | "update_quantity" | "order_tracking" | "review_cart" | "proceed_checkout" | "general_query",
  "message": "A friendly conversational confirmation to display to the user.",
  "actions": {
    "items": [
      { "name": "string", "quantity": number }
    ]
  }
}

EXAMPLES:

User: "I need 2 milk and bread"
Output:
{"intent": "add_to_cart", "message": "I'll add those to your cart right away!", "actions": {"items": [{"name": "milk", "quantity": 2}, {"name": "bread", "quantity": 1}]}}

User: "clear my cart"
Output:
{"intent": "clear_cart", "message": "Cart cleared 🧹.", "actions": {"items": []}}

User: "mujhe 3 kilo apple chahiye"
Output:
{"intent": "add_to_cart", "message": "Added 3 apples to your cart 🛒", "actions": {"items": [{"name": "apple", "quantity": 3}]}}

User: "remove the grapes"
Output:
{"intent": "remove_item", "message": "Removed grapes from your cart.", "actions": {"items": [{"name": "grapes", "quantity": 0}]}}

User: "update apples to 5"
Output:
{"intent": "update_quantity", "message": "Updated apples quantity to 5.", "actions": {"items": [{"name": "apple", "quantity": 5}]}}

User: "let me pay"
Output:
{"intent": "proceed_checkout", "message": "Taking you to checkout...", "actions": {"items": []}}
`;

export const handleChatQuery = async (req, res) => {
  try {
    const { message, userId, phoneNumber } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "LLM API Key is missing. Please add GEMINI_API_KEY to .env" });
    }

    // Call the LLM (Gemini 2.5 Flash)
    const geminiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.1, // Keep it highly deterministic
        responseMimeType: "application/json",
      }
    });

    let aiOutput = geminiResponse.text;
    let parsedData;
    
    try {
       parsedData = JSON.parse(aiOutput);
    } catch (e) {
       console.error("Failed to parse LLM JSON:", aiOutput);
       // Fallback strip markdown if the model hallucinates it despite instructions
       aiOutput = aiOutput.replace(/```json/g, '').replace(/```/g, '').trim();
       parsedData = JSON.parse(aiOutput);
    }

    let { intent, message: responseMessage, actions } = parsedData;
    let data = { items: [] };

    // ==========================================
    // EXECUTION LAYER: Map Intents to Database Actions
    // ==========================================

    if (intent === "clear_cart") {
      if (phoneNumber) {
         await Cart.deleteMany({ userId: phoneNumber });
      } else {
         responseMessage = "Please log in to clear your cart!";
      }
    } 
    
    else if (intent === "remove_item") {
      if (phoneNumber && actions?.items?.length > 0) {
         const itemName = actions.items[0].name;
         // Fuzzy Match against Products
         const targetProduct = await Product.findOne({ name: { $regex: new RegExp(itemName, "i") } });
         if (targetProduct) {
            await Cart.deleteOne({ userId: phoneNumber, productId: targetProduct._id });
            responseMessage = `Removed ${targetProduct.name} from your cart 🗑️`;
         } else {
            responseMessage = `I couldn't find '${itemName}' in your cart.`;
         }
      } else if (!phoneNumber) { responseMessage = "Please log in to modify your cart."; }
    }
    
    else if (intent === "update_quantity") {
      if (phoneNumber && actions?.items?.length > 0) {
         const itemToUpdate = actions.items[0];
         const targetProduct = await Product.findOne({ name: { $regex: new RegExp(itemToUpdate.name, "i") } });
         
         if (targetProduct) {
            const cartItem = await Cart.findOne({ userId: phoneNumber, productId: targetProduct._id });
            if (cartItem) {
               cartItem.quantity = Math.max(1, itemToUpdate.quantity);
               await cartItem.save();
               responseMessage = `Updated ${targetProduct.name} quantity to ${cartItem.quantity} 🛒`;
            } else {
               responseMessage = `You don't have ${targetProduct.name} in your cart.`;
            }
         } else {
            responseMessage = `Could not find product '${itemToUpdate.name}'.`;
         }
      } else if (!phoneNumber) { responseMessage = "Please log in to update quantities!"; }
    }
    
    else if (intent === "add_to_cart") {
      if (phoneNumber && actions?.items?.length > 0) {
         const addedNames = [];
         
         for (const item of actions.items) {
            // Smart Catalog Matching (Fuzzy search)
            const bestProduct = await Product.findOne({
               name: { $regex: new RegExp(item.name, "i") },
               stock: { $gt: 0 }
            }).sort({ price: 1 });
            
            if (bestProduct) {
               const cartProduct = await Cart.findOne({ productId: bestProduct._id, userId: phoneNumber });
               if (cartProduct) {
                  cartProduct.quantity += item.quantity;
                  await cartProduct.save();
               } else {
                  await Cart.create({
                     userId: phoneNumber,
                     productId: bestProduct._id,
                     quantity: item.quantity
                  });
               }
               
               data.items.push({
                  productId: bestProduct._id,
                  name: bestProduct.name,
                  price: bestProduct.price,
                  quantity: item.quantity
               });
               addedNames.push(`${item.quantity}x ${bestProduct.name}`);
            } else {
               // Advanced AI-UX Fallback Response
               const fuzzyMatch = await Product.findOne({
                  name: { $regex: new RegExp(item.name.slice(0, 3), "i") },
                  stock: { $gt: 0 }
               });
               
               if (fuzzyMatch) {
                  const cartProduct = await Cart.findOne({ productId: fuzzyMatch._id, userId: phoneNumber });
                  if (cartProduct) {
                     cartProduct.quantity += item.quantity;
                     await cartProduct.save();
                  } else {
                     await Cart.create({
                        userId: phoneNumber,
                        productId: fuzzyMatch._id,
                        quantity: item.quantity
                     });
                  }
                  
                  data.items.push({
                     productId: fuzzyMatch._id,
                     name: fuzzyMatch.name,
                     price: fuzzyMatch.price,
                     quantity: item.quantity
                  });
                  addedNames.push(`${item.quantity}x ${fuzzyMatch.name} (added instead of ${item.name})`);
               } else {
                   responseMessage = `Sorry, I couldn't find '${item.name}' in stock anywhere.`;
                   return res.status(200).json({ intent: "general_query", message: responseMessage, data }); // Short circuit if not found
               }
            }
         }
         
         if (data.items.length > 0) {
            responseMessage = `Added ${addedNames.join(", ")} to your cart 🛒. Would you like to review or proceed to checkout?`;
         }
      } else if (!phoneNumber) { 
         responseMessage = "Please log in so I can add items!"; 
      }
    } 
    
    else if (intent === "review_cart") {
      if(phoneNumber) {
         const count = await Cart.countDocuments({ userId: phoneNumber });
         if (count === 0) responseMessage = "Your cart is currently empty. Want me to add items for you?";
      } else {
         responseMessage = "Please log in to review your cart!";
      }
    }
    
    else if (intent === "proceed_checkout") {
      if(phoneNumber) {
         const count = await Cart.countDocuments({ userId: phoneNumber });
         if (count === 0) {
            intent = "general_query"; // abort UI redirect
            responseMessage = "Your cart is empty. Want me to add items so you can checkout?";
         }
      } else {
         responseMessage = "Please log in to checkout!";
      }
    }
    
    else if (intent === "order_tracking") {
      if (userId) {
        const latestOrder = await Order.findOne({ customer: userId })
          .sort({ createdAt: -1 })
          .populate("shop", "name")
          .populate("deliveryPartner", "name phone");
        
        if (latestOrder) {
          data.orderId = latestOrder._id;
          data.status = latestOrder.status;
          data.shopName = latestOrder.shopName;
          
          if (latestOrder.deliveryPartner) {
            data.partnerName = latestOrder.deliveryPartner.name;
          }

          const orderTime = new Date(latestOrder.createdAt);
          const expectedDeliveryTime = new Date(orderTime.getTime() + 30 * 60000); 
          const now = new Date();

          let etaStr = "10 mins"; 
          if (["Delivered", "Rejected"].includes(latestOrder.status)) {
             etaStr = "N/A";
             responseMessage = `Your most recent order from ${latestOrder.shopName} was ${latestOrder.status}.`;
          } else if (now > expectedDeliveryTime) {
             etaStr = "Delayed";
             responseMessage = `Your order is slightly delayed ⏱️\nStatus: ${latestOrder.status}`;
          } else {
             const diffMs = expectedDeliveryTime - now;
             const diffMins = Math.ceil(diffMs / 60000);
             etaStr = `${diffMins} mins`;
             responseMessage = `Your order is out for delivery and will arrive in approx ${etaStr} 🚚`;
          }
          data.eta = etaStr;
        } else {
          responseMessage = "It looks like you don't have any recent orders to track.";
        }
      } else {
        responseMessage = "Please log in so I can check your recent orders!";
      }
    }  

    // Return the executed response natively back to ChatMessage React logic
    return res.status(200).json({
      intent,
      message: responseMessage,
      data,
    });
    
  } catch (error) {
    console.error("Chatbot LLM Error:", error);
    res.status(500).json({ error: "Failed to process chat request using LLM." });
  }
};
