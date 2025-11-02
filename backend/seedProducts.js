import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./src/models/Product.js"; // adjust the path if needed

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/grocerydb";

const products = [
  // 🥦 Vegetables
  {
    name: "Fresh Potatoes (1kg)",
    description: "Clean, farm-fresh potatoes perfect for daily cooking.",
    price: 35,
    category: "Vegetables",
    images: ["https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2"],
    stock: 150,
    brand: "Local Farm",
    rating: 4.5
  },
  {
    name: "Organic Spinach (250g)",
    description: "Leafy green spinach rich in iron and vitamins. 100% organic.",
    price: 40,
    category: "Vegetables",
    images: ["https://images.unsplash.com/photo-1582515073490-dc99e481b9f8"],
    stock: 90,
    brand: "Fresh Leaf",
    rating: 4.8
  },
  {
    name: "Cauliflower (1 piece)",
    description: "White, tender cauliflower ideal for curries and stir-fries.",
    price: 50,
    category: "Vegetables",
    images: ["https://images.unsplash.com/photo-1592928303165-76dc3e4a2978"],
    stock: 70,
    brand: "Nature’s Basket",
    rating: 4.6
  },
  {
    name: "Carrots (500g)",
    description: "Bright orange carrots full of natural sweetness and nutrients.",
    price: 45,
    category: "Vegetables",
    images: ["https://images.unsplash.com/photo-1574169208507-84376144848b"],
    stock: 100,
    brand: "FarmFresh",
    rating: 4.7
  },
  {
    name: "Green Peas (500g)",
    description: "Fresh green peas packed with protein and fiber.",
    price: 60,
    category: "Vegetables",
    images: ["https://images.unsplash.com/photo-1567306226416-28f0efdc88ce"],
    stock: 90,
    brand: "Green Valley",
    rating: 4.6
  },
  {
    name: "Onions (1kg)",
    description: "High-quality red onions for all your cooking needs.",
    price: 55,
    category: "Vegetables",
    images: ["https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2"],
    stock: 200,
    brand: "Local Market",
    rating: 4.5
  },

  // 🍎 Fruits
  {
    name: "Bananas (1 Dozen)",
    description: "Fresh yellow bananas rich in potassium and energy.",
    price: 60,
    category: "Fruits",
    images: ["https://images.unsplash.com/photo-1574226516831-e1dff420e12e"],
    stock: 150,
    brand: "Tropical Farms",
    rating: 4.8
  },
  {
    name: "Oranges (1kg)",
    description: "Juicy, vitamin-C rich oranges from Nagpur.",
    price: 90,
    category: "Fruits",
    images: ["https://images.unsplash.com/photo-1619546813926-a78fa6372cd2"],
    stock: 120,
    brand: "Citrus Co.",
    rating: 4.7
  },
  {
    name: "Mangoes (1kg)",
    description: "Alphonso mangoes – the king of fruits, naturally sweet and aromatic.",
    price: 180,
    category: "Fruits",
    images: ["https://images.unsplash.com/photo-1615485290390-0e6f4c49387f"],
    stock: 100,
    brand: "Ratnagiri Farms",
    rating: 4.9
  },
  {
    name: "Pineapple (1 piece)",
    description: "Freshly harvested pineapple with juicy flavor.",
    price: 85,
    category: "Fruits",
    images: ["https://images.unsplash.com/photo-1589927986089-35812388d1f4"],
    stock: 70,
    brand: "Tropical Fresh",
    rating: 4.6
  },
  {
    name: "Papaya (1 piece)",
    description: "Ripe papaya perfect for digestion and healthy skin.",
    price: 70,
    category: "Fruits",
    images: ["https://images.unsplash.com/photo-1592928303165-76dc3e4a2978"],
    stock: 80,
    brand: "FarmFresh",
    rating: 4.5
  },
  {
    name: "Grapes (500g)",
    description: "Seedless green grapes, naturally sweet and crunchy.",
    price: 120,
    category: "Fruits",
    images: ["https://images.unsplash.com/photo-1601050690597-1e6f5a1b8f1a"],
    stock: 90,
    brand: "Green Valley",
    rating: 4.7
  },

  // 🧴 Oils
  {
    name: "Fortune Sunflower Oil (1L)",
    description: "Pure sunflower oil rich in Vitamin E.",
    price: 165,
    category: "Edible Oils",
    images: ["https://images.unsplash.com/photo-1615485290390-0e6f4c49387f"],
    stock: 150,
    brand: "Fortune",
    rating: 4.6
  },
  {
    name: "Dhara Mustard Oil (1L)",
    description: "Strong mustard flavor ideal for Indian dishes.",
    price: 180,
    category: "Edible Oils",
    images: ["https://images.unsplash.com/photo-1622206152592-3f88cd858c0c"],
    stock: 130,
    brand: "Dhara",
    rating: 4.7
  },
  {
    name: "Saffola Gold (1L)",
    description: "Blended oil for a healthy heart with balanced Omega 3 and 6.",
    price: 210,
    category: "Edible Oils",
    images: ["https://images.unsplash.com/photo-1602526218855-8e5fdfb2f6e5"],
    stock: 120,
    brand: "Saffola",
    rating: 4.8
  },
  {
    name: "Emami Healthy & Tasty Rice Bran Oil (1L)",
    description: "High in antioxidants, ideal for deep frying and daily cooking.",
    price: 190,
    category: "Edible Oils",
    images: ["https://images.unsplash.com/photo-1602526218855-8e5fdfb2f6e5"],
    stock: 110,
    brand: "Emami",
    rating: 4.5
  },
  {
    name: "Figaro Olive Oil (500ml)",
    description: "Imported olive oil suitable for cooking and salads.",
    price: 480,
    category: "Edible Oils",
    images: ["https://images.unsplash.com/photo-1602526218855-8e5fdfb2f6e5"],
    stock: 60,
    brand: "Figaro",
    rating: 4.9
  },
  {
    name: "Patanjali Mustard Oil (1L)",
    description: "Natural and pure mustard oil for traditional cooking.",
    price: 175,
    category: "Edible Oils",
    images: ["https://images.unsplash.com/photo-1622206152592-3f88cd858c0c"],
    stock: 140,
    brand: "Patanjali",
    rating: 4.6
  },

  // 🍞 Bread
  {
    name: "Britannia Whole Wheat Bread",
    description: "Soft, healthy, and made from 100% whole wheat flour.",
    price: 45,
    category: "Bakery",
    images: ["https://images.unsplash.com/photo-1608198093002-ad4e005484ec"],
    stock: 80,
    brand: "Britannia",
    rating: 4.7
  },
  {
    name: "Modern Milk Bread",
    description: "Soft and fluffy milk bread perfect for breakfast.",
    price: 40,
    category: "Bakery",
    images: ["https://images.unsplash.com/photo-1565958011705-44e211edcfb4"],
    stock: 90,
    brand: "Modern",
    rating: 4.5
  },
  {
    name: "Harvest Multigrain Bread",
    description: "Loaded with grains for a healthy lifestyle.",
    price: 55,
    category: "Bakery",
    images: ["https://images.unsplash.com/photo-1608198093002-ad4e005484ec"],
    stock: 75,
    brand: "Harvest",
    rating: 4.8
  },
  {
    name: "English Oven Garlic Bread",
    description: "Pre-sliced garlic bread perfect for toasting.",
    price: 70,
    category: "Bakery",
    images: ["https://images.unsplash.com/photo-1608198093002-ad4e005484ec"],
    stock: 60,
    brand: "English Oven",
    rating: 4.6
  },
  {
    name: "Amul Butter Pav Buns (6 pcs)",
    description: "Soft pav buns perfect for vada pav and sliders.",
    price: 30,
    category: "Bakery",
    images: ["https://images.unsplash.com/photo-1608198093002-ad4e005484ec"],
    stock: 110,
    brand: "Amul",
    rating: 4.6
  },
  {
    name: "Whole Wheat Sandwich Bread",
    description: "Healthy and perfect for sandwiches and toasts.",
    price: 50,
    category: "Bakery",
    images: ["https://images.unsplash.com/photo-1608198093002-ad4e005484ec"],
    stock: 90,
    brand: "BakeSmith",
    rating: 4.7
  },

  // 🥤 Drinks
  {
    name: "Coca-Cola 750ml",
    description: "Classic refreshing soft drink.",
    price: 40,
    category: "Drinks",
    images: ["https://images.unsplash.com/photo-1613470200783-9b30829c6b2b"],
    stock: 200,
    brand: "Coca-Cola",
    rating: 4.8
  },
  {
    name: "Pepsi 750ml",
    description: "Chilled soft drink with bold taste.",
    price: 40,
    category: "Drinks",
    images: ["https://images.unsplash.com/photo-1613470200783-9b30829c6b2b"],
    stock: 180,
    brand: "Pepsi",
    rating: 4.7
  },
  {
    name: "Sprite 750ml",
    description: "Lemon-lime carbonated soft drink.",
    price: 40,
    category: "Drinks",
    images: ["https://images.unsplash.com/photo-1613470200783-9b30829c6b2b"],
    stock: 160,
    brand: "Sprite",
    rating: 4.7
  },
  {
    name: "Frooti Mango Drink (1L)",
    description: "Refreshing mango drink with real fruit pulp.",
    price: 60,
    category: "Drinks",
    images: ["https://images.unsplash.com/photo-1615485290390-0e6f4c49387f"],
    stock: 130,
    brand: "Frooti",
    rating: 4.6
  },
  {
    name: "Real Mixed Fruit Juice (1L)",
    description: "Blend of fruits packed with vitamins.",
    price: 110,
    category: "Drinks",
    images: ["https://images.unsplash.com/photo-1601050690597-1e6f5a1b8f1a"],
    stock: 120,
    brand: "Real",
    rating: 4.8
  },
  {
    name: "Red Bull Energy Drink (250ml)",
    description: "Energy drink that revitalizes body and mind.",
    price: 125,
    category: "Drinks",
    images: ["https://images.unsplash.com/photo-1605475128028-15c26d61be6e"],
    stock: 100,
    brand: "Red Bull",
    rating: 4.9
  },

  // 🧼 Soaps & Detergents
  {
    name: "Surf Excel Matic Liquid (1L)",
    description: "Powerful liquid detergent for machine wash.",
    price: 210,
    category: "Household",
    images: ["https://images.unsplash.com/photo-1625654201412-27e8e9e99242"],
    stock: 90,
    brand: "Surf Excel",
    rating: 4.8
  },
  {
    name: "Rin Detergent Bar (250g)",
    description: "Removes tough stains and keeps clothes bright.",
    price: 20,
    category: "Household",
    images: ["https://images.unsplash.com/photo-1625654201412-27e8e9e99242"],
    stock: 180,
    brand: "Rin",
    rating: 4.5
  },
  {
    name: "Tide Detergent Powder (1kg)",
    description: "Leaves clothes bright and fresh after every wash.",
    price: 125,
    category: "Household",
    images: ["https://images.unsplash.com/photo-1625654201412-27e8e9e99242"],
    stock: 200,
    brand: "Tide",
    rating: 4.7
  },
  {
    name: "Dettol Antibacterial Soap (125g)",
    description: "Kills 99.9% germs and protects your skin.",
    price: 40,
    category: "Household",
    images: ["https://images.unsplash.com/photo-1625654201412-27e8e9e99242"],
    stock: 160,
    brand: "Dettol",
    rating: 4.8
  },
  {
    name: "Lifebuoy Total 10 Soap (125g)",
    description: "Germ protection for the entire family.",
    price: 35,
    category: "Household",
    images: ["https://images.unsplash.com/photo-1625654201412-27e8e9e99242"],
    stock: 190,
    brand: "Lifebuoy",
    rating: 4.6
  },
  {
    name: "Lux Soft Touch Soap (150g)",
    description: "Moisturizing soap with rose and silk essence.",
    price: 45,
    category: "Household",
    images: ["https://images.unsplash.com/photo-1625654201412-27e8e9e99242"],
    stock: 170,
    brand: "Lux",
    rating: 4.7
  },
  {
    name: "Pears Pure & Gentle Soap (125g)",
    description: "Glycerin-based soap for smooth and glowing skin.",
    price: 55,
    category: "Household",
    images: ["https://images.unsplash.com/photo-1625654201412-27e8e9e99242"],
    stock: 160,
    brand: "Pears",
    rating: 4.8
  },
  {
    name: "Wheel Detergent Powder (1kg)",
    description: "Affordable washing powder with lemon fragrance.",
    price: 95,
    category: "Household",
    images: ["https://images.unsplash.com/photo-1625654201412-27e8e9e99242"],
    stock: 180,
    brand: "Wheel",
    rating: 4.6
  },
  {
    name: "Vim Dishwash Liquid (500ml)",
    description: "Removes tough grease easily and leaves utensils sparkling clean.",
    price: 110,
    category: "Household",
    images: ["https://images.unsplash.com/photo-1625654201412-27e8e9e99242"],
    stock: 150,
    brand: "Vim",
    rating: 4.8
  },
  {
    name: "Comfort Fabric Conditioner (500ml)",
    description: "Keeps clothes soft and fragrant after wash.",
    price: 150,
    category: "Household",
    images: ["https://images.unsplash.com/photo-1625654201412-27e8e9e99242"],
    stock: 100,
    brand: "Comfort",
    rating: 4.7
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ MongoDB connected...");

    await Product.deleteMany();
    console.log("🧹 Old products removed.");

    await Product.insertMany(products);
    console.log(`✅ Inserted ${products.length} products successfully!`);

    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
