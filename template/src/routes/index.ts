import { Request, Response } from "express";

export const get = (req: Request, res: Response): void => {
  res.json({
    message: "Hello expressjs",
  });
};
