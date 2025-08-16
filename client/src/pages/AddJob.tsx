import { Form, useNavigation, useOutletContext } from "react-router";
import type { User } from "../types/userTypes";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";

const AddJob = () => {
  const { user } = useOutletContext<{ user: User }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
