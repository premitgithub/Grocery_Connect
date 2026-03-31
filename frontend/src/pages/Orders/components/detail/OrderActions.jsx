import { useNavigate } from "react-router-dom";

const ACTIVE_STATUSES = ["Pending", "Accepted", "Picked Up", "Out for Delivery"];

/**
 * Action buttons for the Order Details page:
 * - "Track Order Live" → visible for in-progress orders
 * - "Reorder Items"   → visible for delivered orders
 */
const OrderActions = ({ order, isReordering, onReorder }) => {
  const navigate = useNavigate();
  const isActive    = ACTIVE_STATUSES.includes(order.status);
  const isDelivered = order.status === "Delivered";

  if (!isActive && !isDelivered) return null;

  return (
    <section className="space-y-3">
      {isActive && (
        <button
          onClick={() => navigate(`/track/${order._id}`)}
          className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-2xl shadow-lg shadow-teal-600/30 hover:-translate-y-1 hover:shadow-teal-600/40 transition-all duration-300 flex justify-center items-center gap-2"
        >
          Track Order Live
        </button>
      )}

      {isDelivered && (
        <button
          onClick={onReorder}
          disabled={isReordering}
          className="w-full py-4 bg-white dark:bg-slate-700 border-2 border-teal-600 dark:border-teal-500 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-slate-600 font-extrabold rounded-2xl shadow-sm hover:shadow hover:-translate-y-1 transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:-translate-y-0"
        >
          {isReordering ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            "Reorder Items"
          )}
        </button>
      )}
    </section>
  );
};

export default OrderActions;
