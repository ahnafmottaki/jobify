import { Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

interface ResProp {
  success: false;
  message: string;
}
const notFoundMiddleware = (
  req: Request<any, ResProp>,
  res: Response<ResProp>
) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: getReasonPhrase(StatusCodes.NOT_FOUND),
  });
};

export default notFoundMiddleware;
