import { Logo, FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, Link, redirect, type ActionFunctionArgs } from "react-router";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { showErrors } from "../utils/axiosFns";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    showErrors(error);
  }
};

const Login = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" defaultValue="example@gmail.com" />
        <FormRow type="password" name="password" defaultValue="example123" />
        <SubmitBtn />
        <button type="button" className="btn btn-block">
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
