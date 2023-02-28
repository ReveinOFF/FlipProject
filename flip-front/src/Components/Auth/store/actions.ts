import { IUser } from "./../../../Interface/Profile";
import axios from "axios";
import { Dispatch } from "react";
import { AuthActionTypes } from "./types";
import { ToastActionTypes } from "../../Toast/store/type";
import i18n from "../../i18n/i18n";

export const AuthUser = async (
  token: string,
  dispatch: Dispatch<any>
): Promise<boolean> => {
  try {
    const user = await axios.get<IUser>(`user/get-user-auth`);

    if (user.status !== 204 && user.status !== 200)
      dispatch({
        type: ToastActionTypes.SHOW,
        payload: {
          message: i18n.t("toast.error.auth"),
          type: "error",
        },
      });

    dispatch({
      type: AuthActionTypes.LOGIN,
      payload: { user: user.data, token: token },
    });

    return Promise.resolve(true);
  } catch {
    dispatch({ type: AuthActionTypes.LOGOUT });
    return Promise.resolve(false);
  }
};
