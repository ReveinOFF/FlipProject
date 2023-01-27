import { Dispatch } from "react";
import { ThemeAction } from "./reducer";

export const ThemeActions = (dispatch: Dispatch<ThemeAction>) => {
    const storage = localStorage.getItem("LightDarkMode");
    
    dispatch({type: "Theme", payload: {mode: storage}});
}