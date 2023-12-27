import HTTP from "@/lib/axios";
import { handleServiceErrors } from "@/lib/handleServiceErrors";
import {
  StatusCodeResponse,
  isStatusCodeReponse,
  statusCodeResponse,
} from "@/schemas/statusCodeResponse";
import { ServiceCallResult } from "@/types/serviceCall";

/** Would be a service method */
export async function callService(
  code: string,
  signal: AbortSignal
): Promise<ServiceCallResult<StatusCodeResponse>> {
  try {
    const { data } = await HTTP.get<StatusCodeResponse>(`/api/${code}`, {
      signal,
    });

    /** Zod validation */
    statusCodeResponse.parse(data);

    // /** Custom typeguard */
    // if (!isStatusCodeReponse(data)) {
    //   throw new Error("Data not of type statusCodeResponse");
    // }

    return {
      canceled: false,
      errors: null,
      data: data,
    };
  } catch (error) {
    return handleServiceErrors(error);
  }
}
