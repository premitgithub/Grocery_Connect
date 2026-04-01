// backend/server.js
import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";
import app from "./src/app.js";

const PORT = process.env.PORT || 5000;

// ── Create HTTP server wrapping Express ──────────────────────────────────────
const httpServer = http.createServer(app);

// ── Socket.IO server ─────────────────────────────────────────────────────────
const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

// Make io accessible globally via req.app.get("io")
app.set("io", io);
io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  // Authenticated user joins their personal room for direct notification delivery
  socket.on("joinUserRoom", ({ userId }) => {
    if (userId) {
      socket.join(`user_${userId}`);
      console.log(`👤 Socket ${socket.id} joined personal room: user_${userId}`);
    }
  });

  // Delivery partner joins a room scoped to the order they're delivering
  socket.on("joinOrderRoom", ({ orderId }) => {
    socket.join(`order_${orderId}`);
    console.log(`📦 Socket ${socket.id} joined order room: order_${orderId}`);
  });

  // Delivery partner emits their current GPS coordinates
  // Payload: { orderId, latitude, longitude }
  socket.on("locationUpdate", ({ orderId, latitude, longitude }) => {
    // Broadcast to everyone watching this order (customers, admins)
    socket.to(`order_${orderId}`).emit("partnerLocationUpdate", { latitude, longitude });
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

// ── Start ─────────────────────────────────────────────────────────────────────
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

httpServer.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT} (HTTP + Socket.IO)`);
});
