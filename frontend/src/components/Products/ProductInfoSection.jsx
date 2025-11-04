// import React from "react";
// import { motion } from "framer-motion";

// const ProductInfoSection = ({ productName }) => {
//   return (
//     <motion.div
//       initial={{ x: 40, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       transition={{ duration: 0.4 }}
//       className="bg-white p-10 rounded-2xl shadow-xl space-y-5"
//     >
//       <h1 className="text-3xl font-bold text-gray-800">{productName}</h1>
//       <p className="text-teal-600 text-2xl font-semibold">₹1,499</p>
//       <p className="text-gray-600 leading-relaxed">
//         A short product description goes here. This will later come from
//         backend.
//       </p>

//       <div className="flex gap-2 items-center">
//         <span className="text-yellow-500 text-xl">⭐ 4.5</span>
//         <span className="text-gray-500">(120 reviews)</span>
//       </div>

//       <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg text-lg font-semibold duration-300 cursor-pointer">
//         Add to Cart
//       </button>
//     </motion.div>
//   );
// };

// export default ProductInfoSection;


import React, { useContext } from "react";
import { motion } from "framer-motion";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";

const ProductInfoSection = ({ product }) => {
  const { addToCart } = useContext(UserContext);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-10 rounded-2xl shadow-xl space-y-5"
    >
      <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

      <p className="text-teal-600 text-2xl font-semibold">
        ₹{product.price?.toLocaleString()}
      </p>

      <p className="text-gray-600 leading-relaxed">{product.description}</p>

      <div className="flex gap-2 items-center">
        <span className="text-yellow-500 text-xl">
          ⭐ {product.rating || 4.5}
        </span>
        <span className="text-gray-500">{product.reviews || 100}(reviews)</span>
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg text-lg font-semibold duration-300 cursor-pointer"
      >
        Add to Cart
      </button>
    </motion.div>
  );
};

export default ProductInfoSection;
