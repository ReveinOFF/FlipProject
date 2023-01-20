import { profileReducer } from './../Components/Profile/store/reducer';
import { authReducer } from "../Components/Auth/store/reducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer
});

export type RootState = ReturnType<typeof rootReducer>;