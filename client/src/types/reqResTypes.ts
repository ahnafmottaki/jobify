import type { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from "../utils/constants";
import type { Job } from "./jobType";

interface AllJobResProp {
  jobs: Job[];
  pagination: {
    totalJobs: string;
    numOfPages: string;
    currentPage: string;
  };
  search: string;
  jobStatus: "all" | (typeof JOB_STATUS)[keyof typeof JOB_STATUS];
  jobType: "all" | (typeof JOB_TYPE)[keyof typeof JOB_TYPE];
  sort: (typeof JOB_SORT_BY)[keyof typeof JOB_SORT_BY];
}
export type { AllJobResProp };
