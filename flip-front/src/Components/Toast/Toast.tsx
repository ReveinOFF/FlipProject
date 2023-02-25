import { forwardRef, useImperativeHandle, useState } from "react";
import { ToastType } from "../../Interface/ToastType";
import styles from "./Toast.module.scss";

export const Toast = forwardRef((props: any, ref) => {
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 5000);
    },
  }));

  const deleteToast = () => {
    setShow(false);
  };

  return (
    <>
      {show && (
        <div className={styles.toast}>
          {props.type === ToastType.error && (
            <svg
              className={styles.type}
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="15" cy="15" r="15" fill="#E13F32" />
              <path
                d="M11 11C11 12.1046 10.1046 13 9 13C7.89543 13 7 12.1046 7 11C7 9.89543 7.89543 9 9 9C10.1046 9 11 9.89543 11 11Z"
                fill="#2F2F2F"
              />
              <path
                d="M23 11C23 12.1046 22.1046 13 21 13C19.8954 13 19 12.1046 19 11C19 9.89543 19.8954 9 21 9C22.1046 9 23 9.89543 23 11Z"
                fill="#2F2F2F"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.48781 22H7C7 21.1566 7.23675 20.3316 7.68264 19.5748C8.07807 18.9037 8.63799 18.2862 9.34315 17.7574C10.8434 16.6321 12.8783 16 15 16C17.1217 16 19.1566 16.6321 20.6569 17.7574C21.362 18.2862 21.9219 18.9037 22.3174 19.5748C22.7633 20.3316 23 21.1566 23 22H22.5122C22.5122 20.5445 21.5464 19.1486 20.1742 18.1194C18.8019 17.0902 16.9407 16.512 15 16.512C13.0593 16.512 11.1981 17.0902 9.82584 18.1194C8.45357 19.1486 7.48781 20.5445 7.48781 22Z"
                fill="#2F2F2F"
              />
            </svg>
          )}

          {props.type === ToastType.warning && (
            <svg
              className={styles.type}
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="15" cy="15" r="15" fill="#F2BC00" />
              <path
                d="M11 12C11 13.1046 10.1046 14 9 14C7.89543 14 7 13.1046 7 12C7 10.8954 7.89543 10 9 10C10.1046 10 11 10.8954 11 12Z"
                fill="#555555"
              />
              <path
                d="M23 12C23 13.1046 22.1046 14 21 14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10C22.1046 10 23 10.8954 23 12Z"
                fill="#555555"
              />
              <path d="M12 20H18" stroke="#555555" strokeLinecap="round" />
            </svg>
          )}

          {props.type === ToastType.success && (
            <svg
              className={styles.type}
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="15" cy="15" r="15" fill="#1ADE1E" />
              <path
                d="M11 11.5C11 12.6046 10.1046 13.5 9 13.5C7.89543 13.5 7 12.6046 7 11.5C7 10.3954 7.89543 9.5 9 9.5C10.1046 9.5 11 10.3954 11 11.5Z"
                fill="#2F2F2F"
              />
              <path
                d="M23 11.5C23 12.6046 22.1046 13.5 21 13.5C19.8954 13.5 19 12.6046 19 11.5C19 10.3954 19.8954 9.5 21 9.5C22.1046 9.5 23 10.3954 23 11.5Z"
                fill="#2F2F2F"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.48781 16.5H7C7 17.4839 7.23675 18.4465 7.68264 19.3294C8.07807 20.1124 8.63799 20.8327 9.34315 21.4497C10.8434 22.7625 12.8783 23.5 15 23.5C17.1217 23.5 19.1566 22.7625 20.6569 21.4497C21.362 20.8327 21.9219 20.1124 22.3174 19.3294C22.7633 18.4465 23 17.4839 23 16.5H22.5122C22.5122 18.1981 21.5464 19.8267 20.1742 21.0274C18.8019 22.2281 16.9407 22.9027 15 22.9027C13.0593 22.9027 11.1981 22.2281 9.82584 21.0274C8.45357 19.8266 7.48781 18.1981 7.48781 16.5Z"
                fill="#2F2F2F"
              />
            </svg>
          )}

          <div className={styles.message}>{props.message}</div>

          <svg
            className={styles.close}
            onClick={deleteToast}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1613_8611)">
              <path
                d="M1.25 1.25L8.75 8.75M1.25 8.75L8.75 1.25"
                stroke="#2F2F2F"
              />
            </g>
            <defs>
              <clipPath id="clip0_1613_8611">
                <rect width="10" height="10" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <div
            className={`${styles.loadbar} ${
              props.type === ToastType.error && styles.error
            } ${props.type === ToastType.warning && styles.warning} ${
              props.type === ToastType.success && styles.success
            }`}
          ></div>
        </div>
      )}
    </>
  );
});
