import { useNavigate } from "react-router-dom";
import { CustomMiniBTN } from "../../../MainBlock/Button/CustomButton";
import styles from "./EmailFound.module.scss";

export const EmailFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.header}>Пошту знайдено</div>
      <div className={styles.description}>
        Перегляньте свою пошту, для зміни паролю
      </div>
      <CustomMiniBTN
        onClick={() => navigate("/signin")}
        content="Повернутися на сторінку входу"
      />
    </>
  );
};
