import type { FC } from "react";
import type { Job as JobType } from "../types/jobType";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import dayjs from "dayjs";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import { Form, Link } from "react-router";

const Job: FC<JobType> = ({
  position,
  company,
  jobLocation,
  jobStatus,
  jobType,
  createdAt,
}) => {
  const date = dayjs(createdAt).format("MMM DD, YYYY");
  console.log(date);
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer className="actions">
          <Link className="btn edit-btn" to={"/"}>
            Edit
          </Link>
          <Form>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
