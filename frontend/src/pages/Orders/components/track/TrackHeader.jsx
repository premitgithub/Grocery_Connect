import { FiClock } from "react-icons/fi";

const formatDate = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });
};

/**
 * Teal gradient header banner for the Track Order page.
 * Shows: order ID, placed date, last-refreshed timestamp, Refresh button.
 */
const TrackHeader = ({ order, lastRefreshed, onRefresh }) => (
  <div className="p-6 md:p-8 bg-gradient-to-r from-teal-600 to-teal-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <p className="text-teal-100 text-sm flex items-center gap-2 mb-1">
        <FiClock /> Ordered {formatDate(order.createdAt)}
      </p>
      <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
        Tracking Order{" "}
        <span className="text-teal-200">#{order._id.slice(-8).toUpperCase()}</span>
      </h1>
    </div>

    <div className="flex flex-col items-start sm:items-end gap-1">
      <span className="text-xs text-teal-200 font-medium">
        {lastRefreshed ? `Updated ${formatDate(lastRefreshed)}` : ""}
      </span>
      <button
        onClick={onRefresh}
        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
      >
        ↻ Refresh
      </button>
    </div>
  </div>
);

export default TrackHeader;
