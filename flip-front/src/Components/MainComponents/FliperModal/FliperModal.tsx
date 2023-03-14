import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FliperMenu } from "../FliperMenu/FliperMenu";
import styles from "./FliperModal.module.scss";
import video from "./video.mp4";

export const FliperModal = ({ show, onClick }) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const refVideo = useRef<HTMLVideoElement>(null);

  const [t] = useTranslation("translation");

  useEffect(() => {
    setIsMuted(true);
    if (refVideo.current) refVideo.current.volume = 0;
  }, [show]);

  const Muted = () => {
    if (refVideo.current) {
      if (isMuted) refVideo.current.volume = 1;
      else refVideo.current.volume = 0;
    }

    setIsMuted(!isMuted);
  };

  const playOrPause = () => {
    if (refVideo.current) {
      if (refVideo.current.paused) refVideo.current.play();
      else refVideo.current.pause();
    }
  };

  return (
    <>
      {show && (
        <div className={styles.fliper}>
          <svg
            className={styles.btn_back}
            width="51"
            height="48"
            viewBox="0 0 51 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32.0674 6.65997C32.4711 6.65997 32.8749 6.79996 33.1936 7.09996C33.49 7.38224 33.6563 7.7631 33.6563 8.15997C33.6563 8.55683 33.49 8.93769 33.1936 9.21997L19.3386 22.26C18.3186 23.22 18.3186 24.78 19.3386 25.74L33.1936 38.78C33.49 39.0622 33.6562 39.4431 33.6562 39.84C33.6562 40.2368 33.49 40.6177 33.1936 40.9C32.5774 41.48 31.5574 41.48 30.9411 40.9L17.0861 27.86C16.0024 26.84 15.3861 25.46 15.3861 24C15.3861 22.54 15.9811 21.16 17.0861 20.14L30.9411 7.09996C31.2599 6.81997 31.6636 6.65997 32.0674 6.65997Z"
              fill="#2F2F2F"
              fillOpacity="0.6"
            />
          </svg>

          {video ? (
            <>
              <div className={styles.video_player}>
                <video
                  className={styles.video}
                  src={video}
                  autoPlay
                  loop
                  playsInline
                  disablePictureInPicture
                  ref={refVideo}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                <div className={styles.icon_pause} onClick={playOrPause}>
                  {isPlaying ? (
                    <svg
                      className={`${
                        isPlaying
                          ? styles.paused_hiddent
                          : styles.paused_visible
                      }`}
                      width="119"
                      height="120"
                      viewBox="0 0 119 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="16.6602"
                        y="18"
                        width="85.68"
                        height="86.4"
                        rx="42.84"
                        fill="#F8F8F8"
                        fillOpacity="0.9"
                      />
                      <path
                        d="M56.8431 74.1071V45.8928C56.8431 43.2143 55.7216 42.1428 52.8882 42.1428H45.7459C42.9125 42.1428 41.791 43.2143 41.791 45.8928V74.1071C41.791 76.7857 42.9125 77.8571 45.7459 77.8571H52.8882C55.7216 77.8571 56.8431 76.7857 56.8431 74.1071ZM77.2077 74.1071V45.8928C77.2077 43.2143 76.0862 42.1428 73.2528 42.1428H66.1105C63.2968 42.1428 62.1556 43.2143 62.1556 45.8928V74.1071C62.1556 76.7857 63.2771 77.8571 66.1105 77.8571H73.2528C76.0862 77.8571 77.2077 76.7857 77.2077 74.1071Z"
                        stroke="url(#paint0_linear_1463_7178)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_1463_7178"
                          x1="34.9221"
                          y1="74.2857"
                          x2="77.8269"
                          y2="73.3469"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#48D824" />
                          <stop offset="1" stopColor="#10D0EA" />
                        </linearGradient>
                      </defs>
                    </svg>
                  ) : (
                    <svg
                      width="119"
                      height="120"
                      viewBox="0 0 119 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="16.6602"
                        y="18"
                        width="85.68"
                        height="86.4"
                        rx="42.84"
                        fill="#F8F8F8"
                        fillOpacity="0.9"
                      />
                      <path
                        d="M52.3503 84.9548C50.1687 84.9548 48.0862 84.4048 46.2516 83.3548C41.9874 80.8548 39.6074 75.9549 39.6074 69.5549V52.8048C39.6074 46.4048 41.9378 41.5048 46.202 39.0048C50.4662 36.5048 55.8708 36.9048 61.3745 40.1048L75.7537 48.4548C81.2574 51.6548 84.282 56.1548 84.282 61.1548C84.282 66.1048 81.2574 70.6548 75.7537 73.8548L61.3745 82.2048C58.3003 84.0548 55.1766 84.9548 52.3503 84.9548ZM52.3503 44.8548C51.4578 44.8548 50.6149 45.0548 49.9703 45.4548C48.0862 46.5548 47.0449 49.2048 47.0449 52.8048V69.5549C47.0449 73.1049 48.0862 75.8049 49.9703 76.8549C51.8049 77.9549 54.6312 77.5048 57.7053 75.7548L72.0845 67.4048C75.1587 65.6048 76.8941 63.3549 76.8941 61.2049C76.8941 59.0549 75.1091 56.8049 72.0845 55.0049L57.7053 46.6549C55.722 45.4549 53.8874 44.8548 52.3503 44.8548Z"
                        fill="url(#paint0_linear_785_3941)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_785_3941"
                          x1="30.943"
                          y1="80.1974"
                          x2="85.0658"
                          y2="79.076"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#48D824" />
                          <stop offset="1" stopColor="#10D0EA" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}
                </div>

                {isMuted ? (
                  <svg
                    onClick={Muted}
                    className={styles.soung}
                    width="32"
                    height="30"
                    viewBox="0 0 32 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.22879 21.7629H6.59181C3.40105 21.7629 1.64746 20.1322 1.64746 17.1651V12.2608C1.64746 9.2937 3.40105 7.66302 6.59181 7.66302H8.47725C8.7805 7.66302 9.08375 7.5772 9.34745 7.43007L13.1974 5.18635C15.1224 4.07062 16.9947 3.86219 18.4714 4.62236C19.9481 5.38252 20.7524 6.96416 20.7524 9.08527V10.2623C20.7524 10.765 20.3041 11.1819 19.7635 11.1819C19.223 11.1819 18.7747 10.765 18.7747 10.2623V9.08527C18.7747 7.68754 18.3132 6.64538 17.5089 6.24078C16.7046 5.82391 15.518 6.00782 14.2391 6.75573L10.3891 8.98718C9.82211 9.33048 9.14968 9.50213 8.47725 9.50213H6.59181C4.50859 9.50213 3.6252 10.3236 3.6252 12.2608V17.1651C3.6252 19.1023 4.50859 19.9238 6.59181 19.9238H9.22879C9.76937 19.9238 10.2177 20.3406 10.2177 20.8433C10.2177 21.346 9.76937 21.7629 9.22879 21.7629ZM16.5491 25.2449C15.5074 25.2449 14.3604 24.9016 13.2133 24.2273C12.9912 24.0988 12.8331 23.8936 12.7738 23.6568C12.7144 23.42 12.7587 23.1709 12.8968 22.9644C13.035 22.7579 13.2556 22.6109 13.5103 22.5558C13.765 22.5006 14.0328 22.5417 14.2549 22.6702C15.5338 23.4058 16.7205 23.602 17.5247 23.1851C18.329 22.7683 18.7905 21.7261 18.7905 20.3406V15.8777C18.7905 15.375 19.2388 14.9582 19.7794 14.9582C20.3199 14.9582 20.7682 15.375 20.7682 15.8777V20.3406C20.7682 22.4495 19.9508 24.0434 18.4872 24.8035C17.8939 25.0978 17.2347 25.2449 16.5491 25.2449ZM23.7322 20.5368C23.5486 20.5368 23.3685 20.4892 23.2123 20.3995C23.0561 20.3097 22.9299 20.1812 22.8477 20.0285C22.7656 19.8757 22.7308 19.7047 22.7473 19.5347C22.7638 19.3646 22.8309 19.2021 22.9411 19.0655C23.7561 18.0522 24.2725 16.8586 24.439 15.6027C24.6055 14.3468 24.4164 13.0723 23.8904 11.9052C23.7896 11.6808 23.7884 11.4284 23.8873 11.2032C23.9861 10.978 24.1769 10.7984 24.4178 10.7037C24.9188 10.5075 25.499 10.7282 25.7099 11.1941C27.0548 14.1612 26.5933 17.6065 24.5233 20.1812C24.3255 20.4142 24.0355 20.5368 23.7322 20.5368Z"
                      fill="#2F2F2F"
                    />
                    <path
                      d="M26.1439 23.6019C25.9603 23.6019 25.7803 23.5544 25.624 23.4646C25.4678 23.3748 25.3416 23.2463 25.2594 23.0936C25.1773 22.9408 25.1425 22.7699 25.159 22.5998C25.1755 22.4297 25.2426 22.2672 25.3528 22.1306C28.1744 18.6363 28.7941 13.9527 26.9746 9.91892C26.8737 9.6945 26.8726 9.44206 26.9714 9.21687C27.0703 8.99167 27.261 8.81207 27.502 8.71737C28.0162 8.5212 28.5831 8.74189 28.7941 9.2078C30.8905 13.8424 30.1785 19.2126 26.935 23.2341C26.7504 23.4793 26.4472 23.6019 26.1439 23.6019ZM2.63916 27.8944C2.38865 27.8944 2.13813 27.8086 1.94036 27.6247C1.75645 27.4516 1.65332 27.2181 1.65332 26.9748C1.65332 26.7315 1.75645 26.4981 1.94036 26.325L28.3102 1.80354C28.6926 1.44797 29.3254 1.44797 29.7078 1.80354C30.0902 2.1591 30.0902 2.74761 29.7078 3.10317L3.33796 27.6247C3.14019 27.8086 2.88967 27.8944 2.63916 27.8944Z"
                      fill="#2F2F2F"
                    />
                  </svg>
                ) : (
                  <svg
                    onClick={Muted}
                    className={styles.soung}
                    width="32"
                    height="30"
                    viewBox="0 0 32 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.63672 12.2609V17.1651C2.63672 19.6173 3.95521 20.8434 6.59219 20.8434H8.47764C8.96548 20.8434 9.45332 20.9782 9.87524 21.2112L13.7252 23.4549C17.0478 25.3921 19.7771 23.9821 19.7771 20.3407V9.08532C19.7771 5.43162 17.0478 4.03389 13.7252 5.97109L9.87524 8.21481C9.45332 8.44776 8.96548 8.58263 8.47764 8.58263H6.59219C3.95521 8.58263 2.63672 9.8087 2.63672 12.2609Z"
                      stroke="#2F2F2F"
                      strokeWidth="1.61307"
                    />
                    <path
                      d="M23.7324 9.80859C24.8749 11.2229 25.4926 12.944 25.4926 14.7129C25.4926 16.4818 24.8749 18.2029 23.7324 19.6172M26.1453 6.74341C28.0003 9.04229 29.0031 11.8388 29.0031 14.7129C29.0031 17.587 28.0003 20.3835 26.1453 22.6824"
                      stroke="#2F2F2F"
                      strokeWidth="1.61307"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}

                <svg
                  className={styles.closed}
                  onClick={onClick}
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.875 3.875L27.125 27.125M3.875 27.125L27.125 3.875"
                    stroke="#2F2F2F"
                    strokeWidth="2"
                  />
                </svg>

                <div className={styles.information}>
                  <div className={styles.profile}>
                    <div className={styles.image_profile}>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/Assets/Img/monkey-selfie_custom-7117031c832fc3607ee5b26b9d5b03d10a1deaca-s1100-c50.jpg"
                        }
                        alt=""
                      />
                    </div>
                    <div className={styles.name_profile}>Влад Тощий</div>
                    <button className={styles.follow_profile}>
                      {t("main.fliper.btn_follow")}
                    </button>
                  </div>
                  <div className={styles.description}>
                    Неважливо, як повільно ти просувається. Головне – ти не
                    зупиняєшся. Брюс Лі
                  </div>
                </div>

                <div className={styles.menu}>
                  <div className={styles.menu_btn}>
                    <svg
                      width="31"
                      height="31"
                      viewBox="0 0 31 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.4746 27.6392C15.0871 27.6392 14.7121 27.5892 14.3996 27.4767C9.62461 25.8392 2.03711 20.0267 2.03711 11.4392C2.03711 7.06423 5.57461 3.51423 9.92461 3.51423C12.0371 3.51423 14.0121 4.33923 15.4746 5.81423C16.2007 5.08156 17.0653 4.50083 18.0182 4.10594C18.9711 3.71104 19.9931 3.50989 21.0246 3.51423C25.3746 3.51423 28.9121 7.07673 28.9121 11.4392C28.9121 20.0392 21.3246 25.8392 16.5496 27.4767C16.2371 27.5892 15.8621 27.6392 15.4746 27.6392ZM9.92461 5.38923C6.61211 5.38923 3.91211 8.10173 3.91211 11.4392C3.91211 19.9767 12.1246 24.7267 15.0121 25.7142C15.2371 25.7892 15.7246 25.7892 15.9496 25.7142C18.8246 24.7267 27.0496 19.9892 27.0496 11.4392C27.0496 8.10173 24.3496 5.38923 21.0371 5.38923C19.1371 5.38923 17.3746 6.27673 16.2371 7.81423C15.8871 8.28923 15.0871 8.28923 14.7371 7.81423C14.1817 7.06058 13.4565 6.44831 12.6205 6.02702C11.7844 5.60572 10.8608 5.38723 9.92461 5.38923Z"
                        fill="#FF0000"
                      />
                      <ellipse
                        cx="9.66825"
                        cy="10.2515"
                        rx="6.29032"
                        ry="5.80645"
                        fill="#FF0000"
                      />
                      <ellipse
                        cx="9.66825"
                        cy="13.1548"
                        rx="6.29032"
                        ry="5.80645"
                        fill="#FF0000"
                      />
                      <ellipse
                        cx="19.346"
                        cy="10.2515"
                        rx="6.29032"
                        ry="5.80645"
                        fill="#FF0000"
                      />
                      <ellipse
                        cx="22.2483"
                        cy="11.7031"
                        rx="6.29032"
                        ry="7.25806"
                        fill="#FF0000"
                      />
                      <ellipse
                        cx="15.4749"
                        cy="18.4773"
                        rx="6.29032"
                        ry="7.25806"
                        fill="#FF0000"
                      />
                      <ellipse
                        cx="19.346"
                        cy="17.5095"
                        rx="6.29032"
                        ry="7.25806"
                        fill="#FF0000"
                      />
                      <ellipse
                        cx="12.0877"
                        cy="16.0581"
                        rx="6.77419"
                        ry="7.74193"
                        fill="#FF0000"
                      />
                    </svg>
                    <div>58</div>
                  </div>
                  <div className={styles.menu_btn}>
                    <svg
                      width="31"
                      height="31"
                      viewBox="0 0 31 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.4746 28.8958C14.6121 28.8958 13.7996 28.4583 13.2246 27.6958L11.3496 25.1958C11.2775 25.1347 11.1918 25.0918 11.0996 25.0708H10.4746C5.26211 25.0708 2.03711 23.6583 2.03711 16.6333V10.3833C2.03711 4.8583 4.94961 1.9458 10.4746 1.9458H20.4746C25.9996 1.9458 28.9121 4.8583 28.9121 10.3833V16.6333C28.9121 22.1583 25.9996 25.0708 20.4746 25.0708H19.8496C19.7496 25.0708 19.6621 25.1208 19.5996 25.1958L17.7246 27.6958C17.1496 28.4583 16.3371 28.8958 15.4746 28.8958ZM10.4746 3.8208C5.99961 3.8208 3.91211 5.9083 3.91211 10.3833V16.6333C3.91211 22.2833 5.84961 23.1958 10.4746 23.1958H11.0996C11.7371 23.1958 12.4621 23.5583 12.8496 24.0708L14.7246 26.5708C15.1621 27.1458 15.7871 27.1458 16.2246 26.5708L18.0996 24.0708C18.5121 23.5208 19.1621 23.1958 19.8496 23.1958H20.4746C24.9496 23.1958 27.0371 21.1083 27.0371 16.6333V10.3833C27.0371 5.9083 24.9496 3.8208 20.4746 3.8208H10.4746Z"
                        fill="#2F2F2F"
                      />
                      <path
                        d="M15.4746 15.3833C14.7746 15.3833 14.2246 14.8208 14.2246 14.1333C14.2246 13.4458 14.7871 12.8833 15.4746 12.8833C16.1621 12.8833 16.7246 13.4458 16.7246 14.1333C16.7246 14.8208 16.1746 15.3833 15.4746 15.3833ZM20.4746 15.3833C19.7746 15.3833 19.2246 14.8208 19.2246 14.1333C19.2246 13.4458 19.7871 12.8833 20.4746 12.8833C21.1621 12.8833 21.7246 13.4458 21.7246 14.1333C21.7246 14.8208 21.1746 15.3833 20.4746 15.3833ZM10.4746 15.3833C9.77461 15.3833 9.22461 14.8208 9.22461 14.1333C9.22461 13.4458 9.78711 12.8833 10.4746 12.8833C11.1621 12.8833 11.7246 13.4458 11.7246 14.1333C11.7246 14.8208 11.1746 15.3833 10.4746 15.3833Z"
                        fill="#2F2F2F"
                      />
                    </svg>
                    <div>15</div>
                  </div>
                  <svg
                    className={styles.menu_btn}
                    width="31"
                    height="31"
                    viewBox="0 0 31 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.5996 15.043H12.3496C11.8371 15.043 11.4121 14.618 11.4121 14.1055C11.4121 13.593 11.8371 13.168 12.3496 13.168H18.5996C19.1121 13.168 19.5371 13.593 19.5371 14.1055C19.5371 14.618 19.1121 15.043 18.5996 15.043Z"
                      fill="#2F2F2F"
                    />
                    <path
                      d="M15.4746 18.2456C14.9621 18.2456 14.5371 17.8206 14.5371 17.3081V11.0581C14.5371 10.5456 14.9621 10.1206 15.4746 10.1206C15.9871 10.1206 16.4121 10.5456 16.4121 11.0581V17.3081C16.4121 17.8206 15.9871 18.2456 15.4746 18.2456Z"
                      fill="#2F2F2F"
                    />
                    <path
                      d="M24.3125 29.2329C23.675 29.2329 22.975 29.0454 22.3 28.6579L16.2 25.2704C15.8375 25.0704 15.125 25.0704 14.7625 25.2704L8.6625 28.6579C7.425 29.3454 6.1625 29.4204 5.2 28.8454C4.2375 28.2829 3.6875 27.1454 3.6875 25.7329V8.12041C3.6875 4.94541 6.275 2.35791 9.45 2.35791H21.5125C24.6875 2.35791 27.275 4.94541 27.275 8.12041V25.7329C27.275 27.1454 26.725 28.2829 25.7625 28.8454C25.325 29.1079 24.825 29.2329 24.3125 29.2329ZM15.475 23.2454C16.0625 23.2454 16.6375 23.3704 17.1 23.6329L23.2 27.0204C23.8375 27.3829 24.425 27.4579 24.8 27.2329C25.175 27.0079 25.3875 26.4704 25.3875 25.7329V8.12041C25.3875 5.98291 23.6375 4.23291 21.5 4.23291H9.45C8.41998 4.23621 7.4331 4.64684 6.70476 5.37517C5.97643 6.10351 5.5658 7.0904 5.5625 8.12041V25.7329C5.5625 26.4704 5.775 27.0204 6.15 27.2329C6.525 27.4454 7.1125 27.3829 7.75 27.0204L13.85 23.6329C14.3125 23.3704 14.8875 23.2454 15.475 23.2454Z"
                      fill="#2F2F2F"
                    />
                  </svg>
                  <svg
                    onClick={() => setShowMenu(!showMenu)}
                    className={styles.menu_btn}
                    width="31"
                    height="31"
                    viewBox="0 0 31 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.9121 24.5605C18.9121 26.4605 17.3746 27.998 15.4746 27.998C13.5746 27.998 12.0371 26.4605 12.0371 24.5605C12.0371 22.6605 13.5746 21.123 15.4746 21.123C17.3746 21.123 18.9121 22.6605 18.9121 24.5605ZM13.9121 24.5605C13.9121 24.9749 14.0767 25.3724 14.3698 25.6654C14.6628 25.9584 15.0602 26.123 15.4746 26.123C15.889 26.123 16.2864 25.9584 16.5795 25.6654C16.8725 25.3724 17.0371 24.9749 17.0371 24.5605C17.0371 24.1461 16.8725 23.7487 16.5795 23.4557C16.2864 23.1627 15.889 22.998 15.4746 22.998C15.0602 22.998 14.6628 23.1627 14.3698 23.4557C14.0767 23.7487 13.9121 24.1461 13.9121 24.5605ZM18.9121 7.06055C18.9121 8.96055 17.3746 10.498 15.4746 10.498C13.5746 10.498 12.0371 8.96055 12.0371 7.06055C12.0371 5.16055 13.5746 3.62305 15.4746 3.62305C17.3746 3.62305 18.9121 5.16055 18.9121 7.06055ZM13.9121 7.06055C13.9121 7.47495 14.0767 7.87238 14.3698 8.1654C14.6628 8.45843 15.0602 8.62305 15.4746 8.62305C15.889 8.62305 16.2864 8.45843 16.5795 8.1654C16.8725 7.87238 17.0371 7.47495 17.0371 7.06055C17.0371 6.64615 16.8725 6.24872 16.5795 5.95569C16.2864 5.66267 15.889 5.49805 15.4746 5.49805C15.0602 5.49805 14.6628 5.66267 14.3698 5.95569C14.0767 6.24872 13.9121 6.64615 13.9121 7.06055ZM18.9121 15.8105C18.9121 17.7105 17.3746 19.248 15.4746 19.248C13.5746 19.248 12.0371 17.7105 12.0371 15.8105C12.0371 13.9105 13.5746 12.373 15.4746 12.373C17.3746 12.373 18.9121 13.9105 18.9121 15.8105ZM13.9121 15.8105C13.9121 16.2249 14.0767 16.6224 14.3698 16.9154C14.6628 17.2084 15.0602 17.373 15.4746 17.373C15.889 17.373 16.2864 17.2084 16.5795 16.9154C16.8725 16.6224 17.0371 16.2249 17.0371 15.8105C17.0371 15.3961 16.8725 14.9987 16.5795 14.7057C16.2864 14.4127 15.889 14.248 15.4746 14.248C15.0602 14.248 14.6628 14.4127 14.3698 14.7057C14.0767 14.9987 13.9121 15.3961 13.9121 15.8105Z"
                      fill="#2F2F2F"
                    />
                  </svg>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.fliper_nf}>
              <svg
                width="148"
                height="148"
                viewBox="0 0 148 148"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="74"
                  cy="74"
                  r="71.5"
                  stroke="#2F2F2F"
                  strokeWidth="5"
                />
                <circle cx="47" cy="50" r="10" fill="#2F2F2F" />
                <circle cx="101" cy="50" r="10" fill="#2F2F2F" />
                <path
                  d="M102 119.5C102 115.757 101.263 112.051 99.8306 108.594C98.3983 105.136 96.299 101.994 93.6525 99.3475C91.0061 96.701 87.8643 94.6017 84.4065 93.1694C80.9487 91.7372 77.2427 91 73.5 91C69.7573 91 66.0513 91.7372 62.5935 93.1694C59.1357 94.6017 55.9939 96.701 53.3475 99.3475C50.701 101.994 48.6017 105.136 47.1694 108.594C45.7372 112.051 45 115.757 45 119.5H48.0729C48.0729 116.161 48.7306 112.854 50.0084 109.769C51.2863 106.685 53.1592 103.881 55.5203 101.52C57.8814 99.1592 60.6845 97.2863 63.7695 96.0084C66.8544 94.7306 70.1609 94.0729 73.5 94.0729C76.8391 94.0729 80.1456 94.7306 83.2305 96.0084C86.3155 97.2863 89.1185 99.1592 91.4797 101.52C93.8408 103.881 95.7137 106.685 96.9916 109.769C98.2694 112.854 98.9271 116.161 98.9271 119.5H102Z"
                  fill="#2F2F2F"
                />
              </svg>

              <div className={styles.nf_text}>{t("main.fliper.nf_text")}</div>

              <svg
                className={styles.nf_btn}
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2.01923"
                  y="2.01923"
                  width="65.9615"
                  height="65.9615"
                  rx="22.2115"
                  stroke="#2F2F2F"
                  strokeWidth="4.03846"
                />
                <path
                  d="M51.1541 37.0194H18.8464C17.7425 37.0194 16.8271 36.104 16.8271 35.0002C16.8271 33.8963 17.7425 32.981 18.8464 32.981H51.1541C52.2579 32.981 53.1733 33.8963 53.1733 35.0002C53.1733 36.104 52.2579 37.0194 51.1541 37.0194Z"
                  fill="#2F2F2F"
                />
                <path
                  d="M35.0002 53.1733C33.8963 53.1733 32.981 52.2579 32.981 51.1541V18.8464C32.981 17.7425 33.8963 16.8271 35.0002 16.8271C36.104 16.8271 37.0194 17.7425 37.0194 18.8464V51.1541C37.0194 52.2579 36.104 53.1733 35.0002 53.1733Z"
                  fill="#2F2F2F"
                />
              </svg>
            </div>
          )}

          <svg
            className={styles.btn_next}
            width="51"
            height="48"
            viewBox="0 0 51 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.9326 6.65997C18.5289 6.65997 18.1251 6.79996 17.8064 7.09996C17.51 7.38224 17.3437 7.7631 17.3437 8.15997C17.3437 8.55683 17.51 8.93769 17.8064 9.21997L31.6614 22.26C32.6814 23.22 32.6814 24.78 31.6614 25.74L17.8064 38.78C17.51 39.0622 17.3438 39.4431 17.3438 39.84C17.3438 40.2368 17.51 40.6177 17.8064 40.9C18.4226 41.48 19.4426 41.48 20.0589 40.9L33.9139 27.86C34.9976 26.84 35.6139 25.46 35.6139 24C35.6139 22.54 35.0189 21.16 33.9139 20.14L20.0589 7.09996C19.7401 6.81997 19.3364 6.65997 18.9326 6.65997Z"
              fill="#2F2F2F"
              fillOpacity="0.6"
            />
          </svg>

          <FliperMenu show={showMenu} onClick={() => setShowMenu(false)} />
        </div>
      )}
    </>
  );
};
