import { FiClock, FiCheckCircle, FiBox } from "react-icons/fi";
import getStatusColor from "../shared/getStatusColor";

const formatDate = (isoString) => {
  if (!isoString) return "";
  return new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
};

/**
 * Top header section of the Order Details card.
 * Shows: order ID, placed date, and a color-coded status badge.
 */
const OrderDetailHeader = ({ order }) => (
  <div className="p-6 md:p-8 bg-gradient-to-r from-gray-50 to-white dark:from-slate-800 dark:to-slate-800/80 border-b border-gray-100 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-1">
        <FiClock className="text-teal-500" /> {formatDate(order.createdAt)}
      </p>
      <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
        Order <span className="text-teal-600 dark:text-teal-400">#{order._id.slice(-8).toUpperCase()}</span>
      </h1>
    </div>

    <div className={`px-5 py-2.5 rounded-full border text-sm font-bold shadow-sm flex items-center gap-2 w-fit ${getStatusColor(order.status)}`}>
      {order.status === "Delivered" ? <FiCheckCircle size={18} /> : <FiBox size={18} />}
      {order.status}
    </div>
  </div>
);

export default OrderDetailHeader;
