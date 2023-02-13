import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Main.module.scss";

export const MessageSelection = () => {
  const [t] = useTranslation("translation");

  useEffect(() => {
    document.title = t("main.message_selection.title_page");
  }, []);

  return <></>;
};
