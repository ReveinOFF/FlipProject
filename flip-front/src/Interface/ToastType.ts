export const ToastType = {
  success: "success",
  error: "error",
  warning: "warning",
};

export interface Toast {
  message: string;
  type: string;
}
