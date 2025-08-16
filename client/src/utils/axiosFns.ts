import axios, { AxiosError } from "axios";
function isAxiosError<T = any>(error: any): error is AxiosError<T> {
  return axios.isAxiosError(error);
}
export { isAxiosError };
