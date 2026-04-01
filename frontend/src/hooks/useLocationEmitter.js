import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";
const EMIT_INTERVAL_MS = 3000; // emit location every 3 seconds
const IN_TRANSIT = ["Picked Up", "Out for Delivery"];

/**
 * Used by the delivery partner's UI.
 * When the order is in transit, connects to the socket, joins the order
 * room, and continuously broadcasts the partner's GPS location so that
 * the customer's Track Order page can receive real-time updates.
 *
 * @param {string} orderId   - the order being delivered
 * @param {string} status    - current order status
 */
const useLocationEmitter = ({ orderId, status }) => {
  const socketRef  = useRef(null);
  const timerRef   = useRef(null);
  const activeRef  = useRef(false);

  useEffect(() => {
    const active = IN_TRANSIT.includes(status) && !!orderId;
    activeRef.current = active;

    if (!active) {
      // Stop everything if order is not in transit
      if (timerRef.current)  { clearInterval(timerRef.current); timerRef.current = null; }
      if (socketRef.current) { socketRef.current.disconnect(); socketRef.current = null; }
      return;
    }

    // ── Connect ──────────────────────────────────────────────────────────────
    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("joinOrderRoom", { orderId });
      startEmitting(socket);
    });

    socket.on("disconnect", () => {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    });

    return () => {
      activeRef.current = false;
      if (timerRef.current)  { clearInterval(timerRef.current); timerRef.current = null; }
      if (socketRef.current) { socketRef.current.disconnect(); socketRef.current = null; }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, status]);

  // ── GPS broadcast loop ───────────────────────────────────────────────────────
  const startEmitting = (socket) => {
    if (!navigator.geolocation) return;

    const emitOnce = () => {
      if (!activeRef.current) return;
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          socket.emit("locationUpdate", {
            orderId,
            latitude:  coords.latitude,
            longitude: coords.longitude,
          });
        },
        (err) => {
          // GPS unavailable – silently skip this tick
          console.warn("GPS unavailable:", err.message);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    };

    emitOnce(); // fire immediately on connect
    timerRef.current = setInterval(emitOnce, EMIT_INTERVAL_MS);
  };
};

export default useLocationEmitter;
