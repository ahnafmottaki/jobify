import Job, { type JobModel } from "../models/job.model";
import asyncHandler from "../utils/asyncHandler";
import AppError from "../utils/AppError";
import type { ResSuccessProp } from "../types/reqResTypes";
import { StatusCodes } from "http-status-codes";

type ParamIdProp = {
  id: string;
};

export const getAllJobs = asyncHandler<
  any,
  any,
  ResSuccessProp<JobModel[], "jobs">
>(async (req, res, next) => {
  const jobs: JobModel[] = await Job.find({});
  res.status(StatusCodes.OK).json({ success: true, jobs });
});

export const createJob = asyncHandler<
  any,
  ResSuccessProp<JobModel, "job">,
  Partial<JobModel>
>(async (req, res, next) => {
  if (!req.body?.company || !req.body?.position) {
    return next(
      new AppError(StatusCodes.NOT_FOUND, "company and position required")
    );
  }
  const { company, position } = req.body;
  const job: JobModel = await Job.create({ company, position });
  res.status(StatusCodes.CREATED).json({ success: true, job });
});

export const getJob = asyncHandler<
  ParamIdProp,
  ResSuccessProp<JobModel, "job">
>(async (req, res, next) => {
  const job = (await Job.findById(req.params.id))!;
  res.status(StatusCodes.OK).json({ success: true, job });
});

export const updateJob = asyncHandler<
  ParamIdProp,
  ResSuccessProp<JobModel, "job">,
  Partial<JobModel>
>(async (req, res, next) => {
  const updateJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ success: true, job: updateJob! });
});

export const deleteJob = asyncHandler<
  ParamIdProp,
  ResSuccessProp<string, "message">
>(async (req, res, next) => {
  await Job.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ success: true, message: "job deleted" });
});
