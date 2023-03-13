import { useTranslation } from "react-i18next";
import styles from "./RightMenu.module.scss";
import lodash from "lodash";
import { useCallback, useEffect, useState } from "react";
import { GetUsers } from "../../../Interface/Profile";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { useDispatch } from "react-redux";

export const RightMenu = () => {
  const [t] = useTranslation("translation");
  const theme = useTypedSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [mode, setMode] = useState<string>("light");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchUser, setSearchUser] = useState<GetUsers[]>();

  const debouncedSearch = useCallback(
    lodash.debounce((query) => {
      axios.get(`user/search-users/${query}`).then((res) => {
        setSearchUser(res.data);
      });
    }, 500),
    []
  );

  useEffect(() => {
    if (theme === "light") setMode("light");
    else setMode("dark");
  }, [theme]);

  useEffect(() => {
    if (searchQuery !== "" || searchQuery !== null)
      debouncedSearch(searchQuery);
    else setSearchUser(undefined);
  }, [searchQuery, debouncedSearch]);

  const sendSearch = async () => {
    if (searchQuery !== "" || searchQuery !== null)
      await axios.get(`user/search-users/${searchQuery}`).then((res) => {
        setSearchUser(res.data);
      });
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const LightOrDarkMode = () => {
    if (mode === "light") {
      localStorage.setItem("LightDarkMode", "dark");
      setMode("dark");
      dispatch({ type: "Theme", payload: { mode: "dark" } });
    } else {
      localStorage.setItem("LightDarkMode", "light");
      setMode("light");
      dispatch({ type: "Theme", payload: { mode: "light" } });
    }
  };

  return (
    <div className={styles.right_menu}>
      <div className={styles.top_menu}>
        <label>
          <svg
            onClick={sendSearch}
            className={styles.icon}
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0625 19.0312C5.11875 19.0312 1.09375 15.0062 1.09375 10.0625C1.09375 5.11875 5.11875 1.09375 10.0625 1.09375C10.4213 1.09375 10.7188 1.39125 10.7188 1.75C10.7188 2.10875 10.4213 2.40625 10.0625 2.40625C5.83625 2.40625 2.40625 5.845 2.40625 10.0625C2.40625 14.28 5.83625 17.7187 10.0625 17.7187C14.2887 17.7187 17.7188 14.28 17.7188 10.0625C17.7188 9.70375 18.0163 9.40625 18.375 9.40625C18.7337 9.40625 19.0312 9.70375 19.0312 10.0625C19.0312 15.0062 15.0063 19.0312 10.0625 19.0312ZM19.25 19.9071C19.0837 19.9071 18.9175 19.8459 18.7862 19.7146L17.0362 17.9646C16.9142 17.8411 16.8458 17.6745 16.8458 17.5009C16.8458 17.3272 16.9142 17.1606 17.0362 17.0371C17.29 16.7834 17.71 16.7834 17.9638 17.0371L19.7138 18.7871C19.9675 19.0409 19.9675 19.4609 19.7138 19.7146C19.5825 19.8459 19.4163 19.9071 19.25 19.9071Z"
              fill="#474747"
            />
            <path
              d="M15.3124 8.34754C14.5074 8.34754 12.6349 7.36754 12.0574 5.56504C11.6636 4.33129 12.1186 2.71254 13.5449 2.24879C14.1574 2.04754 14.7961 2.14379 15.3036 2.46754C15.8024 2.14379 16.4586 2.05629 17.0711 2.24879C18.4974 2.71254 18.9611 4.33129 18.5586 5.56504C17.9899 7.40254 16.0211 8.34754 15.3124 8.34754ZM13.3086 5.17129C13.7111 6.44004 15.0761 7.01754 15.3211 7.04379C15.6011 7.01754 16.9399 6.37004 17.3074 5.18004C17.5086 4.54129 17.3074 3.71879 16.6686 3.50879C16.3974 3.42129 16.0299 3.47379 15.8549 3.72754C15.7324 3.91129 15.5399 4.01629 15.3211 4.02504C15.2157 4.02622 15.1114 4.00223 15.0171 3.95506C14.9227 3.90788 14.841 3.83888 14.7786 3.75379C14.5774 3.46504 14.2099 3.42129 13.9474 3.50004C13.3174 3.71004 13.1074 4.53254 13.3086 5.17129Z"
              fill="#474747"
            />
          </svg>
          <input
            type="search"
            placeholder={t("main.right_menu.search_ph").toString()}
            onChange={handleSearch}
          />
        </label>

        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.907227"
            y="1.25"
            width="24.5"
            height="24.5"
            rx="8.25"
            stroke="#F8F8F8"
            strokeWidth="1.5"
          />
          <path
            d="M19.1572 14.25H7.15723C6.74723 14.25 6.40723 13.91 6.40723 13.5C6.40723 13.09 6.74723 12.75 7.15723 12.75H19.1572C19.5672 12.75 19.9072 13.09 19.9072 13.5C19.9072 13.91 19.5672 14.25 19.1572 14.25Z"
            fill="#F8F8F8"
          />
          <path
            d="M13.1572 20.25C12.7472 20.25 12.4072 19.91 12.4072 19.5V7.5C12.4072 7.09 12.7472 6.75 13.1572 6.75C13.5672 6.75 13.9072 7.09 13.9072 7.5V19.5C13.9072 19.91 13.5672 20.25 13.1572 20.25Z"
            fill="#F8F8F8"
          />
        </svg>

        <svg
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.1572 27.5645C14.7697 27.5645 14.3947 27.5145 14.0822 27.402C9.30723 25.7645 1.71973 19.952 1.71973 11.3645C1.71973 6.98952 5.25723 3.43952 9.60723 3.43952C11.7197 3.43952 13.6947 4.26452 15.1572 5.73952C15.8833 5.00685 16.748 4.42612 17.7009 4.03123C18.6538 3.63634 19.6758 3.43519 20.7072 3.43952C25.0572 3.43952 28.5947 7.00202 28.5947 11.3645C28.5947 19.9645 21.0072 25.7645 16.2322 27.402C15.9197 27.5145 15.5447 27.5645 15.1572 27.5645ZM9.60723 5.31452C6.29473 5.31452 3.59473 8.02702 3.59473 11.3645C3.59473 19.902 11.8072 24.652 14.6947 25.6395C14.9197 25.7145 15.4072 25.7145 15.6322 25.6395C18.5072 24.652 26.7322 19.9145 26.7322 11.3645C26.7322 8.02702 24.0322 5.31452 20.7197 5.31452C18.8197 5.31452 17.0572 6.20202 15.9197 7.73952C15.5697 8.21452 14.7697 8.21452 14.4197 7.73952C13.8643 6.98587 13.1392 6.37361 12.3031 5.95231C11.467 5.53101 10.5435 5.31252 9.60723 5.31452Z"
            fill="#F8F8F8"
          />
        </svg>

        <svg
          width="2"
          height="31"
          viewBox="0 0 2 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0.657227"
            y1="0.5"
            x2="0.657225"
            y2="30.5"
            stroke="#939292"
          />
        </svg>

        <svg
          onClick={LightOrDarkMode}
          width="33"
          height="33"
          viewBox="0 0 33 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_284_500)">
            <circle cx="16.1572" cy="16.5" r="16" fill="#F8F8F8" />
            <path
              d="M16.1278 9.08302L16.1269 9.08213C16.0039 8.96381 15.9439 8.82517 15.9439 8.64118V6.65448C15.9439 6.47047 16.004 6.33123 16.1274 6.21209C16.2505 6.09319 16.4006 6.0307 16.6032 6.0307C16.8056 6.0307 16.9561 6.09305 17.08 6.21206C17.2026 6.331 17.2625 6.47026 17.2625 6.65448V8.64118C17.2625 8.82559 17.2025 8.96437 17.0801 9.08258C16.956 9.20239 16.8054 9.26496 16.6032 9.26496C16.401 9.26496 16.2511 9.20241 16.1278 9.08302ZM16.1278 26.9633L16.1269 26.9624C16.0039 26.8441 15.9439 26.7054 15.9439 26.5214V24.5347C15.9439 24.3508 16.0039 24.2121 16.1269 24.0938L16.1278 24.0929C16.2511 23.9735 16.401 23.911 16.6032 23.911C16.8054 23.911 16.956 23.9735 17.0801 24.0933C17.2025 24.2116 17.2625 24.3503 17.2625 24.5347V26.5214C17.2625 26.7059 17.2025 26.8446 17.0801 26.9628C16.956 27.0827 16.8055 27.1452 16.6032 27.1452C16.401 27.1452 16.2511 27.0827 16.1278 26.9633ZM24.3584 17.0298L24.3575 17.0289C24.2345 16.9106 24.1745 16.772 24.1745 16.588C24.1745 16.404 24.2346 16.2647 24.358 16.1456C24.4811 16.0267 24.6312 15.9642 24.8338 15.9642H26.8915C27.0941 15.9642 27.2441 16.0267 27.3673 16.1456C27.4907 16.2647 27.5507 16.404 27.5507 16.588C27.5507 16.7719 27.4907 16.9106 27.3677 17.0289L27.3668 17.0298C27.2436 17.1492 27.0937 17.2117 26.8915 17.2117H24.8338C24.6316 17.2117 24.4817 17.1492 24.3584 17.0298ZM8.84903 9.14142L8.85503 9.13611L8.86079 9.13055C8.97255 9.02264 9.11688 8.96108 9.32427 8.96108C9.53166 8.96108 9.67599 9.02264 9.78775 9.13055L11.2538 10.5461C11.3646 10.653 11.4239 10.7862 11.4239 10.9755C11.4239 11.1617 11.3666 11.2935 11.2594 11.3996C11.1227 11.5183 10.9716 11.5745 10.7903 11.5745C10.6083 11.5745 10.4566 11.5178 10.3195 11.398L8.85971 10.0133C8.72551 9.88326 8.66501 9.73891 8.66501 9.56002C8.66501 9.38148 8.72469 9.25147 8.84903 9.14142ZM23.4043 24.0568L23.4044 24.0566L23.3953 24.0477L21.9599 22.637C21.839 22.5078 21.7825 22.3643 21.7825 22.1885C21.7825 22.0104 21.8395 21.8801 21.9526 21.7709C22.0665 21.661 22.2078 21.6014 22.4037 21.6014C22.5968 21.6014 22.7519 21.66 22.887 21.778L24.348 23.1638L24.3478 23.164L24.3574 23.1725C24.4785 23.2797 24.5337 23.4046 24.5282 23.5794L24.5282 23.5803C24.5226 23.7707 24.4603 23.9215 24.3398 24.0509C24.2057 24.1779 24.0514 24.2397 23.8564 24.2397C23.659 24.2397 23.5183 24.1769 23.4043 24.0568ZM5.8396 17.0298L5.83867 17.0289C5.7157 16.9106 5.6557 16.7719 5.6557 16.588C5.6557 16.404 5.71573 16.2647 5.83913 16.1456L5.58326 15.8806L5.83913 16.1456C5.96228 16.0267 6.11233 15.9642 6.31496 15.9642H8.37261C8.57498 15.9642 8.72553 16.0265 8.84945 16.1456C8.97201 16.2645 9.03187 16.4038 9.03187 16.588C9.03187 16.7724 8.97189 16.9111 8.84946 17.0294C8.72537 17.1492 8.57485 17.2117 8.37261 17.2117H6.31496C6.11272 17.2117 5.96281 17.1492 5.8396 17.0298ZM8.87211 24.0568L8.86657 24.051L8.86079 24.0454C8.74999 23.9384 8.69073 23.8053 8.69073 23.6159C8.69073 23.4265 8.74999 23.2934 8.86079 23.1864L10.3269 21.7709C10.4407 21.661 10.582 21.6014 10.778 21.6014C10.9703 21.6014 11.1249 21.6596 11.2596 21.7765C11.3928 21.9075 11.4496 22.0475 11.4496 22.2133C11.4496 22.3806 11.3914 22.5219 11.2538 22.6547L9.81347 24.0454C9.67806 24.1761 9.52205 24.2397 9.32427 24.2397C9.12685 24.2397 8.9861 24.1769 8.87211 24.0568ZM21.9526 11.405C21.8395 11.2958 21.7825 11.1656 21.7825 10.9875C21.7825 10.8117 21.839 10.6681 21.9599 10.5389L23.3929 9.13055C23.3933 9.13019 23.3937 9.12984 23.394 9.12949C23.5316 8.99717 23.6837 8.93624 23.8688 8.93624C24.0552 8.93624 24.208 8.99768 24.3456 9.13055C24.4564 9.23752 24.5157 9.37065 24.5157 9.56002C24.5157 9.7494 24.4564 9.88252 24.3456 9.9895L22.8795 11.405C22.7678 11.5129 22.6235 11.5745 22.4161 11.5745C22.2087 11.5745 22.0644 11.5129 21.9526 11.405ZM16.6032 22.1785C14.9813 22.1785 13.6167 21.6342 12.4874 20.5438C11.3586 19.4539 10.7998 18.1424 10.7998 16.588C10.7998 15.0335 11.3586 13.722 12.4874 12.6321C13.6167 11.5417 14.9813 10.9974 16.6032 10.9974C18.2251 10.9974 19.5897 11.5417 20.719 12.6321C21.8478 13.722 22.4066 15.0335 22.4066 16.588C22.4066 18.1424 21.8478 19.4539 20.719 20.5438C19.5897 21.6342 18.2251 22.1785 16.6032 22.1785Z"
              fill="url(#paint0_linear_284_500)"
              stroke="url(#paint1_linear_284_500)"
              strokeWidth="0.73913"
            />
            <circle
              cx="16.6408"
              cy="17.0158"
              r="5.44355"
              fill="#F8F8F8"
              stroke="url(#paint2_linear_284_500)"
              strokeWidth="1.5"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_284_500"
              x1="0.896326"
              y1="25.3294"
              x2="28.3148"
              y2="24.7029"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#48D824" />
              <stop offset="1" stopColor="#10D0EA" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_284_500"
              x1="0.896326"
              y1="25.3294"
              x2="28.3148"
              y2="24.7029"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#48D824" />
              <stop offset="1" stopColor="#10D0EA" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_284_500"
              x1="8.04484"
              y1="21.9707"
              x2="23.0508"
              y2="21.6396"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#48D824" />
              <stop offset="1" stopColor="#10D0EA" />
            </linearGradient>
            <clipPath id="clip0_284_500">
              <rect
                width="32"
                height="32"
                fill="white"
                transform="translate(0.157227 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div
        className={`${styles.user_search} ${
          searchQuery.length > 0 ? styles.show_search : styles.not_show_search
        }`}
      >
        {searchUser &&
          searchQuery.length > 0 &&
          searchUser.map((item) => (
            <div
              className={styles.find_user}
              key={item.id}
              onClick={() => navigate(item.name)}
            >
              {item.userImage ? (
                <img
                  src={`http://localhost:5170/resources/userimages/${item.id}/${item.userImage}`}
                  alt=""
                />
              ) : (
                <img
                  src="/Assets/Img/monkey-selfie_custom-7117031c832fc3607ee5b26b9d5b03d10a1deaca-s1100-c50.jpg"
                  alt=""
                />
              )}
              <div className={styles.find_user_inf}>
                <div className={styles.find_user_name}>{item.name}</div>
                <div className={styles.find_user_username}>
                  @{item.userName}
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className={styles.bottom_menu}>
        <div className={styles.header}>{t("main.right_menu.notification")}</div>
        <div className={styles.notif_first}>
          <div className={styles.secondary_header}>
            {t("main.right_menu.header1")}
          </div>
          <div>
            <div className={styles.notification}>
              <img
                alt=""
                className={styles.notif_img_h}
                src="https://media.discordapp.net/attachments/580349748389871641/1071742373815668756/image.png?width=30&height=30"
              />
              <div className={styles.notinf_text}>
                <span>Іван Гук</span> {t("main.right_menu.foll_ed")}
              </div>
              <button className={styles.btn_unfoll}>
                {t("main.right_menu.is_foll_ed")}
              </button>
            </div>
            <div className={styles.notinf_date}>3 д.</div>
          </div>
        </div>
        <div>
          <div className={styles.secondary_header}>
            {t("main.right_menu.header2")}
          </div>
          <div>
            <div className={styles.notification}>
              <img
                alt=""
                className={styles.notif_img_h}
                src="https://media.discordapp.net/attachments/580349748389871641/1071742373815668756/image.png?width=30&height=30"
              />
              <div className={styles.notinf_text}>
                <span>Руся Щем</span> {t("main.right_menu.like_post")}
              </div>
              <img
                alt=""
                className={styles.notif_img_m}
                src="https://media.discordapp.net/attachments/580349748389871641/1071742373815668756/image.png?width=46&height=52"
              />
            </div>
            <div className={styles.notinf_date}>3 тиж.</div>

            <div className={styles.notification}>
              <img
                alt=""
                className={styles.notif_img_h}
                src="https://media.discordapp.net/attachments/580349748389871641/1071742373815668756/image.png?width=30&height=30"
              />
              <div className={styles.notinf_text}>
                <span>Вадис Семенко</span> {t("main.right_menu.foll_ed")}
              </div>
              <button className={styles.btn_foll}>
                {t("main.right_menu.follow")}
              </button>
            </div>
            <div className={styles.notinf_date}>3 д.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
