import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://jobify-alpha.vercel.app/api/v1",
  withCredentials: true,
});

export default customFetch;
