import { NextFunction, Request, Response } from "express";
const asyncHandler =
  <P = Record<string, any>, ResBody = any, ReqBody = any, ResQuery = any>(
    fn: (
      req: Request<P, ResBody, ReqBody, ResQuery>,
      res: Response<ResBody>,
      next: NextFunction
    ) => void | Promise<unknown>
  ) =>
  (
    req: Request<P, ResBody, ReqBody, ResQuery>,
    res: Response<ResBody>,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncHandler;
