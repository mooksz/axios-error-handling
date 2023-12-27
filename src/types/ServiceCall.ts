export type ServiceCallResult<T = unknown> =
  | ServiceCallCanceled
  | ServiceCallError
  | ServiceCallSuccess<T>;

export type ServiceCallCanceled = {
  canceled: true;
  errors: null;
  data: null;
};

export type ServiceCallError = {
  canceled: false;
  errors: string[];
  data: null;
};

export type ServiceCallSuccess<T = unknown> = {
  canceled: false;
  errors: null;
  data: T;
};
