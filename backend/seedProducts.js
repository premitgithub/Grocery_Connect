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
    images: [
      "https://images.unsplash.com/photo-1508313880080-c4bef0730395?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
    ],
    stock: 150,
    brand: "Local Farm",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.5,
  },
  {
    name: "Organic Spinach (250g)",
    description: "Leafy green spinach rich in iron and vitamins. 100% organic.",
    price: 40,
    category: "Vegetables",
    images: [
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
    ],
    stock: 90,
    brand: "Fresh Leaf",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.8,
  },
  {
    name: "Cauliflower (1 piece)",
    description: "White, tender cauliflower ideal for curries and stir-fries.",
    price: 50,
    category: "Vegetables",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Chou-fleur_02.jpg/1125px-Chou-fleur_02.jpg",
    ],
    stock: 70,
    brand: "Nature’s Basket",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.6,
  },
  {
    name: "Carrots (500g)",
    description:
      "Bright orange carrots full of natural sweetness and nutrients.",
    price: 45,
    category: "Vegetables",
    images: [
      "https://www.bbassets.com/media/uploads/p/l/10000072_18-fresho-carrot-orange.jpg",
    ],
    stock: 100,
    brand: "FarmFresh",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.7,
  },
  {
    name: "Green Peas (500g)",
    description: "Fresh green peas packed with protein and fiber.",
    price: 60,
    category: "Vegetables",
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2023/10/352685773/RV/MK/SJ/191731955/whatsapp-image-2023-10-14-at-12-45-31-pm.jpeg",
    ],
    stock: 90,
    brand: "Green Valley",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.6,
  },
  {
    name: "Onions (1kg)",
    description: "High-quality red onions for all your cooking needs.",
    price: 55,
    category: "Vegetables",
    images: [
      "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/765ff374dd4023fde2d3936ec482814d",
    ],
    stock: 200,
    brand: "Local Market",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.5,
  },

  // 🍎 Fruits
  {
    name: "Bananas (1 Dozen)",
    description: "Fresh yellow bananas rich in potassium and energy.",
    price: 60,
    category: "Fruits",
    images: [
      "https://thumb.photo-ac.com/a8/a881039f5a02958b6c2b3a345687949a_t.jpeg",
    ],
    stock: 150,
    brand: "Tropical Farms",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.8,
  },
  {
    name: "Oranges (1kg)",
    description: "Juicy, vitamin-C rich oranges from Nagpur.",
    price: 90,
    category: "Fruits",
    images: [
      "https://subzibazaar.in/cdn/shop/files/download_dfc68535-d225-4878-8b84-387d71664c05.jpg?v=1756125619",
    ],
    stock: 120,
    brand: "Citrus Co.",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.7,
  },
  {
    name: "Mangoes (1kg)",
    description:
      "Alphonso mangoes – the king of fruits, naturally sweet and aromatic.",
    price: 180,
    category: "Fruits",
    images: [
      "https://m.media-amazon.com/images/I/41-8fVmjZuL._AC_UF894,1000_QL80_.jpg",
    ],
    stock: 100,
    brand: "Ratnagiri Farms",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.9,
  },
  {
    name: "Pineapple (1 piece)",
    description: "Freshly harvested pineapple with juicy flavor.",
    price: 85,
    category: "Fruits",
    images: [
      "https://www.healthxchange.sg/adobe/dynamicmedia/deliver/dm-aid--c06c2aed-90cf-4360-a423-7f053b2a44d9/pineapple-health-benefits-and-ways-to-enjoy.jpg?preferwebp=true",
    ],
    stock: 70,
    brand: "Tropical Fresh",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.6,
  },
  {
    name: "Papaya (1 piece)",
    description: "Ripe papaya perfect for digestion and healthy skin.",
    price: 70,
    category: "Fruits",
    images: [
      "https://img.forestessentialsindia.com/blog/wp-content/uploads/2020/02/Papaya.png",
    ],
    stock: 80,
    brand: "FarmFresh",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.5,
  },
  {
    name: "Grapes (500g)",
    description: "Seedless green grapes, naturally sweet and crunchy.",
    price: 120,
    category: "Fruits",
    images: [
      "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/bccb82ac7c991466a4babc0866de46d8",
    ],
    stock: 90,
    brand: "Green Valley",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.7,
  },

  // 🧴 Oils
  {
    name: "Fortune Sunflower Oil (1L)",
    description: "Pure sunflower oil rich in Vitamin E.",
    price: 165,
    category: "Edible Oils",
    images: [
      "https://bajarhaat.com/wp-content/uploads/2024/06/Fortune-Sunflower-Oil-1-Litre-SDL807285950-1-38484.jpg",
    ],
    stock: 150,
    brand: "Fortune",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.6,
  },
  {
    name: "Dhara Mustard Oil (1L)",
    description: "Strong mustard flavor ideal for Indian dishes.",
    price: 180,
    category: "Edible Oils",
    images: [
      "https://www.bbassets.com/media/uploads/p/l/30003360_7-dhara-oil-mustard-kachi-ghani.jpg",
    ],
    stock: 130,
    brand: "Dhara",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.7,
  },
  {
    name: "Saffola Gold (1L)",
    description: "Blended oil for a healthy heart with balanced Omega 3 and 6.",
    price: 210,
    category: "Edible Oils",
    images: ["https://m.media-amazon.com/images/I/61ZSTmboXVL.jpg"],
    stock: 120,
    brand: "Saffola",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.8,
  },
  {
    name: "Emami Healthy & Tasty Rice Bran Oil (1L)",
    description:
      "High in antioxidants, ideal for deep frying and daily cooking.",
    price: 190,
    category: "Edible Oils",
    images: [
      "https://r-mart.co.in/images/thumbs/0023767_emami-healthy-tasty-rice-bran-oil-1l_510.jpeg",
    ],
    stock: 110,
    brand: "Emami",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.5,
  },
  {
    name: "Figaro Olive Oil (500ml)",
    description: "Imported olive oil suitable for cooking and salads.",
    price: 480,
    category: "Edible Oils",
    images: [
      "https://images.apollo247.in/pub/media/catalog/product/F/I/FIG0006_1-JULY23_1.jpg?tr=q-80,f-webp,w-400,dpr-3,c-at_max%20400w",
    ],
    stock: 60,
    brand: "Figaro",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.9,
  },
  {
    name: "Patanjali Mustard Oil (1L)",
    description: "Natural and pure mustard oil for traditional cooking.",
    price: 175,
    category: "Edible Oils",
    images: [
      "https://www.patanjaliayurved.net/assets/product_images/400x500/1754287961mustardoil500ml1.webp",
    ],
    stock: 140,
    brand: "Patanjali",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.6,
  },

  // 🍞 Bread
  {
    name: "Britannia Whole Wheat Bread",
    description: "Soft, healthy, and made from 100% whole wheat flour.",
    price: 45,
    category: "Bakery",
    images: [
      "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/iyvdgfz9ydgxcutiumff",
    ],
    stock: 80,
    brand: "Britannia",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.7,
  },
  {
    name: "Modern Milk Bread",
    description: "Soft and fluffy milk bread perfect for breakfast.",
    price: 40,
    category: "Bakery",
    images: [
      "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2024/10/26/0e7a5e4b-09d3-452c-b418-7317d4289247_776_1.png",
    ],
    stock: 90,
    brand: "Modern",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.5,
  },
  {
    name: "Harvest Multigrain Bread",
    description: "Loaded with grains for a healthy lifestyle.",
    price: 55,
    category: "Bakery",
    images: [
      "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/CIW/2024/2/26/8472add6-2adc-4d12-9f69-359fe63a8791_breadandgourmetbread_ZLHJ0YP6UZ_MN.png",
    ],
    stock: 75,
    brand: "Harvest",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.8,
  },
  {
    name: "English Oven Garlic Bread",
    description: "Pre-sliced garlic bread perfect for toasting.",
    price: 70,
    category: "Bakery",
    images: [
      "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/CIW/2024/2/26/8472add6-2adc-4d12-9f69-359fe63a8791_breadandgourmetbread_ZLHJ0YP6UZ_MN.png",
    ],
    stock: 60,
    brand: "English Oven",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.6,
  },
  {
    name: "Amul Butter Pav Buns (6 pcs)",
    description: "Soft pav buns perfect for vada pav and sliders.",
    price: 30,
    category: "Bakery",
    images: [
      "https://www.bbassets.com/media/uploads/p/xl/40222590_1-amul-butter-pav.jpg",
    ],
    stock: 110,
    brand: "Amul",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.6,
  },
  {
    name: "Whole Wheat Sandwich Bread",
    description: "Healthy and perfect for sandwiches and toasts.",
    price: 50,
    category: "Bakery",
    images: [
      "https://5.imimg.com/data5/HH/HD/IE/SELLER-2726350/whole-wheat-bread.jpeg",
    ],
    stock: 90,
    brand: "BakeSmith",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.7,
  },

  // 🥤 Drinks
  {
    name: "Coca-Cola 750ml",
    description: "Classic refreshing soft drink.",
    price: 40,
    category: "Drinks",
    images: [
      "https://www.bbassets.com/media/uploads/p/xl/251023_11-coca-cola-soft-drink-original-taste.jpg",
    ],
    stock: 200,
    brand: "Coca-Cola",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.8,
  },
  {
    name: "Pepsi 750ml",
    description: "Chilled soft drink with bold taste.",
    price: 40,
    category: "Drinks",
    images: [
      "https://www.jiomart.com/images/product/original/491208775/pepsi-750-ml-product-images-o491208775-p491208775-0-202505231714.jpg?im=Resize=(1000,1000)",
    ],
    stock: 180,
    brand: "Pepsi",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.7,
  },
  {
    name: "Sprite 750ml",
    description: "Lemon-lime carbonated soft drink.",
    price: 40,
    category: "Drinks",
    images: [
      "https://www.bbassets.com/media/uploads/p/l/251006_13-sprite-soft-drink-lime-flavoured.jpg",
    ],
    stock: 160,
    brand: "Sprite",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.7,
  },
  {
    name: "Frooti Mango Drink (1L)",
    description: "Refreshing mango drink with real fruit pulp.",
    price: 60,
    category: "Drinks",
    images: [
      "https://www.jiomart.com/images/product/original/490537395/frooti-mango-drink-1-2-l-product-images-o490537395-p490537395-1-202306250952.jpg?im=Resize=(1000,1000)",
    ],
    stock: 130,
    brand: "Frooti",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.6,
  },
  {
    name: "Real Mixed Fruit Juice (1L)",
    description: "Blend of fruits packed with vitamins.",
    price: 110,
    category: "Drinks",
    images: [
      "https://www.jiomart.com/images/product/original/490001987/real-fruit-power-mixed-fruit-juice-1-l-product-images-o490001987-p490001987-0-202203170837.jpg?im=Resize=(1000,1000)",
    ],
    stock: 120,
    brand: "Real",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.8,
  },
  {
    name: "Red Bull Energy Drink (250ml)",
    description: "Energy drink that revitalizes body and mind.",
    price: 125,
    category: "Drinks",
    images: ["https://m.media-amazon.com/images/I/51Bp30CR3IL.jpg"],
    stock: 100,
    brand: "Red Bull",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.9,
  },

  // 🧼 Soaps & Detergents
  {
    name: "Surf Excel Matic Liquid (1L)",
    description: "Powerful liquid detergent for machine wash.",
    price: 210,
    category: "Household",
    images: ["https://m.media-amazon.com/images/I/518YYVPFCnL.jpg"],
    stock: 90,
    brand: "Surf Excel",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.8,
  },
  {
    name: "Rin Detergent Bar (250g)",
    description: "Removes tough stains and keeps clothes bright.",
    price: 20,
    category: "Household",
    images: ["https://m.media-amazon.com/images/I/4177532yRoL.jpg"],
    stock: 180,
    brand: "Rin",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.5,
  },
  {
    name: "Tide Detergent Powder (1kg)",
    description: "Leaves clothes bright and fresh after every wash.",
    price: 125,
    category: "Household",
    images: [
      "https://m.media-amazon.com/images/I/61YIfgu3ylL._AC_UF1000,1000_QL80_.jpg",
    ],
    stock: 200,
    brand: "Tide",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.7,
  },
  {
    name: "Dettol Antibacterial Soap (125g)",
    description: "Kills 99.9% germs and protects your skin.",
    price: 40,
    category: "Household",
    images: [
      "https://m.media-amazon.com/images/I/61v-us5z9JL._AC_UF350,350_QL80_.jpg",
    ],
    stock: 160,
    brand: "Dettol",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.8,
  },
  {
    name: "Lifebuoy Total 10 Soap (125g)",
    description: "Germ protection for the entire family.",
    price: 35,
    category: "Household",
    images: ["https://m.media-amazon.com/images/I/61VxLtMtcQL.jpg"],
    stock: 190,
    brand: "Lifebuoy",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.6,
  },
  {
    name: "Lux Soft Touch Soap (150g)",
    description: "Moisturizing soap with rose and silk essence.",
    price: 45,
    category: "Household",
    images: ["https://m.media-amazon.com/images/I/51ZzKwjJ6pL.jpg"],
    stock: 170,
    brand: "Lux",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.7,
  },
  {
    name: "Pears Pure & Gentle Soap (125g)",
    description: "Glycerin-based soap for smooth and glowing skin.",
    price: 55,
    category: "Household",
    images: [
      "https://m.media-amazon.com/images/I/613wl9rnjoL._AC_UF1000,1000_QL80_.jpg",
    ],
    stock: 160,
    brand: "Pears",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.8,
  },
  {
    name: "Wheel Detergent Powder (1kg)",
    description: "Affordable washing powder with lemon fragrance.",
    price: 95,
    category: "Household",
    images: [
      "https://www.jiomart.com/images/product/original/490680413/active-wheel-blue-lemon-jasmine-detergent-powder-1-kg-product-images-o490680413-p490680413-0-202210071659.jpg?im=Resize=(1000,1000)",
    ],
    stock: 180,
    brand: "Wheel",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.6,
  },
  {
    name: "Vim Dishwash Liquid (500ml)",
    description:
      "Removes tough grease easily and leaves utensils sparkling clean.",
    price: 110,
    category: "Household",
    images: ["https://m.media-amazon.com/images/I/51rhw--KcDL.jpg"],
    stock: 150,
    brand: "Vim",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.8,
  },
  {
    name: "Comfort Fabric Conditioner (500ml)",
    description: "Keeps clothes soft and fragrant after wash.",
    price: 150,
    category: "Household",
    images: [
      "https://tiimg.tistatic.com/fp/1/006/338/comfort-fabric-conditioner-147.jpg",
    ],
    stock: 100,
    brand: "Comfort",
    shop: "6725f2b9a1b9bce4c4a91234",
    rating: 4.7,
  },
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
