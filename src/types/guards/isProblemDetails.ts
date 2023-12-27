import { isObject } from "@/types/guards/isObject";
import { ProblemDetails } from "../problemDetails";

export function isProblemDetails(obj: unknown): obj is ProblemDetails {
  if (!isObject(obj)) return false;

  return (
    "detail" in obj &&
    obj.detail instanceof Array &&
    obj.detail.every((item) => typeof item === "string")
  );
}
