import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ToastActionTypes } from "../../Toast/store/type";
import styles from "./HistoryMenu.module.scss";

export const HistoryMenu = ({ show, onClick, isFollowing }) => {
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
              {isFollowing ? (
                <div className={styles.btn}>Відмінити підписку</div>
              ) : (
                <div className={styles.btn}>Стежити</div>
              )}
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
                Скопіювать url
              </div>
              <div className={styles.last_btn}>Поскаржиться</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
