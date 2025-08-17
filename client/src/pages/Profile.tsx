import {
  Form,
  useNavigation,
  useOutletContext,
  type ActionFunction,
  type ActionFunctionArgs,
} from "react-router";
import type { User } from "../types/userTypes";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { showErrors } from "../utils/axiosFns";

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const file = formData.get("avatar");
  if (file && file instanceof File && file.size > 500000) {
    toast.error("Image size too large");
    return null;
  }
  try {
    await customFetch.patch("/users/update-user", formData);
    toast.success("Profile updated successfully");
  } catch (error) {
    showErrors(error);
  }
  return null;
};

const Profile = () => {
  const { user } = useOutletContext<{ user: User }>();
  const { name, lastName, email, location } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 0.5 MB)
            </label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow
            type="text"
            name="name"
            defaultValue={name}
            labelText="Name"
          />
          <FormRow
            type="text"
            name="lastName"
            defaultValue={lastName}
            labelText="Last Name"
          />
          <FormRow
            type="text"
            name="email"
            defaultValue={email}
            labelText="Email"
          />
          <FormRow
            type="text"
            name="location"
            defaultValue={location}
            labelText="Location"
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

export default Profile;
