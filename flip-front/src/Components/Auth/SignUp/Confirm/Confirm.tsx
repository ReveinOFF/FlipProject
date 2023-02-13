import { useEffect } from "react";
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

  useEffect(() => {
    document.title = t("auht.signup.confirm.title_page");
  }, []);

  return (
    <>
      <div className={styles.header}>{t("auht.signup.confirm.header")}</div>

      <div className={styles.description}>
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
