import { authReducer } from "../Components/Auth/store/reducer";
import { combineReducers } from "redux";
import { themeReducer } from "../Components/Theme/reducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer
});

export type RootState = ReturnType<typeof rootReducer>;