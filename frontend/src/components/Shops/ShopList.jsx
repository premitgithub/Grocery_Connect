import { motion, AnimatePresence } from "framer-motion";
import ShopCard from "./ShopCard";

const ShopList = ({ shops }) => {
  if (!shops || shops.length === 0) {
    return (
      <div className="text-center text-gray-600 text-lg mt-10">
        No shops match your filters.
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center"
    >
      <AnimatePresence>
        {shops.map((shop, index) => (
          <motion.div
            key={shop._id || shop.id || shop.shopName || index}
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-full flex justify-center"
          >
            <ShopCard shop={shop} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ShopList;
