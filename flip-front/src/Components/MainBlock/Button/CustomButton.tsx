import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import styles from "./CustomButton.module.scss";

export const CustomButtonBG = (props) => {
  const { type, onClick, disabled, content, error } = props;

  return (
    <>
      <button
        className={`${error ? styles.error_btn : styles.custom_btn}`}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {content}
      </button>
    </>
  );
};

export const CustomButton = (props) => {
  const { type, onClick, disabled, content, error = false } = props;

  const theme = useTypedSelector((state) => state.theme.mode);
  const [mode, setMode] = useState<string>("light");

  useEffect(() => {
    if (theme === "light") setMode("light");
    else setMode("dark");
  }, [theme]);

  return (
    <>
      <button
        className={`
          ${error && styles.error_btn} 
          ${!error && mode === "dark" && styles.custom_btn2_dark}
          ${!error && mode === "light" && styles.custom_btn2}
        `}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {content}
      </button>
    </>
  );
};

export const CustomMiniBTN = (props) => {
  const { onClick, content } = props;

  const theme = useTypedSelector((state) => state.theme.mode);
  const [mode, setMode] = useState<string>("light");

  useEffect(() => {
    if (theme === "light") setMode("light");
    else setMode("dark");
  }, [theme]);

  return (
    <>
      <a
        className={`${styles.custom_mini_btn} ${
          mode === "light" ? styles.light_mini_btn : styles.dark_mini_btn
        }`}
        onClick={onClick}
      >
        <div className={styles.mini_btn}>{content}</div>
        <div className={styles.loader}></div>
      </a>
    </>
  );
};
