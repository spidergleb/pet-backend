// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverRoutes from "../routes/serverRoutes";
import authRoutes from "../routes/authRoutes";

dotenv.config();

export async function createApp() {
  const app = express();

  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );
  app.use(express.json());

  app.use("/servers", serverRoutes);
  app.use("/auth", authRoutes);

  app.get("/", (req, res) => {
    res.json({ message: "Backend API is running 🚀" });
  });

  return app;
}
