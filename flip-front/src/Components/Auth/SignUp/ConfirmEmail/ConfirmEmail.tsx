import axios from "axios";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { ToastActionTypes } from "../../../Toast/store/type";

export const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t] = useTranslation("translation");

  const CheckToken = (): boolean => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (token && email) {
      axios.post("account/email-confirm", { email, token }).then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("refreshToken", res.data.refreshToken);

          navigate("/");
          window.location.reload();

          dispatch({
            type: ToastActionTypes.SHOW,
            payload: {
              message: t("toast.success.confirm-email"),
              type: "success",
            },
          });
        } else
          dispatch({
            type: ToastActionTypes.SHOW,
            payload: {
              message: t("toast.error.confirm-email"),
              type: "error",
            },
          });
      });
      return true;
    } else return false;
  };

  return <div>{!CheckToken() && <Navigate to="error/400" />}</div>;
};
