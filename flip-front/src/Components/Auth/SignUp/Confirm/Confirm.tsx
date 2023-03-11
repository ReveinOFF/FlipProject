import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { CustomButton } from "../../../MainBlock/Button/CustomButton";
import { SelectPhase } from "../store/types";
import styles from "./Confirm.module.scss";

export const Confirm = () => {
  const email = useTypedSelector((state) => state.reg.data?.Email);

  const dispatch = useDispatch();
  const [t] = useTranslation("translation");

  const [mode, setMode] = useState<string>("light");
  const theme = useTypedSelector((state) => state.theme.mode);

  useEffect(() => {
    if (theme === "light") setMode("light");
    else setMode("dark");
  }, [theme]);

  useEffect(() => {
    document.title = t("auht.signup.confirm.title_page");
  }, []);

  return (
    <>
      <div
        className={`${styles.header} ${
          mode === "light" ? styles.light_header : styles.dark_header
        }`}
      >
        {t("auht.signup.confirm.header")}
      </div>

      <div
        className={`${styles.description} ${
          mode === "light" ? styles.light_description : styles.dark_description
        }`}
      >
        {`${t("auht.signup.confirm.description1")} ${email} ${t(
          "auht.signup.confirm.description2"
        )}`}
      </div>

      <CustomButton
        content={t("auht.signup.confirm.btn")}
        onClick={() => {
          dispatch({
            type: "REG-PHASE",
            payload: {
              phase: SelectPhase.phaseTwo,
            },
          });

          dispatch({
            type: "REG",
            payload: {
              succes: false,
            },
          });
        }}
      />
    </>
  );
};
