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

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
console.log("🚀 ~ allowedOrigins:", allowedOrigins)

// ===== Middleware =====
app.use(
  cors({
    origin: allowedOrigins, // your frontend URL
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
  console.log(`Allowed origins ${allowedOrigins}`);
});
