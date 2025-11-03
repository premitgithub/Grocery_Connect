// src/components/Cart/CartItem.jsx
import React from "react";
import { FiTrash2 } from "react-icons/fi";

const CartItem = ({ item, onQtyChange, onRemove }) => {
  const { product, qty } = item;

  return (
    <div className="flex items-start gap-4 p-8 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition">
      <img
        src={product.images?.[0] || "/placeholder.png"}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h4 className="font-semibold text-lg">{product.name}</h4>
        <p className="text-sm text-gray-500 mb-2">₹{product.price}</p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onQtyChange(Math.max(0, qty - 1))}
            className="px-3 py-1 cursor-pointer border rounded hover:bg-gray-100"
            aria-label="decrease"
          >
            -
          </button>
          <div className="px-4 py-1 border rounded">{qty}</div>
          <button
            onClick={() => onQtyChange(qty + 1)}
            className="px-3 py-1 bg-teal-600 cursor-pointer text-white rounded hover:bg-teal-700"
            aria-label="increase"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-4">
        <div className="font-semibold">₹{product.price * qty}</div>
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
