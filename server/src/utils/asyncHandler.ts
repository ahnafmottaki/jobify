import { NextFunction, Request, Response } from "express";
const asyncHandler =
  <P = Record<string, string>, ResBody = any, ReqBody = any, ReqQuery = any>(
    fn: (
      req: Request<P, ResBody, ReqBody, ReqQuery>,
      res: Response<ResBody>,
      next: NextFunction
    ) => void | Promise<unknown>
  ) =>
  (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// interface AuthenticatedRequest<
//   P = Record<string, string>,
//   ResBody = any,
//   ReqBody = any,
//   ReqQuery = any
// > extends Request<P, ResBody, ReqBody, ReqQuery> {
//   user: {
//     userId: string;
//     role: string;
//   };
// }

// const asyncAuthHandler =
//   <P = Record<string, string>, ResBody = any, ReqBody = any, ReqQuery = any>(
//     fn: (
//       req: AuthenticatedRequest<P, ResBody, ReqBody, ReqQuery>,
//       res: Response<ResBody>,
//       next: NextFunction
//     ) => void | Promise<unknown>
//   ) =>
//   (
//     req: AuthenticatedRequest<P, ResBody, ReqBody, ReqQuery>,
//     res: Response<ResBody>,
//     next: NextFunction
//   ) => {
//     Promise.resolve(fn(req, res, next)).catch(next);
//   };

export { asyncHandler };
