import { Request, Response } from "express";

export function get(req: Request, res: Response): void {
  res.json({
    message: "Hello express.js",
  });
};
