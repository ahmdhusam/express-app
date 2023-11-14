import { NextFunction, Request, Response } from "express";

export function CatchError(
  fn: (_req: Request, _res: Response, _next: NextFunction) => any
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
