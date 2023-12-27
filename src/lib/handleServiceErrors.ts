import { AxiosError, CanceledError } from "axios";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { isProblemDetails } from "@/types/guards/isProblemDetails";
import { ServiceCallCanceled, ServiceCallError } from "@/types/ServiceCall";

export function handleServiceErrors(
  error: unknown
): ServiceCallCanceled | ServiceCallError {
  /** When request was canceled */
  if (error instanceof CanceledError) {
    return {
      canceled: true,
      errors: null,
      data: null,
    };
  }

  /** Axios errors we want to handle and show the user */
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      return {
        canceled: false,
        errors: [ERROR_MESSAGES.UNAUTHORIZED],
        data: null,
      };
    }

    if (error.response?.status === 403) {
      return {
        canceled: false,
        errors: [ERROR_MESSAGES.FORBIDDEN],
        data: null,
      };
    }

    /** Custom back-end errors */
    if (
      error.response?.status === 400 &&
      isProblemDetails(error.response.data)
    ) {
      return {
        canceled: false,
        errors: error.response.data.detail,
        data: null,
      };
    }
  }

  /** Unknown error occured */
  console.log(error);
  return {
    canceled: false,
    errors: [ERROR_MESSAGES.UNKNOWN],
    data: null,
  };
}
