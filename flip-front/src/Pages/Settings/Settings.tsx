import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Main.module.scss";

export const Settings = () => {
  const [t] = useTranslation("translation");

  useEffect(() => {
    document.title = t("main.settings.title_page");
  }, []);

  return <></>;
};
