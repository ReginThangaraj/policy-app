export const enum ApiStatus {
  DEFAULT = 1,
  LOADING,
  SUCCESS,
  ERROR,
}

export type State<
  TData = never,
  TStatus = ApiStatus,
  TError = string,
  TParams = never
> = {
  data: TData;
  params?: TParams;
  status: TStatus;
  error?: TError;
};

