import { NextFunction, Request, Response } from "express";
type Fn = (a: Request, b: Response, c: NextFunction) => void | Promise<unknown>;
const asyncHandler =
  (fn: Fn) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncHandler;
