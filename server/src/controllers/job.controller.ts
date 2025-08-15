import type { CreateJobBody } from "../types/job";
import Job, { type JobModel } from "../models/job.model";
import asyncHandler from "../utils/asyncHandler";
import AppError from "../utils/AppError";
import type { ResSuccessProp } from "../types/reqResTypes";
import { StatusCodes } from "http-status-codes";

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
  Partial<CreateJobBody>
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
  { id?: string },
  ResSuccessProp<JobModel, "job">
>(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new AppError(StatusCodes.NOT_FOUND, "Job id required!"));
  }
  const job = await Job.findById(id);
  if (!job) {
    return next(new AppError(StatusCodes.NOT_FOUND, `no job with id ${id}`));
  }
  res.status(StatusCodes.OK).json({ success: true, job });
});

export const updateJob = asyncHandler<
  { id?: string },
  ResSuccessProp<JobModel, "job">,
  Partial<CreateJobBody>
>(async (req, res, next) => {
  if (!req.body?.company || !req.body?.position || !req.params.id) {
    return next(new AppError(404, "please provide company and position"));
  }
  const { company, position } = req.body;
  const { id } = req.params;
  const updateJob = await Job.findByIdAndUpdate(
    id,
    { company, position },
    { new: true }
  );
  if (!updateJob) {
    return next(new AppError(StatusCodes.NOT_FOUND, `no job with id ${id}`));
  }
  res.status(StatusCodes.OK).json({ success: true, job: updateJob });
});

export const deleteJob = asyncHandler<
  { id?: string },
  ResSuccessProp<string, "message">
>(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new AppError(StatusCodes.NOT_FOUND, "Job id required!"));
  }
  const removeJob = await Job.findByIdAndDelete(id);
  if (!removeJob) {
    return next(new AppError(StatusCodes.NOT_FOUND, `no job with id ${id}`));
  }
  res.status(StatusCodes.OK).json({ success: true, message: "job deleted" });
});
