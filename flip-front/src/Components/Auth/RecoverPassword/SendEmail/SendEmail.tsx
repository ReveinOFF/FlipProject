import { useNavigate } from "react-router-dom";
import {
  CustomButton,
  CustomMiniBTN,
} from "../../../MainBlock/Button/CustomButton";
import { CustomInput } from "../../../MainBlock/Input/CustomInput";
import styles from "./SendEmail.module.scss";

export const SendEmail = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.header}>Відновлення паролю</div>
      <div className={styles.description}>
        На ваш email буде надіслано повідомлення для відновлення паролю
      </div>
      <form className={styles.form}>
        <CustomInput type="text" placeholder="Пошта" />
        <CustomButton content="Далі" />
        <CustomMiniBTN onClick={() => navigate(-1)} content="Скасувати" />
      </form>
    </>
  );
};
