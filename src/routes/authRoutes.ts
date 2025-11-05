import express from "express";
import { getCurrentUser, getToken } from "../controllers/authContoller.js";

const router = express.Router();

router.post("/token", getToken);
router.get("/me", getCurrentUser);

export default router;
