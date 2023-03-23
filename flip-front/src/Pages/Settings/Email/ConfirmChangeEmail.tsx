import axios from "axios";
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
            message: "Ви успішно змінили пошту!",
            type: "success",
          },
        });
      }, 400);
    },
    onError: () => {
      dispatch({
        type: ToastActionTypes.SHOW,
        payload: {
          message: "Виникла помилка при зміні пошти",
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
