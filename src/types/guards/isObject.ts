export function isObject(obj: unknown): obj is Object {
  return !(obj === null || typeof obj !== "object" || obj instanceof Array);
}
