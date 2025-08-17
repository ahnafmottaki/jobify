import User, { UserProp } from "../models/user.model";
import Job from "../models/job.model";
import { asyncHandler } from "../utils/asyncHandler";
import { StatusCodes } from "http-status-codes";
import { ResSuccessProp } from "../types/reqResTypes";
import AppError from "../utils/AppError";
import { validationResult } from "express-validator";

export const getCurrentUser = asyncHandler<any, ResSuccessProp<object, "user">>(
  async (req, res, next) => {
    const user = await User.findOne({ _id: req.user?.userId });
    if (!user)
      return next(new AppError(StatusCodes.NOT_FOUND, "user not found"));
    const userWithoutPassword = user.toJSON();
    res
      .status(StatusCodes.OK)
      .json({ success: true, user: userWithoutPassword });
  }
);

export const getApplicationStats = asyncHandler<
  any,
  ResSuccessProp<{ users: number; jobs: number }, "stats">
>(async (req, res, next) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();

  res.status(StatusCodes.OK).json({
    success: true,
    stats: {
      users,
      jobs,
    },
  });
});

export const updateUser = asyncHandler<
  any,
  ResSuccessProp<string, "message">,
  UserProp
>(async (req, res, next) => {
  console.log(req.file);
  await User.findByIdAndUpdate(req.user?.userId, validationResult(req));
  res.status(StatusCodes.OK).json({ success: true, message: "update  user" });
});
