import { JobModel } from "../models/job.model";

type ResSuccessProp<K, T extends string> = {
  success: true;
} & { [prop in T]: K };

type GetAllJobsResProp = {
  success: true;
  jobs: JobModel[];
  pagination: {
    totalJobs: number;
    numOfPages: number;
    currentPage: number;
  };
};

type ParamIdProp = {
  id: string;
};

interface GetAllJobsQueryProp {
  search?: string;
  jobStatus?: string;
  jobType?: string;
  sort?: string;
  page?: string;
  limit?: string;
}

export { ResSuccessProp, GetAllJobsResProp, GetAllJobsQueryProp, ParamIdProp };
