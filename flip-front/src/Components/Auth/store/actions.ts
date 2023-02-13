import { IUser } from './../../../Interface/Profile';
import axios from "axios";
import { Dispatch, useState } from "react";
import { AuthAction } from "./reducer";
import { AuthActionTypes } from "./types";

export const AuthUser = async (
  token: string,
  dispatch: Dispatch<AuthAction>
): Promise<boolean> => {

  try {
    const user = await axios
    .get<IUser>(`user/get-user-auth`);

    dispatch({
         type: AuthActionTypes.LOGIN,
         payload: { user: user.data, token: token },
       });

    return Promise.resolve(true);
  }
  catch {
    dispatch({ type: AuthActionTypes.LOGOUT });
    return Promise.resolve(false);
  }
};
