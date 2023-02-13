import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Main.module.scss";

export const MessageRoom = () => {
  const [t] = useTranslation("translation");

  useEffect(() => {
    document.title = "Test message - Flip";
  }, []);

  return <></>;
};
