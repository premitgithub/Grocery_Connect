import { useNavigate } from "react-router-dom";
import { FiBox } from "react-icons/fi";

/**
 * Displays each item in the order as a clickable row.
 * Clicking navigates to the product detail page.
 */
const OrderItemsList = ({ items }) => {
  const navigate = useNavigate();

  return (
    <section>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
        <FiBox className="text-teal-600 dark:text-teal-400" /> Items List
      </h3>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={() =>
              item.product?.name &&
              navigate(`/products/${encodeURIComponent(item.product.name)}`)
            }
            className="flex items-center gap-4 bg-gray-50/50 dark:bg-slate-800/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 hover:shadow-md hover:bg-gray-100 dark:hover:bg-slate-800/80 hover:border-teal-200 dark:hover:border-teal-800/50 transition-all group cursor-pointer"
          >
            {/* Thumbnail + quantity badge */}
            <div className="relative shrink-0">
              <img
                src={item.product?.imageUrl || item.product?.defaultImage || "https://placehold.co/150x150?text=Item"}
                alt={item.product?.name || "Product"}
                className="w-16 h-16 rounded-xl object-cover shadow-sm border border-gray-200 dark:border-slate-600 group-hover:scale-105 transition-transform"
              />
              <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-sm border-2 border-white dark:border-slate-800">
                {item.quantity}
              </span>
            </div>

            {/* Name + price per item */}
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 dark:text-gray-100 font-bold text-lg truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {item.product?.name || "Unknown Item"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                ₹{item.product?.price || 0} per item
              </p>
            </div>

            {/* Line total */}
            <div className="text-right shrink-0">
              <p className="text-gray-900 dark:text-white font-black text-lg">
                ₹{((item.product?.price || 0) * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderItemsList;
