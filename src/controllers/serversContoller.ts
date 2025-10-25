import type { Request, Response, NextFunction } from "express";
import db from "../db/knex.js";

export const getServers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const servers = await db("servers").select("*");
    res.json(servers);
  } catch (err) {
    next(err);
  }
};
