import {
  redirect,
  useLoaderData,
  useParams,
  type ActionFunction,
  type ActionFunctionArgs,
  type LoaderFunction,
  type LoaderFunctionArgs,
} from "react-router";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { showErrors } from "../utils/axiosFns";
import type { SuccessResponse } from "../types/axiosTypes";
import type { Job } from "../types/jobType";

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  try {
    const { data } = await customFetch.get("/jobs/" + params.id);
    return data;
  } catch (error) {
    showErrors(error);
    return redirect("/dashboard/all-jobs");
  }
};
export const action: ActionFunction = ({}: ActionFunctionArgs) => {};

const EditJob = () => {
  const { job } = useLoaderData<SuccessResponse<Job, "job">>();
  console.log(job);
  return <div>EditJob</div>;
};

export default EditJob;
