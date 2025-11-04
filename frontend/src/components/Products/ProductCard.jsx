import React, { useContext, useState} from "react";
import { motion } from "framer-motion";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onClick }) => {
  const { addToCart, setCartQty, removeFromCart, cart } =
    useContext(UserContext);
  const [adding, setAdding] = useState(false);

  const navigate = useNavigate();

  // find if product already in cart
  const cartItem = cart.find((c) => c.productId === product._id);
  const qtyInCart = cartItem ? cartItem.qty : 0;

  const handleAdd = (e) => {
    e.stopPropagation();
    setAdding(true);
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`, {
      id: `cart-${product._id}`,
    });
    setTimeout(() => setAdding(false), 300);
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`+1 ${product.name}`, { id: `cart-${product._id}` });
  };

  const handleDecrease = (e) => {
    e.stopPropagation();

    if (qtyInCart > 1) {
      // reduce quantity
      setCartQty(product._id, qtyInCart - 1);
      toast.success(`${product.name} quantity reduced`, {
        id: `cart-${product._id}`,
      });
    } else if (qtyInCart === 1) {
      // remove from cart entirely
      removeFromCart(product._id);
      toast.error(`${product.name} removed from cart`, {
        id: `cart-${product._id}`,
      });
    }
  };

  return (
    <motion.div
      className="bg-white shadow-md rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
      onClick={() => onClick(product)}
    >
      <div className="relative">
        <img
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.name}
          className="w-full h-52 object-cover"
        />
        <div className="absolute top-4 left-4 bg-white/70 px-3 py-1 rounded-full text-sm font-semibold">
          {product.brand || ""}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center pt-2">
          <p className="text-xl font-bold text-teal-700">₹{product.price}</p>

          <div className="flex items-center gap-2">
            {/* View button */}
            <button
              onClick={() => navigate(`/products/${product.name}`)}
              className="text-sm px-3 py-1 border rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              View
            </button>

            {/* Add / Quantity controls */}
            {qtyInCart > 0 ? (
              <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                <button
                  onClick={handleDecrease}
                  className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer select-none"
                >
                  −
                </button>

                <motion.span
                  key={qtyInCart}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="px-3"
                >
                  {qtyInCart}
                </motion.span>

                <button
                  onClick={handleIncrease}
                  className="px-2 py-1 rounded bg-teal-600 text-white hover:bg-teal-700 cursor-pointer select-none"
                >
                  +
                </button>
              </div>
            ) : (
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-300 cursor-pointer"
                onClick={handleAdd}
                disabled={adding}
              >
                Add
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
