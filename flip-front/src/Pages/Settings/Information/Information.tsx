import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./Information.module.scss";

export const Information = () => {
  const navigate = useNavigate();
  const [t] = useTranslation("translation");

  useEffect(() => {
    document.title = t("main.settings.information.title");
  }, []);

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

        <div>{t("main.settings.information.title")}</div>
      </div>

      <div className={styles.information}>
        <div className={styles.header}>
          {t("main.settings.information.header")}
        </div>
        <div className={styles.container}>
          <div className={styles.description}>
            {t("main.settings.information.desc")}
          </div>
          <div className={styles.btn}>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.90981 20.6954C8.71981 20.6954 8.52981 20.6254 8.37981 20.4754C8.24033 20.3343 8.16211 20.1438 8.16211 19.9454C8.16211 19.747 8.24033 19.5565 8.37981 19.4154L14.8998 12.8954C15.3798 12.4154 15.3798 11.6354 14.8998 11.1554L8.37981 4.63541C8.24033 4.49427 8.16211 4.30384 8.16211 4.10541C8.16211 3.90698 8.24033 3.71655 8.37981 3.57541C8.66981 3.28541 9.14981 3.28541 9.43981 3.57541L15.9598 10.0954C16.4698 10.6054 16.7598 11.2954 16.7598 12.0254C16.7598 12.7554 16.4798 13.4454 15.9598 13.9554L9.43981 20.4754C9.28981 20.6154 9.09981 20.6954 8.90981 20.6954Z"
                fill="#2F2F2F"
              />
            </svg>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.description}>
            {t("main.settings.information.desc2")}
          </div>
          <div className={styles.btn}>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.90981 20.6954C8.71981 20.6954 8.52981 20.6254 8.37981 20.4754C8.24033 20.3343 8.16211 20.1438 8.16211 19.9454C8.16211 19.747 8.24033 19.5565 8.37981 19.4154L14.8998 12.8954C15.3798 12.4154 15.3798 11.6354 14.8998 11.1554L8.37981 4.63541C8.24033 4.49427 8.16211 4.30384 8.16211 4.10541C8.16211 3.90698 8.24033 3.71655 8.37981 3.57541C8.66981 3.28541 9.14981 3.28541 9.43981 3.57541L15.9598 10.0954C16.4698 10.6054 16.7598 11.2954 16.7598 12.0254C16.7598 12.7554 16.4798 13.4454 15.9598 13.9554L9.43981 20.4754C9.28981 20.6154 9.09981 20.6954 8.90981 20.6954Z"
                fill="#2F2F2F"
              />
            </svg>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.description}>
            {t("main.settings.information.desc3")}
          </div>
          <div className={styles.btn}>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.90981 20.6954C8.71981 20.6954 8.52981 20.6254 8.37981 20.4754C8.24033 20.3343 8.16211 20.1438 8.16211 19.9454C8.16211 19.747 8.24033 19.5565 8.37981 19.4154L14.8998 12.8954C15.3798 12.4154 15.3798 11.6354 14.8998 11.1554L8.37981 4.63541C8.24033 4.49427 8.16211 4.30384 8.16211 4.10541C8.16211 3.90698 8.24033 3.71655 8.37981 3.57541C8.66981 3.28541 9.14981 3.28541 9.43981 3.57541L15.9598 10.0954C16.4698 10.6054 16.7598 11.2954 16.7598 12.0254C16.7598 12.7554 16.4798 13.4454 15.9598 13.9554L9.43981 20.4754C9.28981 20.6154 9.09981 20.6954 8.90981 20.6954Z"
                fill="#2F2F2F"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};
