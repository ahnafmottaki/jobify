import asyncHandler from "../utils/asyncHandler";
import { StatusCodes } from "http-status-codes";
import User, { type UserProp } from "../models/user.model";
import { ResSuccessProp } from "../types/reqResTypes";
import bcrypt from "bcryptjs";

export const register = asyncHandler<
  any,
  ResSuccessProp<string, "message">,
  UserProp
>(async (req, res, next) => {
  const isFirstDocument = await User.countDocuments();
  if (isFirstDocument === 0) {
    req.body.role = "admin";
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;
  await User.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: "user created" });
});

export const login = asyncHandler(async (req, res) => {
  res.send("login");
});
