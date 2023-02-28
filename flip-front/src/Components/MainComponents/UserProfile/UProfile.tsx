import styles from "./UProfile.module.scss";
import { CreatedPost } from "../../../Interface/Profile";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ToastActionTypes } from "../../Toast/store/type";

export const UProfile = (props) => {
  const { profile } = props;

  const [selector, setSelector] = useState(1);

  const dispatch = useDispatch();
  const [t] = useTranslation("translation");

  useEffect(() => {
    document.title = profile.name;
  }, []);

  return (
    <>
      <div className={styles.my_profile_inf}>
        <div className={styles.information}>
          <div className={styles.inf_profile}>
            <div className={styles.names_profile}>
              <div className={styles.name}>{profile.name}</div>
              <div className={styles.username}>
                <div>(@{profile.userName})</div>
                <svg
                  onClick={() =>
                    navigator.clipboard.writeText(profile.userName).then(() => {
                      dispatch({
                        type: ToastActionTypes.SHOW,
                        payload: {
                          message: t("toast.success.copy"),
                          type: "success",
                        },
                      });
                    })
                  }
                  width="19"
                  height="22"
                  viewBox="0 0 19 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 6.8H12.2V2V1.8H12H6H5.8V2V16V16.2H6H17H17.2V16V7V6.8H17ZM2 20.2H12.8V21.8H2C1.50341 21.8 1.08351 21.6257 0.729421 21.2716C0.374593 20.9167 0.2 20.4965 0.2 20V6.2H1.8V20V20.2H2ZM17 17.8H6C5.50341 17.8 5.08351 17.6257 4.72942 17.2716C4.37459 16.9167 4.2 16.4965 4.2 16V2C4.2 1.50352 4.37459 1.08325 4.72942 0.728421C5.08351 0.374332 5.50341 0.2 6 0.2H12.9172L18.8 6.08284V16C18.8 16.4965 18.6257 16.9168 18.2716 17.2716C17.9168 17.6257 17.4965 17.8 17 17.8Z"
                    fill="#0b0303"
                    stroke="#0b0303"
                    strokeWidth="0.4"
                  />
                </svg>
              </div>
            </div>
            {profile.description && (
              <div className={styles.description}>{profile.description}</div>
            )}
          </div>
          <div className={styles.profile_btn}>
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.75"
                y="0.75"
                width="24.5"
                height="24.5"
                rx="8.25"
                stroke="#0B0303"
                strokeWidth="1.5"
              />
              <path
                d="M19 13.75H7C6.59 13.75 6.25 13.41 6.25 13C6.25 12.59 6.59 12.25 7 12.25H19C19.41 12.25 19.75 12.59 19.75 13C19.75 13.41 19.41 13.75 19 13.75Z"
                fill="#0B0303"
              />
              <path
                d="M13 19.75C12.59 19.75 12.25 19.41 12.25 19V7C12.25 6.59 12.59 6.25 13 6.25C13.41 6.25 13.75 6.59 13.75 7V19C13.75 19.41 13.41 19.75 13 19.75Z"
                fill="#0B0303"
              />
            </svg>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5549 1.32227H9.98716C3.56776 1.32227 1 3.89004 1 10.3095V18.0128C1 24.4323 3.56776 27 9.98716 27H17.6904C24.1098 27 26.6776 24.4323 26.6776 18.0128V15.445"
                stroke="#0B0303"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.0259 2.63212L8.90888 12.7492C8.52371 13.1343 8.13855 13.8918 8.06152 14.4439L7.50945 18.3084C7.30403 19.7078 8.29262 20.6836 9.69205 20.491L13.5565 19.9389C14.0958 19.8619 14.8532 19.4767 15.2512 19.0916L25.3682 8.97453C27.1143 7.22844 27.936 5.19989 25.3682 2.63212C22.8005 0.0643395 20.7719 0.886028 19.0259 2.63212Z"
                stroke="#0B0303"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.5752 4.08301C18.0009 5.59474 18.8077 6.97184 19.9182 8.08238C21.0288 9.19292 22.4058 9.99969 23.9176 10.4254"
                stroke="#0B0303"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 14.75C3.48 14.75 2.25 13.52 2.25 12C2.25 10.48 3.48 9.25 5 9.25C6.52 9.25 7.75 10.48 7.75 12C7.75 13.52 6.52 14.75 5 14.75ZM5 10.75C4.66848 10.75 4.35054 10.8817 4.11612 11.1161C3.8817 11.3505 3.75 11.6685 3.75 12C3.75 12.3315 3.8817 12.6495 4.11612 12.8839C4.35054 13.1183 4.66848 13.25 5 13.25C5.33152 13.25 5.64946 13.1183 5.88388 12.8839C6.1183 12.6495 6.25 12.3315 6.25 12C6.25 11.6685 6.1183 11.3505 5.88388 11.1161C5.64946 10.8817 5.33152 10.75 5 10.75ZM19 14.75C17.48 14.75 16.25 13.52 16.25 12C16.25 10.48 17.48 9.25 19 9.25C20.52 9.25 21.75 10.48 21.75 12C21.75 13.52 20.52 14.75 19 14.75ZM19 10.75C18.6685 10.75 18.3505 10.8817 18.1161 11.1161C17.8817 11.3505 17.75 11.6685 17.75 12C17.75 12.3315 17.8817 12.6495 18.1161 12.8839C18.3505 13.1183 18.6685 13.25 19 13.25C19.3315 13.25 19.6495 13.1183 19.8839 12.8839C20.1183 12.6495 20.25 12.3315 20.25 12C20.25 11.6685 20.1183 11.3505 19.8839 11.1161C19.6495 10.8817 19.3315 10.75 19 10.75ZM12 14.75C10.48 14.75 9.25 13.52 9.25 12C9.25 10.48 10.48 9.25 12 9.25C13.52 9.25 14.75 10.48 14.75 12C14.75 13.52 13.52 14.75 12 14.75ZM12 10.75C11.6685 10.75 11.3505 10.8817 11.1161 11.1161C10.8817 11.3505 10.75 11.6685 10.75 12C10.75 12.3315 10.8817 12.6495 11.1161 12.8839C11.3505 13.1183 11.6685 13.25 12 13.25C12.3315 13.25 12.6495 13.1183 12.8839 12.8839C13.1183 12.6495 13.25 12.3315 13.25 12C13.25 11.6685 13.1183 11.3505 12.8839 11.1161C12.6495 10.8817 12.3315 10.75 12 10.75Z"
                fill="#2F2F2F"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.my_profile_data}>
        <div className={styles.selection}>
          <div
            className={selector === 1 ? styles.select : ""}
            onClick={() => setSelector(1)}
          >
            {t("main.u_profile.post")}
          </div>
          <div
            className={selector === 2 ? styles.select : ""}
            onClick={() => setSelector(2)}
          >
            flipers
          </div>
          <div
            className={selector === 3 ? styles.select : ""}
            onClick={() => setSelector(3)}
          >
            {t("main.u_profile.saved")}
          </div>
        </div>

        {profile.createdPost.length === 0 && selector === 1 && (
          <div className={styles.not_find}>
            <div className={styles.nf_question}>?</div>

            <svg
              width="165"
              height="165"
              viewBox="0 0 165 165"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="82.3532"
                cy="82.3532"
                r="79.8826"
                stroke="#2F2F2F"
                strokeOpacity="0.5"
                strokeWidth="4.94119"
              />
              <circle
                cx="110.353"
                cy="52.7058"
                r="13.1765"
                fill="#2F2F2F"
                fillOpacity="0.5"
              />
              <circle
                cx="51.0603"
                cy="52.7058"
                r="13.1765"
                fill="#2F2F2F"
                fillOpacity="0.5"
              />
              <path
                d="M64 119H96.5"
                stroke="#8D8D8D"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <div className={styles.nf_text}>{t("main.u_profile.nf_post")}</div>
          </div>
        )}

        {profile.createdPost.length === 0 && selector === 2 && (
          <div className={styles.not_find}>
            <div className={styles.nf_question}>?</div>

            <svg
              width="165"
              height="165"
              viewBox="0 0 165 165"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="82.3532"
                cy="82.3532"
                r="79.8826"
                stroke="#2F2F2F"
                strokeOpacity="0.5"
                strokeWidth="4.94119"
              />
              <circle
                cx="110.353"
                cy="52.7058"
                r="13.1765"
                fill="#2F2F2F"
                fillOpacity="0.5"
              />
              <circle
                cx="51.0603"
                cy="52.7058"
                r="13.1765"
                fill="#2F2F2F"
                fillOpacity="0.5"
              />
              <path
                d="M64 119H96.5"
                stroke="#8D8D8D"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <div className={styles.nf_text}>
              {t("main.u_profile.nf_fliper")}
            </div>
          </div>
        )}

        {profile.createdPost.length === 0 && selector === 3 && (
          <div className={styles.not_find}>
            <div className={styles.nf_question}>?</div>

            <svg
              width="165"
              height="165"
              viewBox="0 0 165 165"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="82.3532"
                cy="82.3532"
                r="79.8826"
                stroke="#2F2F2F"
                strokeOpacity="0.5"
                strokeWidth="4.94119"
              />
              <circle
                cx="110.353"
                cy="52.7058"
                r="13.1765"
                fill="#2F2F2F"
                fillOpacity="0.5"
              />
              <circle
                cx="51.0603"
                cy="52.7058"
                r="13.1765"
                fill="#2F2F2F"
                fillOpacity="0.5"
              />
              <path
                d="M64 119H96.5"
                stroke="#8D8D8D"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <div className={styles.nf_text}>
              {t("main.u_profile.nf_save_pf")}
            </div>
          </div>
        )}

        {profile.createdPost.length > 0 && selector === 1 && (
          <div className={styles.profile_data_imgs}>
            {profile.createdPost.map((item: CreatedPost) => (
              <img
                className={styles.profile_data_img}
                key={item.id}
                src={`http://localhost:5170/resources/postfiles/default/${item.file[0]}`}
                alt=""
              />
            ))}
          </div>
        )}

        {profile.createdPost.length > 0 && selector === 2 && (
          <div className={styles.profile_data_imgs}>
            {profile.createdPost.map((item: CreatedPost) => (
              <div className={styles.flipers} key={item.id}>
                <img
                  src={`http://localhost:5170/resources/postfiles/default/${item.file[0]}`}
                  alt=""
                />

                <svg
                  width="96"
                  height="96"
                  viewBox="0 0 96 96"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="13.4395"
                    y="14.3999"
                    width="69.12"
                    height="69.12"
                    rx="34.56"
                    fill="#F8F8F8"
                    fillOpacity="0.9"
                  />
                  <path
                    d="M42.2312 67.9639C40.4712 67.9639 38.7912 67.5239 37.3112 66.6839C33.8712 64.6839 31.9512 60.7639 31.9512 55.6439V42.2439C31.9512 37.1239 33.8312 33.2039 37.2712 31.2039C40.7112 29.2039 45.0712 29.5239 49.5112 32.0839L61.1112 38.7639C65.5512 41.3239 67.9912 44.9239 67.9912 48.9239C67.9912 52.8839 65.5512 56.5239 61.1112 59.0839L49.5112 65.7639C47.0312 67.2439 44.5112 67.9639 42.2312 67.9639ZM42.2312 35.8839C41.5112 35.8839 40.8312 36.0439 40.3112 36.3639C38.7912 37.2439 37.9512 39.3639 37.9512 42.2439V55.6439C37.9512 58.4839 38.7912 60.6439 40.3112 61.4839C41.7912 62.3639 44.0712 62.0039 46.5512 60.6039L58.1512 53.9239C60.6312 52.4839 62.0312 50.6839 62.0312 48.9639C62.0312 47.2439 60.5912 45.4439 58.1512 44.0039L46.5512 37.3239C44.9512 36.3639 43.4712 35.8839 42.2312 35.8839Z"
                    fill="url(#paint0_linear_1200_6772)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1200_6772"
                      x1="24.9614"
                      y1="64.1579"
                      x2="68.6232"
                      y2="63.2457"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#48D824" />
                      <stop offset="1" stopColor="#10D0EA" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
