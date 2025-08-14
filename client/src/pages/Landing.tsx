import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="jobify" className="logo" />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            ducimus ab consectetur nulla iure adipisci modi, suscipit eligendi
            cumque nobis odit dolorum qui doloribus impedit aperiam assumenda!
            Sequi quaerat asperiores quae accusamus velit, ad harum et in
            mollitia! Fuga, repellat.
          </p>
          <Link to={"/register"} className="btn register-link">
            Register
          </Link>
          <Link to={"/login"} className="btn register-link">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt={"job hunt"} className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
