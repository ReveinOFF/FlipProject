import { ToastActionTypes, ToastState } from "./type";

interface IToastAction {
  type: string;
  payload?: any;
}

const initialState: ToastState = {
  show: false,
};

export type ToastAction = IToastAction;

export const toastReducer = (
  state = initialState,
  action: IToastAction
): ToastState => {
  switch (action.type) {
    case ToastActionTypes.SHOW:
      return {
        show: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    case ToastActionTypes.UNSHOW:
      return {
        show: false,
      };
    default:
      return state;
  }
};
