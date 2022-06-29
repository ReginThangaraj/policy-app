export const enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export type ToastDetails = {
  show: boolean;
  type: ToastType;
  message: string;
};
