import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LazyLoading } from "../../../Components/LazyLoading/LazyLoading";
import { ToastActionTypes } from "../../../Components/Toast/store/type";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import styles from "./ChangePassword.module.scss";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t] = useTranslation("translation");
  const myUser = useTypedSelector((state) => state.auth.user);

  const [password, setPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [confNewpassword, setConfNewPassword] = useState<string>();

  const [visible, setVisible] = useState<boolean>(false);
  const [visible2, setVisible2] = useState<boolean>(false);
  const [visible3, setVisible3] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Зміна пароля";
  }, []);

  const PostChange = async () => {
    const res = await axios.put(
      "settings/change-password",
      {
        id: myUser?.id,
        oldPassword: password,
        newPassword: newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  };

  const { isLoading, mutateAsync } = useMutation(PostChange, {
    onSuccess: () => {
      dispatch({
        type: ToastActionTypes.SHOW,
        payload: {
          message: "Ви успішно змінили пароль!",
          type: "success",
        },
      });
    },
    onError: () => {
      dispatch({
        type: ToastActionTypes.SHOW,
        payload: {
          message: "Виникла помилка при зміні пароля!",
          type: "error",
        },
      });
    },
  });

  if (isLoading) return <LazyLoading />;

  return (
    <>
      <div className={styles.back} onClick={() => navigate(-1)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.0902 3.32998C15.2802 3.32998 15.4702 3.39998 15.6202 3.54998C15.7597 3.69112 15.8379 3.88155 15.8379 4.07998C15.8379 4.27841 15.7597 4.46884 15.6202 4.60998L9.10019 11.13C8.62019 11.61 8.62019 12.39 9.10019 12.87L15.6202 19.39C15.7597 19.5311 15.8379 19.7216 15.8379 19.92C15.8379 20.1184 15.7597 20.3088 15.6202 20.45C15.3302 20.74 14.8502 20.74 14.5602 20.45L8.04019 13.93C7.53019 13.42 7.24019 12.73 7.24019 12C7.24019 11.27 7.52019 10.58 8.04019 10.07L14.5602 3.54998C14.7102 3.40998 14.9002 3.32998 15.0902 3.32998Z"
            fill="#2F2F2F"
          />
        </svg>

        <div>{t("main.settings.change_pass.back")}</div>
      </div>

      <div className={styles.setting}>
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

        <div className={styles.passwords}>
          <div className={styles.password}>
            <div className={styles.text}>
              {t("main.settings.change_pass.old_pass")}
            </div>
            <div className={styles.input}>
              <input
                type={visible ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
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
          <div className={styles.password}>
            <div className={styles.text}>
              {t("main.settings.change_pass.new_pass")}
            </div>
            <div className={styles.input}>
              <input
                type={visible2 ? "text" : "password"}
                onChange={(e) => setNewPassword(e.target.value)}
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
          <div className={styles.password}>
            <div className={styles.text}>
              {t("main.settings.change_pass.conf_new_pass")}
            </div>
            <div className={styles.input}>
              <input
                type={visible3 ? "text" : "password"}
                onChange={(e) => setConfNewPassword(e.target.value)}
              />
              <svg
                onClick={() => setVisible3(!visible3)}
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
                {!visible3 && (
                  <line x1="30" y1="0" x2="0" y2="20" stroke="#2F2F2F" />
                )}
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <a onClick={() => navigate("/settings/forgot-password")}>
            {t("main.settings.change_pass.forgot_pass")}
          </a>
          <button onClick={async () => await mutateAsync()}>
            {t("main.settings.change_pass.btn")}
          </button>
        </div>
      </div>
    </>
  );
};
