import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LazyLoading } from "../../../Components/LazyLoading/LazyLoading";
import { ToastActionTypes } from "../../../Components/Toast/store/type";
import styles from "./ForgotPassword.module.scss";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t] = useTranslation("translation");

  const [email, setEmail] = useState<string>();

  const PostChange = async () => {
    const res = await axios.post("settings/recover-password", email, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  };

  const { isLoading, mutateAsync } = useMutation(PostChange, {
    onSuccess: () => {
      dispatch({
        type: ToastActionTypes.SHOW,
        payload: {
          message: t("toast.success.forgot_pass"),
          type: "success",
        },
      });
    },
    onError: () => {
      dispatch({
        type: ToastActionTypes.SHOW,
        payload: {
          message: t("toast.error.forgot_pass"),
          type: "error",
        },
      });
    },
  });

  useEffect(() => {
    document.title = t("main.settings.forgot_pass.title");
  }, []);

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

        <div>{t("main.settings.forgot_pass.back")}</div>
      </div>

      <div className={styles.forgot_pass}>
        <svg
          width="136"
          height="120"
          viewBox="0 0 136 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask id="path-1-inside-1_1451_6470" fill="white">
            <path d="M136 112C136 93.9653 128.836 76.6692 116.083 63.9167C103.331 51.1643 86.0347 44 68 44C49.9653 44 32.6692 51.1643 19.9167 63.9167C7.16427 76.6692 2.72317e-06 93.9653 0 112L5.80242 112C5.80242 95.5042 12.3554 79.684 24.0197 68.0197C35.684 56.3554 51.5042 49.8024 68 49.8024C84.4958 49.8024 100.316 56.3554 111.98 68.0197C123.645 79.684 130.198 95.5042 130.198 112H136Z" />
          </mask>
          <path
            d="M136 112C136 93.9653 128.836 76.6692 116.083 63.9167C103.331 51.1643 86.0347 44 68 44C49.9653 44 32.6692 51.1643 19.9167 63.9167C7.16427 76.6692 2.72317e-06 93.9653 0 112L5.80242 112C5.80242 95.5042 12.3554 79.684 24.0197 68.0197C35.684 56.3554 51.5042 49.8024 68 49.8024C84.4958 49.8024 100.316 56.3554 111.98 68.0197C123.645 79.684 130.198 95.5042 130.198 112H136Z"
            stroke="#2F2F2F"
            strokeWidth="150"
            strokeLinejoin="round"
            mask="url(#path-1-inside-1_1451_6470)"
          />
          <circle cx="17.5" cy="17.5" r="17.5" fill="#2F2F2F" />
          <circle cx="118.5" cy="17.5" r="17.5" fill="#2F2F2F" />
        </svg>

        <div className={styles.header}>
          {t("main.settings.forgot_pass.header")}
        </div>

        <div className={styles.description}>
          {t("main.settings.forgot_pass.description")}
        </div>

        <div className={styles.form}>
          <input
            type="email"
            placeholder="fliper@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={async () => await mutateAsync()}>
            {t("main.settings.forgot_pass.btn")}
          </button>
        </div>
      </div>
    </>
  );
};
