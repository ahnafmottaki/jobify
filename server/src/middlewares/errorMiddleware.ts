import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { StatusCodes } from "http-status-codes";

const isAppError = (errorObj: Error | AppError): errorObj is AppError => {
  return "isOperational" in errorObj;
};

const errorMiddleware = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
  let message: string = "Something went wrong";
  if (isAppError(error)) {
    statusCode = error.status;
    message = error.message;
  }
  console.log(error);
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;
