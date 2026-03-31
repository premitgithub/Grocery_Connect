import React, { useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";
// import { set } from "mongoose";
const CartItem = ({ item, onRemove }) => {
  const { product, qty } = item;
  const navigate = useNavigate();

  const { decreaseCartQuantity, increaseCartQuantity } = useContext(UserContext);

  const handleNameClick = () => {
    const encodedName = encodeURIComponent(product.name);
    navigate(`/products/${encodedName}`);
  };
  const decreaseQtyChange = () => {
    decreaseCartQuantity(item.productId, item.qty)
  }
  const increaseQtyChange = () => {
    increaseCartQuantity(item.productId, item.qty)
  }

  return (
    <div className="flex items-start gap-4 p-8 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition dark:transition-colors duration-300">
      <img
        src={product.images?.[0] || "/placeholder.png"}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h4
          onClick={handleNameClick}
          className="font-semibold text-lg cursor-pointer hover:underline hover:text-teal-700 dark:text-gray-100 dark:hover:text-teal-400 duration-200"
        >
          {product.name}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">₹{product.price}</p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => decreaseQtyChange()}
            className="px-3 py-1 cursor-pointer border dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700 rounded hover:bg-gray-100 transition-colors"
            aria-label="decrease"
          >
            -
          </button>
          <div className="px-4 py-1 border dark:border-slate-600 dark:text-gray-200 rounded">{qty}</div>
          <button
            onClick={() => increaseQtyChange()}
            className="px-3 py-1 bg-teal-600 cursor-pointer text-white rounded hover:bg-teal-700"
            aria-label="increase"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-4">
        <div className="font-semibold dark:text-gray-200">₹{product.price * qty}</div>
        <button
          onClick={onRemove}
          className="text-red-500 cursor-pointer hover:text-red-700"
          aria-label="remove"
          title="Remove"
        >
          <FiTrash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;

