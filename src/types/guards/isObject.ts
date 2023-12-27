export function isObject(obj: unknown): obj is object {
  return !(obj === null || typeof obj !== "object" || obj instanceof Array);
}
