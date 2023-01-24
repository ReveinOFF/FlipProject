import {Navigate} from "react-router-dom";
import { useTypedSelector } from "../Hooks/useTypedSelector";

export const RequireAuth = ({ children, redirectTo }) => {
    let isAuthenticated = useTypedSelector((state) => state.auth.user);
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export const NotRequireAuth = ({ children, redirectTo }) => {
    let isAuthenticated = useTypedSelector((state) => state.auth.user);
    return isAuthenticated ? <Navigate to={redirectTo} /> : children;
}