import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LazyLoading } from "../../../Components/LazyLoading/LazyLoading";
import { ToastActionTypes } from "../../../Components/Toast/store/type";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import styles from "./ChangeEmail.module.scss";

export const ChangeEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t] = useTranslation("translation");
  const myUser = useTypedSelector((state) => state.auth.user);

  useEffect(() => {
    document.title = t("main.settings.change_email.title");
  }, []);

  const [email, setEmail] = useState<string>();

  const sendEmail = async (email: string) => {
    const res = await axios.post(
      "settings/change-email",
      { newEmail: email, oldEmail: myUser?.email },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res;
  };

  const { isLoading, mutateAsync } = useMutation(sendEmail, {
    onSuccess: () => {
      dispatch({
        type: ToastActionTypes.SHOW,
        payload: {
          message: t("toast.success.change_email2"),
          type: "success",
        },
      });
    },
    onError: () => {
      dispatch({
        type: ToastActionTypes.SHOW,
        payload: {
          message: t("toast.error.change_email2"),
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

        <div>{t("main.settings.change_email.back")}</div>
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

        <div className={styles.email}>
          <div>{t("main.settings.change_email.email")}</div>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className={styles.buttons}>
          <a onClick={() => navigate(-1)}>
            {t("main.settings.change_email.cancel")}
          </a>
          <button onClick={async () => await mutateAsync(email as string)}>
            {t("main.settings.change_email.btn")}
          </button>
        </div>
      </div>
    </>
  );
};
