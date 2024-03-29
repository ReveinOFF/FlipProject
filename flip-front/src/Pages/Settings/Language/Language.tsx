import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import i18n from "../../../Components/i18n/i18n";
import styles from "./Language.module.scss";

export const Language = () => {
  const navigate = useNavigate();
  const [t] = useTranslation("translation");

  const [trans, setTrans] = useState<string>("Українська");

  useEffect(() => {
    const lng = localStorage.getItem("lng");

    if (lng === "ua") setTrans("Українська");
    else setTrans("English");
  }, []);

  const changeLanguageOnClick = () => {
    const lng = i18n.language;

    if (lng === "ua") {
      localStorage.setItem("lng", "en");
      i18n.changeLanguage("en");
      setTrans("English");
    } else {
      localStorage.setItem("lng", "ua");
      i18n.changeLanguage("ua");
      setTrans("Українська");
    }
  };

  const [showLng, setShowLng] = useState<boolean>(false);
  const [showLng2, setShowLng2] = useState<boolean>(false);
  const [showLng3, setShowLng3] = useState<boolean>(false);
  const [showLng4, setShowLng4] = useState<boolean>(false);

  useEffect(() => {
    document.title = t("main.settings.language.title");
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

        <div>{t("main.settings.language.back")}</div>
      </div>

      <div className={styles.language_first}>
        <div className={styles.header}>
          {t("main.settings.language.header")}
        </div>
        <div className={styles.container}>
          <div className={styles.description}>
            {t("main.settings.language.desc")}
          </div>
          <div className={styles.select}>
            <div
              className={styles.selected}
              onClick={() => setShowLng(!showLng)}
            >
              <div className={styles.lng_selected}>{trans}</div>
              <svg
                style={
                  showLng
                    ? { transform: "rotate(180deg)" }
                    : { transform: "rotate(0deg)" }
                }
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33047 8.90999C3.33047 8.71999 3.40047 8.52999 3.55047 8.37999C3.69161 8.24051 3.88204 8.16229 4.08047 8.16229C4.2789 8.16229 4.46933 8.24051 4.61047 8.37999L11.1305 14.9C11.6105 15.38 12.3905 15.38 12.8705 14.9L19.3905 8.37999C19.5316 8.24051 19.722 8.16229 19.9205 8.16229C20.1189 8.16229 20.3093 8.24051 20.4505 8.37999C20.7405 8.66999 20.7405 9.14999 20.4505 9.43999L13.9305 15.96C13.4205 16.47 12.7305 16.76 12.0005 16.76C11.2705 16.76 10.5805 16.48 10.0705 15.96L3.55047 9.43999C3.41047 9.28999 3.33047 9.09999 3.33047 8.90999Z"
                  fill="#2F2F2F"
                />
              </svg>
            </div>
            <div
              className={styles.dashboard}
              style={
                showLng
                  ? { transform: "scaleY(1)" }
                  : { transform: "scaleY(0)" }
              }
            >
              <div onClick={changeLanguageOnClick}>
                {trans === "English" ? "Українська" : "English"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.language_second}>
        <div className={styles.header}>
          {t("main.settings.language.header2")}
        </div>
        <div className={styles.container}>
          <div className={styles.description}>
            {t("main.settings.language.desc2")}
          </div>
          <div className={styles.select}>
            <div
              className={styles.selected}
              onClick={() => setShowLng2(!showLng2)}
            >
              <div className={styles.lng_selected}>{trans}</div>
              <svg
                style={
                  showLng2
                    ? { transform: "rotate(180deg)" }
                    : { transform: "rotate(0deg)" }
                }
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33047 8.90999C3.33047 8.71999 3.40047 8.52999 3.55047 8.37999C3.69161 8.24051 3.88204 8.16229 4.08047 8.16229C4.2789 8.16229 4.46933 8.24051 4.61047 8.37999L11.1305 14.9C11.6105 15.38 12.3905 15.38 12.8705 14.9L19.3905 8.37999C19.5316 8.24051 19.722 8.16229 19.9205 8.16229C20.1189 8.16229 20.3093 8.24051 20.4505 8.37999C20.7405 8.66999 20.7405 9.14999 20.4505 9.43999L13.9305 15.96C13.4205 16.47 12.7305 16.76 12.0005 16.76C11.2705 16.76 10.5805 16.48 10.0705 15.96L3.55047 9.43999C3.41047 9.28999 3.33047 9.09999 3.33047 8.90999Z"
                  fill="#2F2F2F"
                />
              </svg>
            </div>
            <div
              className={styles.dashboard}
              style={
                showLng2
                  ? { transform: "scaleY(1)" }
                  : { transform: "scaleY(0)" }
              }
            >
              <div onClick={changeLanguageOnClick}>
                {trans === "English" ? "Українська" : "English"}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.description}>
            {t("main.settings.language.desc3")}
          </div>
          <div className={styles.select}>
            <div
              className={styles.selected}
              onClick={() => setShowLng3(!showLng3)}
            >
              <div className={styles.lng_selected}>{trans}</div>
              <svg
                style={
                  showLng3
                    ? { transform: "rotate(180deg)" }
                    : { transform: "rotate(0deg)" }
                }
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33047 8.90999C3.33047 8.71999 3.40047 8.52999 3.55047 8.37999C3.69161 8.24051 3.88204 8.16229 4.08047 8.16229C4.2789 8.16229 4.46933 8.24051 4.61047 8.37999L11.1305 14.9C11.6105 15.38 12.3905 15.38 12.8705 14.9L19.3905 8.37999C19.5316 8.24051 19.722 8.16229 19.9205 8.16229C20.1189 8.16229 20.3093 8.24051 20.4505 8.37999C20.7405 8.66999 20.7405 9.14999 20.4505 9.43999L13.9305 15.96C13.4205 16.47 12.7305 16.76 12.0005 16.76C11.2705 16.76 10.5805 16.48 10.0705 15.96L3.55047 9.43999C3.41047 9.28999 3.33047 9.09999 3.33047 8.90999Z"
                  fill="#2F2F2F"
                />
              </svg>
            </div>
            <div
              className={styles.dashboard}
              style={
                showLng3
                  ? { transform: "scaleY(1)" }
                  : { transform: "scaleY(0)" }
              }
            >
              <div onClick={changeLanguageOnClick}>
                {trans === "English" ? "Українська" : "English"}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.description}>
            {t("main.settings.language.desc4")}
          </div>
          <div className={styles.select}>
            <div
              className={styles.selected}
              onClick={() => setShowLng4(!showLng4)}
            >
              <div className={styles.lng_selected}>{trans}</div>
              <svg
                style={
                  showLng4
                    ? { transform: "rotate(180deg)" }
                    : { transform: "rotate(0deg)" }
                }
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33047 8.90999C3.33047 8.71999 3.40047 8.52999 3.55047 8.37999C3.69161 8.24051 3.88204 8.16229 4.08047 8.16229C4.2789 8.16229 4.46933 8.24051 4.61047 8.37999L11.1305 14.9C11.6105 15.38 12.3905 15.38 12.8705 14.9L19.3905 8.37999C19.5316 8.24051 19.722 8.16229 19.9205 8.16229C20.1189 8.16229 20.3093 8.24051 20.4505 8.37999C20.7405 8.66999 20.7405 9.14999 20.4505 9.43999L13.9305 15.96C13.4205 16.47 12.7305 16.76 12.0005 16.76C11.2705 16.76 10.5805 16.48 10.0705 15.96L3.55047 9.43999C3.41047 9.28999 3.33047 9.09999 3.33047 8.90999Z"
                  fill="#2F2F2F"
                />
              </svg>
            </div>
            <div
              className={styles.dashboard}
              style={
                showLng4
                  ? { transform: "scaleY(1)" }
                  : { transform: "scaleY(0)" }
              }
            >
              <div onClick={changeLanguageOnClick}>
                {trans === "English" ? "Українська" : "English"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
