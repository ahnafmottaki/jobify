import {
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunction,
} from "react-router";
import customFetch from "../utils/customFetch";
import { showErrors } from "../utils/axiosFns";
import { JobsContainer, SearchContainer } from "../components";
import type { SuccessResponse } from "../types/axiosTypes";
import type { Job } from "../types/jobType";
import { createContext, useContext } from "react";

export const loader: LoaderFunction = async ({}: ActionFunctionArgs) => {
  try {
    const { data } = await customFetch.get("/jobs");
    return data;
  } catch (error) {
    showErrors(error);
  }
};

const AllJobsContext = createContext<{ jobs: Array<Job> }>({ jobs: [] });

const AllJobs = () => {
  const { jobs } = useLoaderData<SuccessResponse<Job[], "jobs">>();
  console.log(jobs);
  return (
    <AllJobsContext.Provider value={{ jobs }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => {
  return useContext(AllJobsContext);
};

export default AllJobs;
