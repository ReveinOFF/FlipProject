import axios from "axios";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { LazyLoading } from "../../../Components/LazyLoading/LazyLoading";
import styles from "./Entrances.module.scss";

export const Entrances = () => {
  const navigate = useNavigate();
  const [t] = useTranslation("translation");

  const getEntrances = async () => {
    const { data } = await axios.get("settings/get-all-authorize");

    return data;
  };

  const { isLoading, data } = useQuery("getEntrances", getEntrances);

  useEffect(() => {
    document.title = "Входи в обліковий запис";
  }, []);

  if (isLoading) return <LazyLoading />;

  return (
    <>
      <div className={styles.back} onClick={() => navigate(-1)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.0902 3.32998C15.2802 3.32998 15.4702 3.39998 15.6202 3.54998C15.7597 3.69112 15.8379 3.88155 15.8379 4.07998C15.8379 4.27841 15.7597 4.46884 15.6202 4.60998L9.10019 11.13C8.62019 11.61 8.62019 12.39 9.10019 12.87L15.6202 19.39C15.7597 19.5311 15.8379 19.7216 15.8379 19.92C15.8379 20.1184 15.7597 20.3088 15.6202 20.45C15.3302 20.74 14.8502 20.74 14.5602 20.45L8.04019 13.93C7.53019 13.42 7.24019 12.73 7.24019 12C7.24019 11.27 7.52019 10.58 8.04019 10.07L14.5602 3.54998C14.7102 3.40998 14.9002 3.32998 15.0902 3.32998Z"
            fill="#2F2F2F"
          />
        </svg>

        <div>Входи в обліковий запис</div>
      </div>

      <div className={styles.entrances}>
        <div className={styles.header}>Ваші активні сеанси входу</div>

        {data &&
          data.map((item) => (
            <div className={styles.container} key={item.id}>
              <div className={styles.top}>
                <svg
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.4988 18.3042C12.7475 18.3042 10.5 16.0696 10.5 13.3054C10.5 10.5412 12.7475 8.31958 15.4988 8.31958C18.25 8.31958 20.4975 10.5542 20.4975 13.3183C20.4975 16.0825 18.25 18.3042 15.4988 18.3042ZM15.4988 10.2571C13.8196 10.2571 12.4375 11.6262 12.4375 13.3183C12.4375 15.0104 13.8067 16.3796 15.4988 16.3796C17.1908 16.3796 18.56 15.0104 18.56 13.3183C18.56 11.6262 17.1779 10.2571 15.4988 10.2571Z"
                    fill="#2F2F2F"
                  />
                  <path
                    d="M15.5021 29.3983C13.5122 29.3945 11.6008 28.6216 10.1675 27.2412C6.35712 23.5728 2.14629 17.7216 3.73504 10.7595C5.16879 4.44325 10.6842 1.6145 15.5021 1.6145H15.515C20.333 1.6145 25.8484 4.44325 27.2821 10.7724C28.858 17.7345 24.6471 23.5728 20.8367 27.2412C19.4034 28.6216 17.492 29.3945 15.5021 29.3983ZM15.5021 3.552C11.7434 3.552 6.91254 5.55408 5.63379 11.1858C4.23879 17.2695 8.06212 22.5137 11.5238 25.8333C12.5907 26.8708 14.0203 27.4513 15.5086 27.4513C16.9968 27.4513 18.4264 26.8708 19.4934 25.8333C22.9421 22.5137 26.7655 17.2695 25.3963 11.1858C24.1046 5.55408 19.2609 3.552 15.5021 3.552Z"
                    fill="#2F2F2F"
                  />
                </svg>
                <div>{item.city}</div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.info}>
                  <div className={styles.left_active}>Зараз у мережі</div>
                  <div className={styles.right}>/ {item.UserAgent}</div>
                </div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.33047 8.91006C3.33047 8.72006 3.40047 8.53006 3.55047 8.38006C3.69161 8.24058 3.88204 8.16235 4.08047 8.16235C4.2789 8.16235 4.46933 8.24058 4.61047 8.38006L11.1305 14.9001C11.6105 15.3801 12.3905 15.3801 12.8705 14.9001L19.3905 8.38006C19.5316 8.24058 19.722 8.16235 19.9205 8.16235C20.1189 8.16235 20.3093 8.24058 20.4505 8.38006C20.7405 8.67006 20.7405 9.15005 20.4505 9.44005L13.9305 15.9601C13.4205 16.4701 12.7305 16.7601 12.0005 16.7601C11.2705 16.7601 10.5805 16.4801 10.0705 15.9601L3.55047 9.44005C3.41047 9.29005 3.33047 9.10006 3.33047 8.91006Z"
                    fill="#2F2F2F"
                  />
                </svg>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
