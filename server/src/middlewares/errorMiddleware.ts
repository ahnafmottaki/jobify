import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

const isAppError = (errorObj: Error | AppError): errorObj is AppError => {
  return "isOperational" in errorObj;
};

const errorMiddleware = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  if (isAppError(error)) {
    statusCode = error.status;
    message = error.message;
    console.log(error);
  }
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;
