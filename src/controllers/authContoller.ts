import type { Request, Response, NextFunction } from "express";
import { getContext } from "../context.js";

export const getToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  console.log("#getToken: getting token...");

  res.json({ token: `${username}:${password}` });
  // try {
  //   const servers = await dbClient.builder("servers").select("*");
  //   res.json(servers);
  // } catch (err) {
  //   next(err);
  // }
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    username: "spidergleb",
    password: "password",
  });
};
