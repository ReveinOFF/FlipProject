import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { CustomMiniBTN } from "../../../MainBlock/Button/CustomButton";
import styles from "./EmailFound.module.scss";

export const EmailFound = () => {
  const navigate = useNavigate();

  const [t] = useTranslation("translation");

  const [mode, setMode] = useState<string>("light");
  const theme = useTypedSelector((state) => state.theme.mode);

  useEffect(() => {
    if (theme === "light") setMode("light");
    else setMode("dark");
  }, [theme]);

  return (
    <>
      <div className={mode === "light" ? styles.header : styles.header_dark}>
        {t("auht.recoverPass.emailFound.header")}
      </div>
      <div
        className={
          mode === "light" ? styles.description : styles.description_dark
        }
      >
        {t("auht.recoverPass.emailFound.description")}
      </div>
      <CustomMiniBTN
        onClick={() => navigate("/signin")}
        content={t("auht.recoverPass.emailFound.btn")}
      />
    </>
  );
};
