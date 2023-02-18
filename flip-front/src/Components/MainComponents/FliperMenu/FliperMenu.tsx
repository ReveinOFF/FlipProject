import styles from "./FliperMenu.module.scss";

export const FliperMenu = () => {
  return (
    <div className={styles.fliper_menu}>
      <div className={styles.fliper}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 3L21 21M3 21L21 3" stroke="#EAEAEA" strokeWidth="2" />
        </svg>

        <div className={styles.menu}>
          <div className={styles.btn}>Перейти до публікації</div>
          <div className={styles.btn}>Поділитись</div>
          <div className={styles.btn}>Копіювати посилання </div>
          <div className={styles.last_btn}>Поскаржитись</div>
        </div>
      </div>
    </div>
  );
};
