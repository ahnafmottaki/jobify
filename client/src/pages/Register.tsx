import { Logo, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { toast } from "react-toastify";
import { Form, Link, redirect, type ActionFunctionArgs } from "react-router";
import { FormRow } from "../components";
import customFetch from "../utils/customFetch";
import { showErrors } from "../utils/axiosFns";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    showErrors(error);
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>

        <FormRow
          type="text"
          name="name"
          labelText="Name"
          defaultValue={"john"}
        />
        <FormRow
          type="text"
          name="lastName"
          labelText="Last name"
          defaultValue={"smith"}
        />
        <FormRow
          type="text"
          name="location"
          labelText="Location"
          defaultValue={"earth"}
        />
        <FormRow
          type="email"
          name="email"
          labelText="Email"
          defaultValue={"example@gmail.com"}
        />
        <FormRow
          type="password"
          name="password"
          labelText="Password"
          defaultValue={"example123"}
        />
        <SubmitBtn />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
