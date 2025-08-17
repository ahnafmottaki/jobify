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
  const data =
    useLoaderData<SuccessResponse<{ users: string; jobs: string }, "stats">>();
  console.log(data);
  return (
    <Wrapper>
      <h1>Admin page</h1>
    </Wrapper>
  );
};

export default Admin;
