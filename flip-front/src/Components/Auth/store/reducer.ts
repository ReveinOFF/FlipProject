import { AuthActionTypes, AuthState } from "./types";

interface UserAction {
  type: string;
  payload?: any;
}

const initialState: AuthState = {
  isAuth: false,
};

export type AuthAction = UserAction;

export const authReducer = (
  state = initialState,
  action: UserAction
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        isAuth: true,
        user: { ...action.payload.user },
        token: action.payload.token,
      };
    case AuthActionTypes.LOGOUT:
      return {
        isAuth: false,
      };
    default:
      return state;
  }
};
