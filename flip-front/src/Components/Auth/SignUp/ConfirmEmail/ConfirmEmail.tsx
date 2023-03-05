import axios from "axios";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { SendToken } from "../../../../Interface/Login";
import { LazyLoading } from "../../../LazyLoading/LazyLoading";
import { ToastActionTypes } from "../../../Toast/store/type";

export const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t] = useTranslation("translation");

  const PostConfirm = async ({ email: email, token: token }) => {
    const res = await axios.post("account/email-confirm", {
      email: email,
      token: token,
    });

    return res;
  };

  const { isLoading, isError, mutate } = useMutation(PostConfirm, {
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      navigate("/");
      window.location.reload();

      setTimeout(() => {
        dispatch({
          type: ToastActionTypes.SHOW,
          payload: {
            message: t("toast.success.confirm-email"),
            type: "success",
          },
        });
      }, 400);
    },
    onError: () => {
      dispatch({
        type: ToastActionTypes.SHOW,
        payload: {
          message: t("toast.error.confirm-email"),
          type: "error",
        },
      });
    },
  });

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (token && email) mutate({ email: email, token: token });
  }, []);

  return (
    <>
      {isLoading && <LazyLoading />}
      {isError && <Navigate to="error/400" />}
    </>
  );
};
