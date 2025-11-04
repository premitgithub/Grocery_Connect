import React from "react";
import { motion } from "framer-motion";

const ProductExtraInfo = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl mb-20 p-10"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Other Information
      </h2>
      <p className="text-gray-600">
        🏪 This section will later show which shops have “{product?.name}”.
      </p>
      <div className="mt-4 text-sm text-gray-500">
        Stock: <span className="font-semibold">{product?.stock || "N/A"}</span>
      </div>
      <div className="text-sm text-gray-500">
        Category:{" "}
        <span className="font-semibold">{product?.category || "—"}</span>
      </div>
    </motion.div>
  );
};

export default ProductExtraInfo;
