import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

// ─── Haversine distance (km) ───────────────────────────────────────────────────
export const haversineKm = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// ─── ETA string from km ────────────────────────────────────────────────────────
export const etaString = (distKm, speedKmh = 28) => {
  const mins = Math.max(1, Math.round((distKm / speedKmh) * 60));
  if (mins < 60) return `~${mins} min${mins > 1 ? "s" : ""}`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `~${h}h ${m}m`;
};

/**
 * Connects to Socket.IO, joins the given order room, and streams
 * real-time delivery partner location updates.
 *
 * Returns:
 *   livePos      – [lat, lng] | null   (smoothly interpolated)
 *   eta          – string | null       ("~12 mins")
 *   socketStatus – "connected" | "disconnected" | "reconnecting"
 */
const useDeliverySocket = ({ orderId, dropLocation, active }) => {
  const [livePos,      setLivePos]      = useState(null);
  const [eta,          setEta]          = useState(null);
  const [socketStatus, setSocketStatus] = useState("disconnected");

  const socketRef     = useRef(null);
  const currentPos    = useRef(null);  // last confirmed position
  const animFrame     = useRef(null);
  const lastUpdateRef = useRef(0);

  // ── Smooth interpolation between two positions ─────────────────────────────
  const animateTo = (fromPos, toPos) => {
    if (!fromPos) { setLivePos(toPos); currentPos.current = toPos; return; }

    let t = 0;
    const step = () => {
      t += 0.05; // ~20 steps over 1s
      if (t >= 1) { setLivePos(toPos); currentPos.current = toPos; return; }
      const lat = fromPos[0] + (toPos[0] - fromPos[0]) * t;
      const lng = fromPos[1] + (toPos[1] - fromPos[1]) * t;
      setLivePos([lat, lng]);
      animFrame.current = setTimeout(step, 50);
    };
    if (animFrame.current) clearTimeout(animFrame.current);
    step();
  };

  useEffect(() => {
    // Only connect when order is in transit
    if (!orderId || !active) return;

    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socketRef.current = socket;

    socket.on("connect", () => {
      setSocketStatus("connected");
      socket.emit("joinOrderRoom", { orderId });
    });

    socket.on("disconnect", () => setSocketStatus("disconnected"));
    socket.on("connect_error", () => setSocketStatus("reconnecting"));
    socket.io.on("reconnect_attempt", () => setSocketStatus("reconnecting"));
    socket.io.on("reconnect", () => setSocketStatus("connected"));

    // Throttle location updates to max 1 per 2 s
    socket.on("partnerLocationUpdate", ({ latitude, longitude }) => {
      const now = Date.now();
      if (now - lastUpdateRef.current < 2000) return;
      lastUpdateRef.current = now;

      const newPos = [latitude, longitude];
      animateTo(currentPos.current, newPos);

      // Update ETA dynamically
      if (dropLocation?.lat) {
        const distKm = haversineKm(latitude, longitude, dropLocation.lat, dropLocation.lng);
        setEta(etaString(distKm));
      }
    });

    return () => {
      socket.disconnect();
      if (animFrame.current) clearTimeout(animFrame.current);
    };
  }, [orderId, active, dropLocation?.lat, dropLocation?.lng]);

  return { livePos, eta, socketStatus };
};

export default useDeliverySocket;
