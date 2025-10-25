// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverRoutes from "./routes/serverRoute.js";

// Import routes
// import userRoutes from "./src/routes/users.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// ===== Middleware =====
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // if you send cookies or auth headers
  })
); // Enable CORS for all origins — customize if needed
app.use(express.json()); // Parse JSON request body

app.use("/servers", serverRoutes);

// ===== Routes =====
app.get("/", (req, res) => {
  res.json({ message: "Backend API is running 🚀" });
});

// ===== Start Server =====
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
