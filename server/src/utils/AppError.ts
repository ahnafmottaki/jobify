import { StatusCodes } from "http-status-codes";

class AppError extends Error {
  status: number;
  isOperational = true;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
