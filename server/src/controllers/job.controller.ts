import { type Request, type Response } from "express";
import type { JobProp, CreateJobBody } from "../types/job";
import { nanoid } from "nanoid";

let jobs: JobProp[] = [
  { id: nanoid(), company: "apple", position: "frontend" },
  { id: nanoid(), company: "facebook", position: "backend" },
];

type ResErrorProp = {
  success: false;
  message: string;
};
type ResSuccessProp<K, T extends string> = {
  success: true;
} & { [prop in T]: K };

type ResProp<K, T extends string> = ResErrorProp | ResSuccessProp<K, T>;

export const getAllJobs = (
  req: Request<{}, ResProp<JobProp[], "jobs">>,
  res: Response
) => {
  res.status(200).json({ success: true, jobs });
};

export const createJob = (
  req: Request<{}, ResProp<JobProp, "job">, Partial<CreateJobBody>>,
  res: Response
) => {
  if (!req.body?.company || !req.body?.position) {
    return res.status(400).json({
      success: false,
      message: "please provide company and position",
    });
  }
  const { company, position } = req.body;
  const id = nanoid();
  const job: JobProp = { id, company, position };
  jobs.push(job);
  res.status(201).json({ success: true, job });
};

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
