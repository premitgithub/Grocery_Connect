import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShopCategoryGrid from "./ShopCategoryGrid";

const ShopProductsPreview = ({ shop }) => {
  const [open, setOpen] = useState(false);

  // If you prefer showing only categories present for this shop:
  // pass shop.categories into ShopCategoryGrid
  return (
    <div className="mt-12">
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setOpen((p) => !p)}
          className="px-9 py-5 bg-teal-600 text-white cursor-pointer text-xl duration-300 hover:bg-teal-700 rounded-2xl font-semibold shadow-lg"
        >
          {open ? "Hide Products" : "View All Products"}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-8"
          >
            <ShopCategoryGrid categories={shop.categories} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopProductsPreview;
