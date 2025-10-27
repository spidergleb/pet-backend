import express from "express";
import {
  createServer,
  getServers,
  updateServer,
} from "../controllers/serversContoller.js";

const router = express.Router();

router.get("/", getServers);
router.post("/create", updateServer);
router.get("/update", createServer);

export default router;
