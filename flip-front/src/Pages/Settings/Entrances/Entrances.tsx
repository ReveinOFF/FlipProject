import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./Entrances.module.scss";

export const Entrances = () => {
  const navigate = useNavigate();
  const [t] = useTranslation("translation");

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
    </>
  );
};
