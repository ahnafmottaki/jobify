import {
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunction,
} from "react-router";
import customFetch from "../utils/customFetch";
import { showErrors } from "../utils/axiosFns";
import { JobsContainer, SearchContainer } from "../components";
import type { Job } from "../types/jobType";
import { createContext, useContext } from "react";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
import type { AllJobResProp } from "../types/reqResTypes";

export const loader: LoaderFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const params = Object.fromEntries(
    new URL(request.url).searchParams.entries()
  );
  try {
    const { data } = await customFetch.get("/jobs", {
      params,
    });
    return { ...data, ...params };
  } catch (error) {
    showErrors(error);
  }
};

const AllJobsContext = createContext<AllJobResProp>({
  jobs: [],
  pagination: { totalJobs: "0", numOfPages: "0", currentPage: "0" },
  search: "",
  jobStatus: "all",
  jobType: "all",
  sort: "newest",
});

const AllJobs = () => {
  const ctxValue = useLoaderData<AllJobResProp>();

  return (
    <AllJobsContext.Provider value={ctxValue}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => {
  return useContext(AllJobsContext);
};

export default AllJobs;
