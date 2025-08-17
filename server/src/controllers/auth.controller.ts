import { asyncHandler } from "../utils/asyncHandler";
import { StatusCodes } from "http-status-codes";
import User, { type UserProp } from "../models/user.model";
import { ResSuccessProp } from "../types/reqResTypes";
import { comparePassword, hashPassword } from "../utils/passwordUtils";
import AppError from "../utils/AppError";
import { createJWT } from "../utils/tokenUtils";
import jobModel from "../models/job.model";
("");

export const register = asyncHandler<
  any,
  ResSuccessProp<string, "message">,
  UserProp
>(async (req, res, next) => {
  const isFirstDocument = await User.countDocuments();
  if (isFirstDocument === 0) {
    req.body.role = "admin";
  }

  req.body.password = await hashPassword(req.body.password);
  await User.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: "user created" });
});

type LoginBody = { email: string; password: string };
export const login = asyncHandler<
  any,
  ResSuccessProp<string, "message">,
  LoginBody
>(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) {
    return next(new AppError(StatusCodes.UNAUTHORIZED, "invalid credentials"));
  }
  const token = createJWT({ userId: user._id.toString(), role: user.role });
  const oneDay = 24 * 60 * 60 * 1000;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ success: true, message: "user logged in" });
});

export const logout = asyncHandler<any, ResSuccessProp<string, "message">>(
  (req, res, next) => {
    res.cookie("token", "logout", {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: process.env.NODE_ENV === "production",
    });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "user logged out",
    });
  }
);
