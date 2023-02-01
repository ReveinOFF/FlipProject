import styles from "./CustomButton.module.scss";

export const CustomButtonBG = (props) => {
  const { type, onClick, disabled, content, error } = props;

  return (
    <>
      <button
        className={`${styles.custom_btn} ${error && styles.error_btn}`}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {content}
      </button>
    </>
  );
};

export const CustomButton = (props) => {
  const { type, onClick, disabled, content, error } = props;

  return (
    <>
      <button
        className={`${styles.custom_btn2} ${error && styles.error_btn}`}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {content}
      </button>
    </>
  );
};

export const CustomMiniBTN = (props) => {
  const { onClick, content } = props;

  return (
    <>
      <a className={styles.custom_mini_btn} onClick={onClick}>
        <div className={styles.mini_btn}>{content}</div>
        <div className={styles.loader}></div>
      </a>
    </>
  );
};
