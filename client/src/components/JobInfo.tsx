import { type ReactNode } from "react";
import Wrapper from "../assets/wrappers/JobInfo";
interface JobInfoProp {
  icon: ReactNode;
  text: string;
}
const JobInfo = ({ icon, text }: JobInfoProp) => {
  return (
    <Wrapper>
      <span className="job-icon">{icon}</span>
      <span className="job-text">{text}</span>
    </Wrapper>
  );
};

export default JobInfo;
