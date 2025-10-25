import express from "express";
import { getServers } from "../controllers/serversContoller.js";

const router = express.Router();

router.get("/", getServers);

export default router;