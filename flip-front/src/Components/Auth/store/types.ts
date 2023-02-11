import { IUser } from "../../../Interface/Profile";

export enum AuthActionTypes {
    LOGIN = "AUTH/LOGIN",
    LOGOUT = "AUTH/LOGOUT"
}

export interface AuthState {
    user?: IUser,
    token?: string,
    isAuth: boolean
}