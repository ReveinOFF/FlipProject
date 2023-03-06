import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CustomButton,
  CustomMiniBTN,
} from "../../../../Components/MainBlock/Button/CustomButton";
import { CustomInput } from "../../../../Components/MainBlock/Input/CustomInput";
import styles from "./ChangePassword.module.scss";

export const ChangePassword = () => {
  const navigate = useNavigate();

  const [visible, setVisoiblity] = useState(false);
  const [visible2, setVisoiblity2] = useState(false);

  return (
    <>
      <div className={styles.header}>Зміна пароля</div>
      <form className={styles.form}>
        <div className={styles.input_menu}>
          <CustomInput
            type={visible ? "text" : "password"}
            placeholder="Пароль"
          />
          <svg
            onClick={() => setVisoiblity((visible) => !visible)}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21C7 21 1 16 1 12C1 8 7 3 12 3C17 3 23 8 23 12C23 16 17 21 12 21ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7Z"
              stroke="#939292"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className={styles.input_menu}>
          <CustomInput
            type={visible2 ? "text" : "password"}
            placeholder="Повторіть пароль"
          />
          <svg
            onClick={() => setVisoiblity2((visible2) => !visible2)}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21C7 21 1 16 1 12C1 8 7 3 12 3C17 3 23 8 23 12C23 16 17 21 12 21ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7Z"
              stroke="#939292"
              strokeWidth="2"
            />
          </svg>
        </div>

        <CustomButton content="Підтвердити" />
        <CustomMiniBTN content="Скасувати" onClick={() => navigate("/")} />
      </form>
    </>
  );
};
