import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CustomMiniBTN } from "../../../MainBlock/Button/CustomButton";
import styles from "./EmailFound.module.scss";

export const EmailFound = () => {
  const navigate = useNavigate();

  const [t] = useTranslation("translation");

  return (
    <>
      <div className={styles.header}>
        {t("auht.recoverPass.emailFound.header")}
      </div>
      <div className={styles.description}>
        {t("auht.recoverPass.emailFound.description")}
      </div>
      <CustomMiniBTN
        onClick={() => navigate("/signin")}
        content={t("auht.recoverPass.emailFound.btn")}
      />
    </>
  );
};
