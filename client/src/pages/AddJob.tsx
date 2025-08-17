import {
  Form,
  redirect,
  useOutletContext,
  type ActionFunction,
  type ActionFunctionArgs,
} from "react-router";
import type { User } from "../types/userTypes";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { showErrors } from "../utils/axiosFns";

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/jobs", data);
    toast.success("Job added successfully");
    return redirect("all-jobs");
  } catch (error) {
    showErrors(error);
  }
};

const AddJob = () => {
  const { user } = useOutletContext<{ user: User }>();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Job</h4>
        <div className="form-center">
          <FormRow labelText="Position" type="text" name="position" />
          <FormRow labelText="Company" type="text" name="company" />
          <FormRow
            type="text"
            labelText="Job Location"
            name="jobLocation"
            defaultValue={user.location}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="Job Status"
            list={JOB_STATUS}
            defaultValue={JOB_STATUS.PENDING}
          />
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            list={JOB_TYPE}
            defaultValue={JOB_TYPE.INTERNSHIP}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
