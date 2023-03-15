import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ToastActionTypes } from "../../Toast/store/type";
import styles from "./FPMenu.module.scss";

export const FPMenu = ({ show, onClick }) => {
  const [t] = useTranslation("translation");
  const dispatch = useDispatch();

  return (
    <>
      {show && (
        <div className={styles.fliper_menu}>
          <div className={styles.fliper}>
            <svg
              onClick={() => onClick()}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 3L21 21M3 21L21 3" stroke="#EAEAEA" strokeWidth="2" />
            </svg>

            <div className={styles.menu}>
              <div className={styles.btn}>{t("main.fliper_menu.btn1")}</div>
              <div className={styles.btn}>{t("main.fliper_menu.btn2")}</div>
              <div
                className={styles.btn}
                onClick={() =>
                  navigator.clipboard
                    .writeText(window.location.href)
                    .then(() => {
                      dispatch({
                        type: ToastActionTypes.SHOW,
                        payload: {
                          message: t("toast.success.copy"),
                          type: "success",
                        },
                      });
                    })
                }
              >
                {t("main.fliper_menu.btn3")}
              </div>
              <div className={styles.last_btn}>
                {t("main.fliper_menu.btn4")}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
