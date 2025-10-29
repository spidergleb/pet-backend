import type { Request, Response, NextFunction } from "express";
import { getContext } from "../context.js";


export const getServers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { dbClient } = getContext();

  console.log("#getServers: getting servers...")
  try {
    const servers = await dbClient.builder("servers").select("*");
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
  const { dbClient } = getContext();
  const { distance, name } = req.body;
  try {
    const servers = await dbClient
    .builder("servers")
    .insert({ distance, name });
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
  const { dbClient } = getContext();
  const { distance, name } = req.body;
  try {
    const servers = await dbClient
    .builder("servers")
    .update({ distance, name });
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
  const { dbClient } = getContext();
  const { id } = req.body;
  try {
    const servers = await dbClient.builder("servers").delete().where({ id });
    res.json(servers);
  } catch (err) {
    next(err);
  }
};
