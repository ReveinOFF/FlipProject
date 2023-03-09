import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChangePassword.module.scss";

export const ChangePassword = () => {
  const navigate = useNavigate();

  const [visible, setVisible] = useState<boolean>(false);
  const [visible2, setVisible2] = useState<boolean>(false);
  const [visible3, setVisible3] = useState<boolean>(false);

  return (
    <>
      <div className={styles.back} onClick={() => navigate(-1)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.0902 3.32998C15.2802 3.32998 15.4702 3.39998 15.6202 3.54998C15.7597 3.69112 15.8379 3.88155 15.8379 4.07998C15.8379 4.27841 15.7597 4.46884 15.6202 4.60998L9.10019 11.13C8.62019 11.61 8.62019 12.39 9.10019 12.87L15.6202 19.39C15.7597 19.5311 15.8379 19.7216 15.8379 19.92C15.8379 20.1184 15.7597 20.3088 15.6202 20.45C15.3302 20.74 14.8502 20.74 14.5602 20.45L8.04019 13.93C7.53019 13.42 7.24019 12.73 7.24019 12C7.24019 11.27 7.52019 10.58 8.04019 10.07L14.5602 3.54998C14.7102 3.40998 14.9002 3.32998 15.0902 3.32998Z"
            fill="#2F2F2F"
          />
        </svg>

        <div>Змінити пароль</div>
      </div>

      <div className={styles.setting}>
        <div className={styles.profile}>
          <img
            src="/Assets/Img/monkey-selfie_custom-7117031c832fc3607ee5b26b9d5b03d10a1deaca-s1100-c50.jpg"
            alt=""
          />
          <div>Рома Зайчик</div>
        </div>

        <div className={styles.passwords}>
          <div className={styles.password}>
            <div className={styles.text}>Старий пароль</div>
            <div className={styles.input}>
              <input type={visible ? "text" : "password"} />
              <svg
                onClick={() => setVisible(!visible)}
                width="28"
                height="22"
                viewBox="0 0 28 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.845703 11C2.59167 5.20429 7.78708 1 13.9226 1C20.0595 1 25.2536 5.20429 26.9995 11C25.2536 16.7957 20.0595 21 13.9226 21C7.78708 21 2.59167 16.7957 0.845703 11Z"
                  stroke="#2F2F2F"
                  strokeOpacity="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.0333 11.0001C18.0333 12.1367 17.6001 13.2268 16.8291 14.0306C16.0581 14.8343 15.0123 15.2858 13.9219 15.2858C12.8315 15.2858 11.7858 14.8343 11.0147 14.0306C10.2437 13.2268 9.81055 12.1367 9.81055 11.0001C9.81055 9.86346 10.2437 8.77337 11.0147 7.96964C11.7858 7.16591 12.8315 6.71439 13.9219 6.71439C15.0123 6.71439 16.0581 7.16591 16.8291 7.96964C17.6001 8.77337 18.0333 9.86346 18.0333 11.0001Z"
                  stroke="#2F2F2F"
                  strokeOpacity="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {visible && (
                  <line x1="30" y1="0" x2="0" y2="20" stroke="#2F2F2F" />
                )}
              </svg>
            </div>
          </div>
          <div className={styles.password}>
            <div className={styles.text}>Новий пароль</div>
            <div className={styles.input}>
              <input type={visible2 ? "text" : "password"} />
              <svg
                onClick={() => setVisible2(!visible2)}
                width="28"
                height="22"
                viewBox="0 0 28 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.845703 11C2.59167 5.20429 7.78708 1 13.9226 1C20.0595 1 25.2536 5.20429 26.9995 11C25.2536 16.7957 20.0595 21 13.9226 21C7.78708 21 2.59167 16.7957 0.845703 11Z"
                  stroke="#2F2F2F"
                  strokeOpacity="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.0333 11.0001C18.0333 12.1367 17.6001 13.2268 16.8291 14.0306C16.0581 14.8343 15.0123 15.2858 13.9219 15.2858C12.8315 15.2858 11.7858 14.8343 11.0147 14.0306C10.2437 13.2268 9.81055 12.1367 9.81055 11.0001C9.81055 9.86346 10.2437 8.77337 11.0147 7.96964C11.7858 7.16591 12.8315 6.71439 13.9219 6.71439C15.0123 6.71439 16.0581 7.16591 16.8291 7.96964C17.6001 8.77337 18.0333 9.86346 18.0333 11.0001Z"
                  stroke="#2F2F2F"
                  strokeOpacity="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {visible2 && (
                  <line x1="30" y1="0" x2="0" y2="20" stroke="#2F2F2F" />
                )}
              </svg>
            </div>
          </div>
          <div className={styles.password}>
            <div className={styles.text}>Підтвердження паролю</div>
            <div className={styles.input}>
              <input type={visible3 ? "text" : "password"} />
              <svg
                onClick={() => setVisible3(!visible3)}
                width="28"
                height="22"
                viewBox="0 0 28 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.845703 11C2.59167 5.20429 7.78708 1 13.9226 1C20.0595 1 25.2536 5.20429 26.9995 11C25.2536 16.7957 20.0595 21 13.9226 21C7.78708 21 2.59167 16.7957 0.845703 11Z"
                  stroke="#2F2F2F"
                  strokeOpacity="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.0333 11.0001C18.0333 12.1367 17.6001 13.2268 16.8291 14.0306C16.0581 14.8343 15.0123 15.2858 13.9219 15.2858C12.8315 15.2858 11.7858 14.8343 11.0147 14.0306C10.2437 13.2268 9.81055 12.1367 9.81055 11.0001C9.81055 9.86346 10.2437 8.77337 11.0147 7.96964C11.7858 7.16591 12.8315 6.71439 13.9219 6.71439C15.0123 6.71439 16.0581 7.16591 16.8291 7.96964C17.6001 8.77337 18.0333 9.86346 18.0333 11.0001Z"
                  stroke="#2F2F2F"
                  strokeOpacity="0.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {visible3 && (
                  <line x1="30" y1="0" x2="0" y2="20" stroke="#2F2F2F" />
                )}
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <a onClick={() => navigate("/settings/forgot-password")}>
            Забули пароль?
          </a>
          <button>Змінити пароль</button>
        </div>
      </div>
    </>
  );
};
