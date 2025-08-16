import axios, { AxiosError } from "axios";
import type { ErrorResponse } from "../types/axiosTypes";
import { toast } from "react-toastify";
function isAxiosError<T = any>(error: any): error is AxiosError<T> {
  return axios.isAxiosError(error);
}

function showErrors(error: any) {
  if (isAxiosError<ErrorResponse>(error)) {
    const responseData = error.response?.data;
    let errorMessage: string = "Something went wrong";
    if (responseData) {
      if (responseData.errors && responseData.errors.length > 0) {
        errorMessage = responseData.errors[0];
      } else if (responseData.message) {
        errorMessage = responseData.message;
      }
    }
    toast.error(errorMessage);
  }
}
export { isAxiosError, showErrors };
