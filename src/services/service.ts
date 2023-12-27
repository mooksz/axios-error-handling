import HTTP from "@/lib/axios";
import { handleServiceErrors } from "@/lib/handleServiceErrors";
import { ServiceCallResult } from "@/types/ServiceCall";

type SuccessTestResponse = {
  message: string;
};

/** Would be a service method */
export async function callService(
  code: string,
  signal: AbortSignal
): Promise<ServiceCallResult<SuccessTestResponse>> {
  try {
    const { data } = await HTTP.get<SuccessTestResponse>(`/api/${code}`, {
      signal,
    });

    return {
      canceled: false,
      errors: null,
      data: data,
    };
  } catch (error) {
    return handleServiceErrors(error);
  }
}
