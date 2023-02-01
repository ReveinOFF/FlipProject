import { useEffect } from "react";
import { CustomButton } from "../../../MainBlock/Button/CustomButton";
import styles from "./Confirm.module.scss";

export const Confirm = () => {
  useEffect(() => {
    document.title = "Sign Up | Confirm Email - Flip";
  }, []);

  return (
    <>
      <div className={styles.header}>Підтвердження</div>

      <div className={styles.description}>
        На ваш email: emaildfsg@gmail.com буде надіслано код із підтвердженням
      </div>

      <CustomButton content="Змінити електронну адресу" />
    </>
  );
};
