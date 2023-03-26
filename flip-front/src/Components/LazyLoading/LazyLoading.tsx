import { useTranslation } from "react-i18next";
import styles from "./LazyLoading.module.scss";

export const LazyLoading = () => {
  const [t] = useTranslation("translation");

  return (
    <div className={styles.lazy_loading}>
      <svg
        width="76"
        height="27"
        viewBox="0 0 76 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.eyes}
      >
        <path
          d="M20.3305 12.1897C20.4782 17.9064 18.1057 21.9797 12.2544 22.8891C5.91165 23.8672 1.85024 20.4076 1.15707 14.4092C0.514383 8.72593 4.0426 4.63961 9.63228 3.95321C15.2748 3.26134 18.9918 6.48962 20.3323 12.2073L20.3305 12.1897Z"
          fill="black"
        />
        <path
          d="M67.1862 4.96274C72.5319 8.41707 73.7874 13.0062 71.1449 18.0436C68.405 23.2497 63.3787 24.5187 58.3785 21.918C52.894 19.0583 51.4805 13.9281 54.5968 8.53049C57.5538 3.40884 62.3132 2.88537 67.1774 4.97808L67.1862 4.96274Z"
          fill="black"
        />
      </svg>

      <svg
        width="140"
        height="45"
        viewBox="0 0 140 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.mouth}
      >
        <path
          d="M1.15054 8.63371C16.2041 30.5226 41.4257 44.8749 69.9994 44.8749C98.5731 44.8749 123.795 30.5226 138.848 8.63371C138.848 8.63371 143.423 -8.86953 129.503 8.63371C115.583 26.1369 94.1019 37.3583 70.0004 37.3583C45.8988 37.3583 24.4182 26.1369 10.498 8.63371C-3.42225 -8.86953 1.15054 8.63371 1.15054 8.63371Z"
          fill="black"
        />
      </svg>

      <div>{t("main.lazy_loading")}</div>
    </div>
  );
};
