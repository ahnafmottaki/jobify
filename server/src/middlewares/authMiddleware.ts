import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { StatusCodes } from "http-status-codes";
import { verifyJWT } from "../utils/tokenUtils";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies?.token) {
    return next(
      new AppError(StatusCodes.UNAUTHORIZED, "authentication invalid")
    );
  }
  try {
    const data = verifyJWT(req.cookies.token) as {
      userId: string;
      role: string;
    };
    const testUser = data.userId === "68a1983bbb394c633f38450d";
    req.user = { ...data, testUser };

    next();
  } catch (err) {
    return next(
      new AppError(StatusCodes.UNAUTHORIZED, "authentication invalid")
    );
  }
};

export const authorizePermissions = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          StatusCodes.UNAUTHORIZED,
          "Unauthorize to access this route"
        )
      );
    }
    next();
  };
};

export const checkForTestUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.testUser) {
    return next(new AppError(StatusCodes.BAD_REQUEST, "Demo user. Read Only "));
  }
  next();
};
