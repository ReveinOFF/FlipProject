import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../Store/reducer";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector; 