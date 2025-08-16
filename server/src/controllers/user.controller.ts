import User from "../models/user.model";
import Job from "../models/job.model";
import { asyncHandler } from "../utils/asyncHandler";
import { StatusCodes } from "http-status-codes";

export const getCurrentUser = asyncHandler(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ msg: "get current user" });
});

export const getApplicationStats = asyncHandler(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ msg: "get application stats" });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ msg: "update  user" });
});
