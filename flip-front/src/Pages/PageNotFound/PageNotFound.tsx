import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./PagaNotFound.module.scss";

export const PageNotFound = () => {
  const [t] = useTranslation("translation");

  useEffect(() => {
    document.title = t("main.pnf");
  }, []);

  return (
    <div className={styles.pnf}>
      <div className={styles.pnf_code}>404</div>

      <svg
        className={styles.pnf_emoji}
        width="136"
        height="112"
        viewBox="0 0 136 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="path-1-inside-1_0_1" fill="white">
          <path d="M136 112C136 93.9653 128.836 76.6692 116.083 63.9167C103.331 51.1643 86.0347 44 68 44C49.9653 44 32.6692 51.1643 19.9167 63.9167C7.16427 76.6692 2.72317e-06 93.9653 0 112H5.80242C5.80242 95.5042 12.3554 79.684 24.0197 68.0197C35.684 56.3554 51.5042 49.8024 68 49.8024C84.4958 49.8024 100.316 56.3554 111.98 68.0197C123.645 79.684 130.198 95.5042 130.198 112H136Z" />
        </mask>
        <path
          d="M136 112C136 93.9653 128.836 76.6692 116.083 63.9167C103.331 51.1643 86.0347 44 68 44C49.9653 44 32.6692 51.1643 19.9167 63.9167C7.16427 76.6692 2.72317e-06 93.9653 0 112H5.80242C5.80242 95.5042 12.3554 79.684 24.0197 68.0197C35.684 56.3554 51.5042 49.8024 68 49.8024C84.4958 49.8024 100.316 56.3554 111.98 68.0197C123.645 79.684 130.198 95.5042 130.198 112H136Z"
          stroke="#2F2F2F"
          strokeWidth="150"
          strokeLinejoin="round"
          mask="url(#path-1-inside-1_0_1)"
        />
        <circle cx="17.5" cy="17.5" r="17.5" fill="#2F2F2F" />
        <circle cx="118.5" cy="17.5" r="17.5" fill="#2F2F2F" />
      </svg>

      <div className={styles.pnf_text}>{t("main.pnf")}</div>
    </div>
  );
};
