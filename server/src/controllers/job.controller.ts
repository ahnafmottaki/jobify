import { NextFunction, type Request, type Response } from "express";
import type { JobProp, CreateJobBody } from "../types/job";
import { nanoid } from "nanoid";
import Job, { type JobModel } from "../models/job.model";
import asyncHandler from "../utils/asyncHandler";
import AppError from "../utils/AppError";
import type {
  ResProp,
  ReqBodyProp,
  ResSuccessProp,
} from "../types/reqResTypes";

let jobs: JobProp[] = [
  { id: nanoid(), company: "apple", position: "frontend" },
  { id: nanoid(), company: "facebook", position: "backend" },
];

export const getAllJobs = asyncHandler<
  any,
  any,
  ResSuccessProp<JobModel[], "jobs">
>(async (req, res, next) => {
  const jobs: JobModel[] = await Job.find({});
  res.status(200).json({ success: true, jobs });
});

export const createJob = asyncHandler<
  any,
  ResSuccessProp<JobModel, "job">,
  Partial<CreateJobBody>
>(async (req, res, next) => {
  if (!req.body?.company || !req.body?.position) {
    return next(new AppError(404, "company and position required"));
  }
  const { company, position } = req.body;
  const job: JobModel = await Job.create({ company, position });
  res.status(201).json({ success: true, job });
});

export const getJob = asyncHandler<
  { id: string },
  ResSuccessProp<JobModel, "job">
>(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new AppError(404, "Job id required!"));
  }
  const job = await Job.findById(id);
  if (!job) {
    return next(new AppError(404, `no job with id ${id}`));
  }
  res.status(200).json({ success: true, job });
});

export const updateJob = (
  req: Request<{ id: string }, ResProp<JobProp, "job">>,
  res: Response
) => {
  if (!req.body?.company || !req.body?.position || !req.params.id) {
    return res.status(400).json({
      success: false,
      message: "please provide company and position",
    });
  }
  const { company, position } = req.body;
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res
      .status(404)
      .json({ success: false, message: `no job with id ${id}` });
  }

  job.company = company;
  job.position = position;
  res.status(200).json({ success: true, job });
};

export const deleteJob = asyncHandler<
  { id: string },
  ResSuccessProp<string, "message">
>(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new AppError(404, "Job id required!"));
  }
  const removeJob = await Job.findByIdAndDelete(id);
  if (!removeJob) {
    return next(new AppError(404, `no job with id ${id}`));
  }
  res.status(200).json({ success: true, message: "job deleted" });
});
