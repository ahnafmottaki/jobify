import Job, { type JobModel } from "../models/job.model";
import { asyncHandler } from "../utils/asyncHandler";
import type { ResSuccessProp } from "../types/reqResTypes";
import { StatusCodes } from "http-status-codes";
import mongoose, { FilterQuery, Query, SortOrder, Types } from "mongoose";
import dayjs from "dayjs";

type ParamIdProp = {
  id: string;
};

interface GetAllJobsQueryProp {
  search?: string;
  jobStatus?: string;
  jobType?: string;
  sort?: string;
}

export const getAllJobs = asyncHandler<
  any,
  any,
  ResSuccessProp<JobModel[], "jobs">,
  GetAllJobsQueryProp
>(async (req, res, next) => {
  const query: FilterQuery<JobModel> = { createdBy: req.user.userId };
  const { search, jobStatus, jobType, sort } = req.query;
  if (search) {
    query.$or = [
      { position: new RegExp(search, "i") },
      {
        company: new RegExp(search, "i"),
      },
    ];
  }
  if (jobStatus && jobStatus !== "all") {
    query.jobStatus = jobStatus;
  }

  if (jobType && jobType !== "all") {
    query.jobType = jobType;
  }
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  } as const;
  type SortKeyProp = (typeof sortOptions)[keyof typeof sortOptions];
  let sortKey: SortKeyProp = sortOptions.newest;
  if (sort && Object.keys(sortOptions).includes(sort)) {
    sortKey = sortOptions[sort as keyof typeof sortOptions];
  }

  const jobs: JobModel[] = await Job.find(query).sort(sortKey);
  res.status(StatusCodes.OK).json({ success: true, jobs });
});

export const createJob = asyncHandler<
  any,
  ResSuccessProp<JobModel, "job">,
  JobModel
>(async (req, res, next) => {
  req.body.createdBy = new Types.ObjectId(req.user?.userId);
  const job = await Job.create(req.body);
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

export const showStats = asyncHandler(async (req, res, next) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  const typedStats = stats as unknown as {
    pending?: string;
    interview?: string;
    declined?: string;
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = dayjs()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  const defaultStats = {
    pending: typedStats?.pending || 0,
    interview: typedStats?.interview || 0,
    declined: typedStats?.declined || 0,
  };

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
});
