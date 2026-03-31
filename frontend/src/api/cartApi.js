import axios from "axios";

const API = "http://localhost:5000/api/cart";

export const addToCartApi = async (phoneNumber, productId) => {
  try {
    const res = await axios.post(`${API}/add`, {
      phoneNumber,
      productId
    });
    
    return res.data;

  } catch (error) {
    console.error("Add to cart error:", error);
    return { success: false, message: "Error adding item to cart" };
  }
};

export const fetchFromCartApi = async (phoneNumber) => {
  try {
    const res = await axios.post(`${API}`, { phoneNumber });

    return res.data;

  } catch (error) {
    console.error("Fetch from cart error:", error);
    return { success: false, message: "Error fetching item from cart" };
  }
}

export const removeFromCartApi = async (phoneNumber, productId) => {
  try {
    console.log(phoneNumber);
    console.log(productId);
    const res = await axios.post(`${API}/remove`, { phoneNumber, productId });
    console.log(res);

    return res.data;

  } catch (error) {
    console.error("Remove from cart error:", error);
    return { success: false, message: "Error removing item from cart" };
  }
}

export const reduceCartItemApi = async (phoneNumber, productId) => {
  try {
    const res = await axios.post(`${API}/reduce`, { phoneNumber, productId })

    return res.data;
  } catch (error) {
    console.error("Reduce from cart error:", error);
    return { success: false, message: "Error reducing item from cart" };
  }
}

export const clearCartItemsApi = async (phoneNumber) => {
  try {
    const res = await axios.post(`${API}/clear`, { phoneNumber })

    return res.data;
  } catch (error) {
    console.error("Clear the cart error:", error);
    return { success: false, message: "Error in Clearing the cart" };
  }
}
