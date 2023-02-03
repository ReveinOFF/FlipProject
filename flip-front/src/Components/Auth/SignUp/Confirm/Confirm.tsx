import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CustomButton } from "../../../MainBlock/Button/CustomButton";
import { SelectPhase } from "../store/types";
import styles from "./Confirm.module.scss";

export const Confirm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Sign Up | Confirm Email - Flip";
  }, []);

  return (
    <>
      <div className={styles.header}>Підтвердження</div>

      <div className={styles.description}>
        На ваш email: emaildfsg@gmail.com буде надіслано код із підтвердженням!
      </div>

      <CustomButton
        content="Змінити електронну адресу"
        onClick={() =>
          dispatch({ type: "REG", payload: { phase: SelectPhase.phaseTwo } })
        }
      />
    </>
  );
};
