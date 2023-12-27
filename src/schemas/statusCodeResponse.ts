import { isObject } from "@/types/guards/isObject";
import { z } from "zod";

export const statusCodeResponse = z.object({
  message: z.string(),
});

export function isStatusCodeReponse(obj: unknown): obj is StatusCodeResponse {
  if (!isObject(obj)) return false;

  const hasMessage = "message" in obj && typeof obj.message === "string";

  return hasMessage;
}

export type StatusCodeResponse = z.infer<typeof statusCodeResponse>;
