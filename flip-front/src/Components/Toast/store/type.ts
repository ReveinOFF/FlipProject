export enum ToastActionTypes {
  SHOW = "TOAST/SHOW",
  UNSHOW = "TOAST/UNSHOW",
}

export interface ToastState {
  message?: string;
  type?: string;
  show: boolean;
}
