import {
  redirect,
  type ActionFunction,
  type ActionFunctionArgs,
} from "react-router";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { showErrors } from "../utils/axiosFns";

export const action: ActionFunction = async ({
  params,
}: ActionFunctionArgs) => {
  try {
    await customFetch.delete("/jobs/" + params.id);
    toast.success("Job deleted successfully");
  } catch (error) {
    showErrors(error);
  }
  return redirect("/dashboard/all-jobs");
};

const DeleteJob = () => {
  return <div>DeleteJob</div>;
};

export default DeleteJob;
