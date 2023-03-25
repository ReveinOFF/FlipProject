import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { LazyLoading } from "../../../Components/LazyLoading/LazyLoading";
import { ToastActionTypes } from "../../../Components/Toast/store/type";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import styles from "./ConfirmForgotPass.module.scss";

export const ConfirmForgotPass = () => {
  const myUser = useTypedSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [t] = useTranslation("translation");

  const [token, setToken] = useState<string>();

  const [visible, setVisible] = useState<boolean>(false);
  const [visible2, setVisible2] = useState<boolean>(false);

  const [newPassword, setNewPassword] = useState<string>();
  const [confNewpassword, setConfNewPassword] = useState<string>();

  useEffect(() => {
    document.title = t("main.settings.conf_forg_pass.title");
  }, []);

  const PostConfirm = async () => {
    const res = await axios.post(
      "settings/recover-password",
      {
        email: myUser?.email,
        newPassword: newPassword,
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

      setTimeout(() => {
        dispatch({
          type: ToastActionTypes.SHOW,
          payload: {
            message: t("toast.success.change_pass"),
            type: "success",
          },
        });
      }, 400);
    },
    onError: () => {
      dispatch({
        type: ToastActionTypes.SHOW,
        payload: {
          message: t("toast.error.change_pass"),
          type: "error",
        },
      });
    },
  });

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) setToken(token);
    else navigate("/settings");
  }, []);

  if (isLoading) return <LazyLoading />;

  if (isError) return <Navigate to="error/400" />;

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        {myUser?.userImage ? (
          <img
            src={`${process.env.REACT_APP_BASE_RESOURCES}UserImages/${myUser?.id}/${myUser?.userImage}`}
            alt=""
          />
        ) : (
          <svg
            className={styles.profile_img}
            width="86"
            height="86"
            viewBox="0 0 209 209"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="104.5"
              cy="104.5"
              r="102.029"
              fill="url(#paint0_linear_1675_10359)"
              fillOpacity="0.5"
              stroke="#2F2F2F"
              strokeWidth="4.94119"
            />
            <path
              d="M77.3984 78.5C77.3984 85.4036 71.802 91 64.8984 91C57.9949 91 52.3984 85.4036 52.3984 78.5C52.3984 71.5964 57.9949 66 64.8984 66C71.802 66 77.3984 71.5964 77.3984 78.5Z"
              fill="#2F2F2F"
            />
            <path
              d="M157.398 78.5C157.398 85.4036 151.802 91 144.898 91C137.995 91 132.398 85.4036 132.398 78.5C132.398 71.5964 137.995 66 144.898 66C151.802 66 157.398 71.5964 157.398 78.5Z"
              fill="#2F2F2F"
            />
            <path
              d="M84.8984 146H124.898"
              stroke="#2F2F2F"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1675_10359"
                x1="-40.5348"
                y1="188.1"
                x2="212.652"
                y2="182.514"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#48D824" />
                <stop offset="1" stopColor="#10D0EA" />
              </linearGradient>
            </defs>
          </svg>
        )}
        <div>{myUser?.name}</div>
      </div>

      <div className={styles.form}>
        <div className={styles.inputs}>
          <div className={styles.pass}>
            {t("main.settings.conf_forg_pass.new_pass")}
          </div>
          <div className={styles.input}>
            <input
              type={visible ? "text" : "password"}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <svg
              onClick={() => setVisible(!visible)}
              width="28"
              height="22"
              viewBox="0 0 28 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.845703 11C2.59167 5.20429 7.78708 1 13.9226 1C20.0595 1 25.2536 5.20429 26.9995 11C25.2536 16.7957 20.0595 21 13.9226 21C7.78708 21 2.59167 16.7957 0.845703 11Z"
                stroke="#2F2F2F"
                strokeOpacity="0.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.0333 11.0001C18.0333 12.1367 17.6001 13.2268 16.8291 14.0306C16.0581 14.8343 15.0123 15.2858 13.9219 15.2858C12.8315 15.2858 11.7858 14.8343 11.0147 14.0306C10.2437 13.2268 9.81055 12.1367 9.81055 11.0001C9.81055 9.86346 10.2437 8.77337 11.0147 7.96964C11.7858 7.16591 12.8315 6.71439 13.9219 6.71439C15.0123 6.71439 16.0581 7.16591 16.8291 7.96964C17.6001 8.77337 18.0333 9.86346 18.0333 11.0001Z"
                stroke="#2F2F2F"
                strokeOpacity="0.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {!visible && (
                <line x1="30" y1="0" x2="0" y2="20" stroke="#2F2F2F" />
              )}
            </svg>
          </div>
        </div>
        <div className={styles.inputs}>
          <div className={styles.pass}>
            {t("main.settings.conf_forg_pass.conf_new_pass")}
          </div>
          <div className={styles.input}>
            <input
              type={visible2 ? "text" : "password"}
              onChange={(e) => setConfNewPassword(e.target.value)}
            />
            <svg
              onClick={() => setVisible2(!visible2)}
              width="28"
              height="22"
              viewBox="0 0 28 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.845703 11C2.59167 5.20429 7.78708 1 13.9226 1C20.0595 1 25.2536 5.20429 26.9995 11C25.2536 16.7957 20.0595 21 13.9226 21C7.78708 21 2.59167 16.7957 0.845703 11Z"
                stroke="#2F2F2F"
                strokeOpacity="0.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.0333 11.0001C18.0333 12.1367 17.6001 13.2268 16.8291 14.0306C16.0581 14.8343 15.0123 15.2858 13.9219 15.2858C12.8315 15.2858 11.7858 14.8343 11.0147 14.0306C10.2437 13.2268 9.81055 12.1367 9.81055 11.0001C9.81055 9.86346 10.2437 8.77337 11.0147 7.96964C11.7858 7.16591 12.8315 6.71439 13.9219 6.71439C15.0123 6.71439 16.0581 7.16591 16.8291 7.96964C17.6001 8.77337 18.0333 9.86346 18.0333 11.0001Z"
                stroke="#2F2F2F"
                strokeOpacity="0.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {!visible2 && (
                <line x1="30" y1="0" x2="0" y2="20" stroke="#2F2F2F" />
              )}
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.button}>
        <button onClick={async () => await mutateAsync()}>
          {t("main.settings.conf_forg_pass.btn")}
        </button>
      </div>
    </div>
  );
};
