import asyncHandler from "../utils/asyncHandler";
import { StatusCodes } from "http-status-codes";
import User, { type UserProp } from "../models/user.model";
import { ResSuccessProp } from "../types/reqResTypes";
import { comparePassword, hashPassword } from "../utils/passwordUtils";
import AppError from "../utils/AppError";

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
export const login = asyncHandler<any, any, LoginBody>(
  async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    const isValidUser =
      user && (await comparePassword(req.body.password, user.password));
    if (!isValidUser) {
      return next(
        new AppError(StatusCodes.UNAUTHORIZED, "invalid credentials")
      );
    }

    res.send("login");
  }
);
