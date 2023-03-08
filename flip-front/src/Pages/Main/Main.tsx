import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { History } from "../../Components/MainComponents/History/History";
import styles from "./Main.module.scss";

export const Main = () => {
  const [t] = useTranslation("translation");

  useEffect(() => {
    document.title = t("main.main.title_page");
  }, []);

  return <></>;
};
