import { useNavigate } from "react-router-dom";
import styles from "./BlockedPage.module.scss";

export const BlockedPage = ({ isMyProfile }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.blocked_page}>
      <div className={styles.button} onClick={() => navigate(-1)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.0902 20.67C15.2802 20.67 15.4702 20.6 15.6202 20.45C15.7597 20.3089 15.8379 20.1185 15.8379 19.92C15.8379 19.7216 15.7597 19.5312 15.6202 19.39L9.10019 12.87C8.62019 12.39 8.62019 11.61 9.10019 11.13L15.6202 4.61002C15.7597 4.46888 15.8379 4.27845 15.8379 4.08002C15.8379 3.88159 15.7597 3.69116 15.6202 3.55002C15.3302 3.26002 14.8502 3.26002 14.5602 3.55002L8.04019 10.07C7.53019 10.58 7.24019 11.27 7.24019 12C7.24019 12.73 7.52019 13.42 8.04019 13.93L14.5602 20.45C14.7102 20.59 14.9002 20.67 15.0902 20.67Z"
            fill="black"
          />
        </svg>
        <div>Повернутися</div>
      </div>

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

        {isMyProfile ? (
          <div className={styles.pnf_text_top}>
            Ваш акаунт заблокований за порушення прав додатку
          </div>
        ) : (
          <div className={styles.pnf_text_top}>
            Цей акаунт заблокований за порушення прав додатку
          </div>
        )}
        <div className={styles.pnf_text_bottom}>
          Дізнайтесь як можна відновити акаунт.
        </div>

        <button>Докладніше</button>
      </div>
    </div>
  );
};
