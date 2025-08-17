import {
  useLoaderData,
  type LoaderFunction,
  type LoaderFunctionArgs,
} from "react-router";
import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { showErrors } from "../utils/axiosFns";
import type { JobStatResProp } from "../types/statsTypes";

export const loader: LoaderFunction = async ({}: LoaderFunctionArgs) => {
  try {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData<JobStatResProp>();
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer monthlyApplications={monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
