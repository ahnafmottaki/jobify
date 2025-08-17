import User, { UserProp } from "../models/user.model";
import Job from "../models/job.model";
import { asyncHandler } from "../utils/asyncHandler";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { ResSuccessProp } from "../types/reqResTypes";
import AppError from "../utils/AppError";
import { validationResult } from "express-validator";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { promises as fs } from "fs";
import { response } from "express";

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

export const updateUser = asyncHandler<any, ResSuccessProp<string, "message">>(
  async (req, res, next) => {
    const data: any = { ...validationResult(req) };
    if (req.file) {
      const response = await cloudinary.uploader.upload(req.file.path, {
        folder: "jobify_uploads",
      });
      await fs.unlink(req.file.path);
      data.avatar = response.secure_url;
      data.avatarPublicId = response.public_id;
    }

    const updateUser = await User.findByIdAndUpdate(req.user?.userId, data);
    if (req.file && updateUser?.avatarPublicId) {
      await cloudinary.uploader.destroy(updateUser.avatarPublicId);
    }
    res.status(StatusCodes.OK).json({ success: true, message: "update  user" });
  }
);
