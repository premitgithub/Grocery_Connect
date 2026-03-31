import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FiArrowLeft, FiMapPin } from "react-icons/fi";

import { UserContext }    from "../../context/UserContext";
import useDeliverySocket, { haversineKm, etaString } from "../../hooks/useDeliverySocket";
import PageLoader         from "./components/shared/PageLoader";
import PageError          from "./components/shared/PageError";
import TrackHeader        from "./components/track/TrackHeader";
import OrderTimeline      from "./components/track/OrderTimeline";
import DeliveryInfoCard   from "./components/track/DeliveryInfoCard";
import TrackingMap        from "./components/track/TrackingMap";

// ─── Interpolation helper (for simulated movement fallback) ───────────────────
const lerp = (a, b, t) => a + (b - a) * t;

const IN_TRANSIT = ["Picked Up", "Out for Delivery"];

// ─── Page ─────────────────────────────────────────────────────────────────────
const TrackOrderPage = () => {
  const { orderId } = useParams();
  const navigate    = useNavigate();
  const { user }    = useContext(UserContext);

  const [order,         setOrder]         = useState(null);
  const [isLoading,     setIsLoading]     = useState(true);
  const [error,         setError]         = useState("");
  const [routeCoords,   setRouteCoords]   = useState([]);
  const [routeStats,    setRouteStats]    = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  // Simulated partner position (used when socket has no real data yet)
  const [simPos,     setSimPos]     = useState(null);
  const simRef      = useRef(null);
  const simProgress = useRef(0);

  const isInTransit = IN_TRANSIT.includes(order?.status);

  // ── Real-time socket hook ─────────────────────────────────────────────────
  const { livePos, eta: socketEta, socketStatus } = useDeliverySocket({
    orderId,
    dropLocation: order?.dropLocation,
    active: isInTransit,
  });

  // Resolved partner position: prefer live socket → simulated fallback
  const partnerPos = livePos ?? simPos;

  // ── Static ETA from OSRM route (when socket has no live position yet) ─────
  const [staticEta, setStaticEta] = useState(null);

  // ── Fetch order ──────────────────────────────────────────────────────────────
  const fetchOrder = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to track your order.");
        setIsLoading(false);
        return;
      }
      const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.order) {
        setOrder(res.data.order);
        setLastRefreshed(new Date());
      } else {
        setError("Order not found.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load order.");
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (user?.verified) fetchOrder();
    else setIsLoading(false);
  }, [user, fetchOrder]);

  // Poll every 15 s while order is active
  useEffect(() => {
    if (!user?.verified) return;
    const id = setInterval(() => {
      if (order?.status === "Delivered" || order?.status === "Rejected") return;
      fetchOrder();
    }, 15000);
    return () => clearInterval(id);
  }, [user, order, fetchOrder]);

  // ── OSRM route ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const pu = order?.pickupLocation;
    const dr = order?.dropLocation;
    if (!pu?.lat || !dr?.lat) return;

    (async () => {
      try {
        const res  = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${pu.lng},${pu.lat};${dr.lng},${dr.lat}?overview=full&geometries=geojson`
        );
        const data = await res.json();
        if (data.routes?.[0]) {
          const r = data.routes[0];
          setRouteCoords(r.geometry.coordinates.map(c => [c[1], c[0]]));
          const distKm = r.distance / 1000;
          setRouteStats({
            distance: distKm.toFixed(1) + " km",
            duration: Math.round(r.duration / 60) + " mins",
          });
          // Static ETA from full route distance (shown before partner starts moving)
          setStaticEta(etaString(distKm));
        }
      } catch (e) {
        console.error("Route fetch failed", e);
      }
    })();
  }, [order?.pickupLocation, order?.dropLocation]);

  // ── Simulated partner movement (fallback when no real socket data) ─────────
  useEffect(() => {
    if (!order) return;
    const pu = order.pickupLocation;
    const dr = order.dropLocation;

    if (simRef.current) { clearInterval(simRef.current); simRef.current = null; }

    // Prefer real backend location stored on user record
    if (order.deliveryPartner?.location?.lat) {
      setSimPos([order.deliveryPartner.location.lat, order.deliveryPartner.location.lng]);
      return;
    }

    // Only simulate when in transit and no live socket data
    if (isInTransit && pu?.lat && dr?.lat && !livePos) {
      simProgress.current = 0;
      setSimPos([pu.lat, pu.lng]);
      simRef.current = setInterval(() => {
        simProgress.current = Math.min(simProgress.current + 0.01, 1);
        setSimPos([
          lerp(pu.lat, dr.lat, simProgress.current),
          lerp(pu.lng, dr.lng, simProgress.current),
        ]);
        if (simProgress.current >= 1) { clearInterval(simRef.current); simRef.current = null; }
      }, 3000);
    } else {
      setSimPos(null);
    }

    return () => { if (simRef.current) { clearInterval(simRef.current); simRef.current = null; } };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order?.status, order?.pickupLocation, order?.dropLocation, order?.deliveryPartner?.location, livePos]);

  // ── Guard renders ──────────────────────────────────────────────────────────
  if (isLoading)       return <PageLoader message="Loading tracking info..." />;
  if (error || !order) return <PageError message={error} emoji="🚫" backTo="/orders" />;

  // Live ETA takes priority; fall back to static route ETA
  const displayEta = socketEta ?? (isInTransit ? staticEta : null);

  return (
    <div className="min-h-screen bg-teal-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      {/* Bg blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-300/20 dark:bg-teal-700/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-300/20 dark:bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-6">

        {/* Back button */}
        <button
          onClick={() => navigate(`/orders/${orderId}`)}
          className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-semibold hover:text-teal-800 transition-colors group w-max"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Order Details
        </button>

        {/* Header + Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden"
        >
          <TrackHeader order={order} lastRefreshed={lastRefreshed} onRefresh={fetchOrder} />
          <OrderTimeline currentStatus={order.status} />
        </motion.div>

        {/* Info + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Delivery info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl shadow-md border border-gray-100 dark:border-slate-700 p-6"
          >
            <DeliveryInfoCard
              order={order}
              routeStats={routeStats}
              eta={displayEta}
            />
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-3xl shadow-md border border-gray-100 dark:border-slate-700 p-6 flex flex-col"
          >
            {/* Map header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FiMapPin className="text-teal-600 dark:text-teal-400" /> Live Map
              </h2>
              {isInTransit && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full border border-green-200 dark:border-green-800">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping inline-block" />
                  Delivery in progress 🚚
                </span>
              )}
            </div>

            <TrackingMap
              pickup={order.pickupLocation}
              drop={order.dropLocation}
              partnerPos={partnerPos}
              routeCoords={routeCoords}
              isInTransit={isInTransit}
              deliveryAddress={order.deliveryAddress}
              partnerName={order.deliveryPartner?.name}
              eta={displayEta}
              socketStatus={socketStatus}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
