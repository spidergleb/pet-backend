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

export const createServer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { distance, name } = req.body;
  try {
    const servers = await db("servers").insert({ distance, name });
    res.json(servers);
  } catch (err) {
    next(err);
  }
};

export const updateServer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { distance, name } = req.body;
  try {
    const servers = await db("servers").update({ distance, name });
    res.json(servers);
  } catch (err) {
    next(err);
  }
};

export const deleteServer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;
  try {
    const servers = await db("servers").delete().where({ id });
    res.json(servers);
  } catch (err) {
    next(err);
  }
};
