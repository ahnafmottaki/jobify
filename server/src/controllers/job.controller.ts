import { NextFunction, type Request, type Response } from "express";
import type { JobProp, CreateJobBody } from "../types/job";
import { nanoid } from "nanoid";
import Job, { type JobModel } from "../models/job.model";
import asyncHandler from "../utils/asyncHandler";
import AppError from "../utils/AppError";
import type { ResProp, ReqBodyProp, ResponseProp } from "../types/reqResTypes";

let jobs: JobProp[] = [
  { id: nanoid(), company: "apple", position: "frontend" },
  { id: nanoid(), company: "facebook", position: "backend" },
];

export const getAllJobs = (
  req: Request,
  res: Response<ResProp<JobProp[], "jobs">>
) => {
  res.status(200).json({ success: true, jobs });
};

export const createJob = asyncHandler(
  async (
    req: ReqBodyProp<CreateJobBody>,
    res: ResponseProp<JobModel, "job">,
    next: NextFunction
  ) => {
    if (!req.body?.company || !req.body?.position) {
      return res.status(400).json({
        success: false,
        message: "please provide company and position",
      });
    }
    const { company, position } = req.body;
    return next(new AppError(446, "custom message"));
    const job: JobModel = await Job.create("something");
    res.status(201).json({ success: true, job });
  }
);

export const getJob = (
  req: Request<{ id: string }, ResProp<JobProp, "job">>,
  res: Response
) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!id || !job) {
    return res
      .status(404)
      .json({ success: false, message: `no job with id ${id}` });
  }
  res.status(200).json({ success: true, job });
};

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

export const deleteJob = (
  req: Request<{ id: string }, ResProp<string, "message">>,
  res: Response
) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job || !id) {
    return res
      .status(404)
      .json({ success: false, message: `no job with id ${id}` });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;

  res.status(200).json({ success: true, message: "job deleted" });
};
