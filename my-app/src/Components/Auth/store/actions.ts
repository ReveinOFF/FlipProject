import axios from "axios";
import jwtDecode from "jwt-decode";
import { Dispatch } from "react";
import { AuthAction } from "./reducer";
import { AuthActionTypes } from "./types";

interface JwtDecoder {
    Role: string[],
    UserId: string,
    iss: string
}

export const AuthUser = (token: string, dispatch: Dispatch<AuthAction>) => {
    const userid: JwtDecoder = jwtDecode(token);

    axios.get(`user/get-user-by-id/${userid.UserId}`).then(res => {
        dispatch({type: AuthActionTypes.LOGIN, payload: {user: res.data, token: token}});
    });
}