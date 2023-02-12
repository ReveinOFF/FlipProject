import axios from "axios";
import { Dispatch } from "react";
import { AuthAction } from "./reducer";
import { AuthActionTypes } from "./types";

export const AuthUser = (token: string, dispatch: Dispatch<AuthAction>) => {
    axios.get(`user/get-user-auth`).then(res => {
        dispatch({type: AuthActionTypes.LOGIN, payload: {user: res.data, token: token}});
    }).catch(err => {
        dispatch({type: AuthActionTypes.LOGOUT});
    });
}