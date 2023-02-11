import styles from "./UProfile.module.scss";
import img from "../../../Assets/Img/monkey-selfie_custom-7117031c832fc3607ee5b26b9d5b03d10a1deaca-s1100-c50.jpg";
import { IUser } from "../../../Interface/Profile";

export const UProfile = (props) => {
  const { profile } = props;

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
        <div className={styles.recomendation}>
          <div className={styles.rec_prof}>
            <div className={styles.rec_border}>
              <img src={img} alt="" />
            </div>
            <div className={styles.rec_text}>Про мене</div>
          </div>
          <div className={styles.rec_prof}>
            <div className={styles.rec_border}>
              <img src={img} alt="" />
            </div>
            <div className={styles.rec_text}>Цікавинки</div>
          </div>
          <div className={styles.rec_prof}>
            <div className={styles.rec_border}>
              <img src={img} alt="" />
            </div>
            <div className={styles.rec_text}>Спогади</div>
          </div>
          <div className={styles.rec_prof}>
            <div className={styles.rec_border}>
              <svg
                width="58"
                height="58"
                viewBox="0 0 58 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M38.6663 30.8125H19.333C18.3422 30.8125 17.5205 29.9908 17.5205 29C17.5205 28.0092 18.3422 27.1875 19.333 27.1875H38.6663C39.6572 27.1875 40.4788 28.0092 40.4788 29C40.4788 29.9908 39.6572 30.8125 38.6663 30.8125Z"
                  fill="url(#paint0_linear_1108_1174)"
                />
                <path
                  d="M29 40.4791C28.0092 40.4791 27.1875 39.6574 27.1875 38.6666V19.3333C27.1875 18.3424 28.0092 17.5208 29 17.5208C29.9908 17.5208 30.8125 18.3424 30.8125 19.3333V38.6666C30.8125 39.6574 29.9908 40.4791 29 40.4791Z"
                  fill="url(#paint1_linear_1108_1174)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1108_1174"
                    x1="13.0678"
                    y1="30.45"
                    x2="40.3606"
                    y2="26.6362"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#48D824" />
                    <stop offset="1" stopColor="#10D0EA" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_1108_1174"
                    x1="26.4844"
                    y1="38.1833"
                    x2="30.8779"
                    y2="38.168"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#48D824" />
                    <stop offset="1" stopColor="#10D0EA" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className={styles.rec_text}>Додати</div>
          </div>
        </div>
      </div>
      <div className={styles.my_profile_data}>
        <div className={styles.selection}>
          <div>дописи</div>
          <div>збережено</div>
        </div>
        <div className={styles.profile_data_imgs}>
          <div className={styles.profile_data_img}></div>
          <div className={styles.profile_data_img}></div>
          <div className={styles.profile_data_img}></div>
          <div className={styles.profile_data_img}></div>
          <div className={styles.profile_data_img}></div>
          <div className={styles.profile_data_img}></div>
        </div>
      </div>
    </>
  );
};
