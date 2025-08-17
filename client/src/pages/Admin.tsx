import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import {
  redirect,
  useLoaderData,
  type LoaderFunction,
  type LoaderFunctionArgs,
} from "react-router";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import type { SuccessResponse } from "../types/axiosTypes";
import { StatItem } from "../components";

export const loader: LoaderFunction = async ({}: LoaderFunctionArgs) => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    return response.data;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { stats } =
    useLoaderData<SuccessResponse<{ users: string; jobs: string }, "stats">>();
  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={stats.users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="total jobs"
        count={stats.jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

export default Admin;
