import { Form, Link, useSubmit } from "react-router";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRowSelect, FormRow, SubmitBtn } from "../components";
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from "../utils/constants";
import type { FormEvent } from "react";
import { useAllJobsContext } from "../pages/AllJobs";

const SearchContainer = () => {
  const submit = useSubmit();
  const { search, jobStatus, jobType, sort } = useAllJobsContext();
  console.log();
  function onChangeHandler(e: FormEvent<HTMLInputElement | HTMLSelectElement>) {
    submit(e.currentTarget.form);
  }

  const debounce = (onChange: (e: HTMLFormElement) => void) => {
    let timeout: NodeJS.Timeout;
    return (e: FormEvent<HTMLInputElement>) => {
      clearTimeout(timeout);
      const form = e.currentTarget.form;
      timeout = setTimeout(() => {
        if (form) {
          onChange(form);
        }
      }, 2000);
    };
  };
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search Form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            labelText="Search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => submit(form))}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="Job Status"
            list={{ All: "all", ...JOB_STATUS }}
            defaultValue={jobStatus}
            onChange={onChangeHandler}
          />
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            list={{ All: "all", ...JOB_TYPE }}
            defaultValue={jobType}
            onChange={onChangeHandler}
          />
          <FormRowSelect
            name="sort"
            labelText="Sort"
            list={JOB_SORT_BY}
            defaultValue={sort}
            onChange={onChangeHandler}
          />
          <Link to={"/dashboard/all-jobs"} className=" btn form-btn delete-btn">
            Reset Search Value
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
