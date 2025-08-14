import { Link, useRouteError } from "react-router";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";

type RouteError = { status: number };
const isRouteError = (error: unknown): error is RouteError => {
  return typeof error === "object" && error !== null && "status" in error;
};

const Error = () => {
  const error = useRouteError();
  if (isRouteError(error) && error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Ohh! page not found</h3>
          <p>We can't seem to find the page you're looking for</p>
          <Link to="/dashboard">back home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3>something went wrong</h3>
      </div>
    </Wrapper>
  );
};

export default Error;
