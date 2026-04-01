import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * categories prop: optional array of category names (strings).
 * If not provided, fallback to a default set and images.
 */
const ALL_CATS = [
  { name: "Vegetables", img: "/groceries/vegetable.png" },
  { name: "Fruits", img: "/groceries/basket.png" },
  { name: "Dairy & Eggs", img: "/groceries/dairy-products.png" },
  { name: "Snacks", img: "/groceries/snack.png" },
  { name: "Drinks", img: "/groceries/soft-drink.png" },
  { name: "Bakery", img: "/groceries/bakery.png" },
  { name: "Chocolates", img: "/groceries/chocolate.png" },
  { name: "Pantry Samples", img: "/groceries/pantry.png" },
  { name: "Edible_Oils", img: "/groceries/cooking-oil.png" },
  { name: "Household", img: "/groceries/shelves.png" },
];

const ShopCategoryGrid = ({ categories = [] }) => {
  const navigate = useNavigate();
  // map input category names to the available set (case-insensitive)
  const cats =
    categories?.length > 0
      ? categories.map((c) => {
          const match = ALL_CATS.find(
            (a) => a.name.toLowerCase() === String(c).toLowerCase()
          );
          return match || { name: c, img: "/groceries/default.png" };
        })
      : ALL_CATS.slice(0, 8);

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-4 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {cats.map((cat) => (
        <motion.div
          key={cat.name}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-2xl p-4 shadow-md flex flex-col items-center cursor-pointer"
          onClick={() =>
            navigate(`/products/category/${encodeURIComponent(cat.name)}`)
          }
        >
          <img
            src={cat.img}
            alt={cat.name}
            className="w-20 h-20 object-contain mb-2"
          />
          <div className="text-center">
            <p className="font-semibold text-gray-800">{cat.name}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ShopCategoryGrid;
