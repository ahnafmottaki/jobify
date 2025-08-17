import {
  Form,
  redirect,
  useLoaderData,
  type ActionFunction,
  type ActionFunctionArgs,
  type LoaderFunction,
  type LoaderFunctionArgs,
} from "react-router";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
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
export const action: ActionFunction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch("/jobs/" + params.id, data);
    toast.success("Job edited successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    showErrors(error);
  }
};

const EditJob = () => {
  const { job } = useLoaderData<SuccessResponse<Job, "job">>();
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            labelText="Position"
            defaultValue={job.position}
          />
          <FormRow
            type="text"
            name="company"
            labelText="Company"
            defaultValue={job.company}
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job Location"
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="Job Status"
            list={JOB_STATUS}
            defaultValue={job.jobStatus}
          />
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            list={JOB_TYPE}
            defaultValue={job.jobType}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
