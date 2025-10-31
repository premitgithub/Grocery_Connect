// backend/server.js
import dotenv from "dotenv";
dotenv.config(); // ✅ Load environment variables

import app from "./src/app.js";

const PORT = process.env.PORT || 5000;

// Debug log to verify .env is loaded
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
