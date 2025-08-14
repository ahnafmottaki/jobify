import { Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link } from "react-router";
import { FormRow } from "../components";

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
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
          defaultValue={"3a@ahf"}
        />

        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
