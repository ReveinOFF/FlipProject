import axios from "axios";
import { t } from "i18next";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { LazyLoading } from "../../../Components/LazyLoading/LazyLoading";
import { ToastActionTypes } from "../../../Components/Toast/store/type";

export const ConfirmChangeEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = t("main.settings.conf_change_email");
  }, []);

  const PostConfirm = async ({ newemail, oldemail, token }) => {
    const res = await axios.post(
      "settings/confirm-change-email",
      {
        newEmail: newemail,
        oldEmail: oldemail,
        token: token,
      },
      {
        headers: {
          "Content-Application": "application/json",
        },
      }
    );

    return res;
  };

  const { isLoading, isError, mutateAsync } = useMutation(PostConfirm, {
    onSuccess: () => {
      navigate("/settings");
      window.location.reload();

      setTimeout(() => {
        dispatch({
          type: ToastActionTypes.SHOW,
          payload: {
            message: t("toast.success.change_email"),
            type: "success",
          },
        });
      }, 400);
    },
    onError: () => {
      dispatch({
        type: ToastActionTypes.SHOW,
        payload: {
          message: t("toast.error.change_email"),
          type: "error",
        },
      });
    },
  });

  useEffect(() => {
    const token = searchParams.get("token");
    const oldemail = searchParams.get("curr-email");
    const newemail = searchParams.get("new-email");

    if (token && oldemail && newemail)
      mutateAsync({ newemail: newemail, oldemail: oldemail, token: token });
    else navigate("/settings");
  }, []);

  return (
    <>
      {isLoading && <LazyLoading />}
      {isError && <Navigate to="error/400" />}
    </>
  );
};
