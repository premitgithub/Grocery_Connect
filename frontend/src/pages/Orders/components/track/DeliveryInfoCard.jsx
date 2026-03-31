import { FiMapPin, FiTruck, FiClock, FiHome, FiPhone } from "react-icons/fi";

const MAP_LEGEND = [
  ["🏪", "Shop / Pickup"],
  ["🏠", "Your Address"],
  ["🚚", "Delivery Partner"],
];

/**
 * Left panel on the Track Order page:
 * - ETA badge (when available)
 * - Delivery address
 * - Map legend
 * - Delivery partner details (or waiting notice)
 * - Distance / estimated time from OSRM route
 */
const DeliveryInfoCard = ({ order, routeStats, eta }) => {
  const partner = order.deliveryPartner;

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <FiMapPin className="text-teal-600 dark:text-teal-400" /> Delivery Info
      </h2>

      {/* ETA badge — shown when partner is in transit */}
      {eta && (
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-5 py-3.5 rounded-2xl flex items-center gap-3 shadow-md shadow-teal-500/20">
          <span className="text-2xl">⏱️</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-teal-100">Estimated Arrival</p>
            <p className="text-xl font-black tracking-tight">Arriving in {eta}</p>
          </div>
        </div>
      )}

      {/* Address */}
      <div className="bg-teal-50/60 dark:bg-slate-700/40 p-4 rounded-2xl border border-teal-100 dark:border-slate-600">
        <p className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest mb-1 flex items-center gap-1">
          <FiHome size={12} /> Delivery Address
        </p>
        <p className="text-gray-800 dark:text-gray-200 font-medium">{order.deliveryAddress}</p>
      </div>

      {/* Map legend */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
          Map Legend
        </p>
        {MAP_LEGEND.map(([emoji, label]) => (
          <div key={label} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 font-medium">
            <span className="text-lg">{emoji}</span> {label}
          </div>
        ))}
      </div>

      {/* Partner info */}
      {partner ? (
        <div className="flex items-center gap-4 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-2xl border border-amber-100 dark:border-amber-800/30">
          <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 text-amber-600 rounded-full flex items-center justify-center shrink-0 text-xl shadow-inner">
            <FiTruck />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5">
              Delivery Partner
            </p>
            <p className="font-bold text-gray-900 dark:text-white text-lg">
              {partner.name || "Assigned"}
            </p>
            {partner.phone && (
              <a
                href={`tel:${partner.phone}`}
                className="text-sm text-teal-600 dark:text-teal-400 font-medium hover:underline flex items-center gap-1"
              >
                <FiPhone size={12} /> {partner.phone}
              </a>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800/40 p-4 rounded-2xl text-yellow-700 dark:text-yellow-400 text-sm font-medium">
          <FiClock className="shrink-0" /> Waiting for a delivery partner…
        </div>
      )}

      {/* Route stats */}
      {routeStats && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-2xl border border-teal-100 dark:border-teal-800/30 text-center">
            <p className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-1">Distance</p>
            <p className="text-xl font-black text-teal-700 dark:text-teal-300">{routeStats.distance}</p>
          </div>
          <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-2xl border border-teal-100 dark:border-teal-800/30 text-center">
            <p className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-1">Est. Time</p>
            <p className="text-xl font-black text-teal-700 dark:text-teal-300">{routeStats.duration}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryInfoCard;
