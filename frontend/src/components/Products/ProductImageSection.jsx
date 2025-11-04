// import React from "react";
// import { motion } from "framer-motion";

// const ProductImageSection = ({ productName }) => {
//   return (
//     <motion.div
//       initial={{ scale: 0.9, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       transition={{ duration: 0.3 }}
//       className="bg-white rounded-2xl p-8 shadow-xl flex items-center justify-center"
//     >
//       <img
//         src="https://via.placeholder.com/400"
//         alt={productName}
//         className="rounded-xl max-h-[400px] object-contain"
//       />
//     </motion.div>
//   );
// };

// export default ProductImageSection;

import React from "react";
import { motion } from "framer-motion";

const ProductImageSection = ({ product }) => {
  const imageUrl =
    product?.images?.[0] || "https://via.placeholder.com/400x400?text=No+Image";

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-8 shadow-xl flex items-center justify-center"
    >
      <img
        src={imageUrl}
        alt={product?.name}
        className="rounded-xl max-h-[600px] object-contain w-full"
      />
    </motion.div>
  );
};

export default ProductImageSection;
