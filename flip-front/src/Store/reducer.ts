import { regReducer } from "./../Components/Auth/SignUp/store/reducer";
import { authReducer } from "../Components/Auth/store/reducer";
import { combineReducers } from "redux";
import { themeReducer } from "../Components/Theme/reducer";
import { toastReducer } from "../Components/Toast/store/reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  reg: regReducer,
  theme: themeReducer,
  toast: toastReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
