import { t } from "i18next";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./History.module.scss";
import video from "./video.mp4";

export const History = ({ show, onClick }) => {
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [t] = useTranslation("translation");

  const refVideo = useRef<HTMLVideoElement>(null);

  const handleProgress = () => {
    if (refVideo.current) {
      refVideo.current.addEventListener("timeupdate", () => {
        if (refVideo.current) {
          setProgress(
            (refVideo.current.currentTime / refVideo.current.duration) * 100
          );
        }
      });
    }
  };

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
        <div className={styles.history}>
          <div className={styles.video_zone}>
            <video
              autoPlay
              playsInline
              disablePictureInPicture
              controlsList="nodownload"
              src={video}
              ref={refVideo}
              onProgress={handleProgress}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            ></video>

            <div className={styles.header}></div>

            <div className={styles.progress_bar}>
              <div
                className={styles.progress}
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className={styles.profile}>
              <div className={styles.img}>
                <img
                  src="/Assets/Img/monkey-selfie_custom-7117031c832fc3607ee5b26b9d5b03d10a1deaca-s1100-c50.jpg"
                  alt=""
                />
              </div>
              <div className={styles.name}>Рома Чорт</div>
              <div className={styles.date}>3 год.</div>
            </div>

            <div className={styles.menu}>
              <div className={styles.close} onClick={() => onClick()}>
                <svg
                  width="32"
                  height="31"
                  viewBox="0 0 32 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.87695 3.875L27.127 27.125M3.87695 27.125L27.127 3.875"
                    stroke="#2F2F2F"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <div className={styles.other_menu}>
                <div className={styles.settings}>
                  <svg
                    width="31"
                    height="30"
                    viewBox="0 0 31 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.752 11.5625C25.652 11.5625 27.1895 13.1 27.1895 15C27.1895 16.9 25.652 18.4375 23.752 18.4375C21.852 18.4375 20.3145 16.9 20.3145 15C20.3145 13.1 21.852 11.5625 23.752 11.5625ZM23.752 16.5625C24.1664 16.5625 24.5638 16.3979 24.8568 16.1049C25.1498 15.8118 25.3145 15.4144 25.3145 15C25.3145 14.5856 25.1498 14.1882 24.8568 13.8951C24.5638 13.6021 24.1664 13.4375 23.752 13.4375C23.3376 13.4375 22.9401 13.6021 22.6471 13.8951C22.3541 14.1882 22.1895 14.5856 22.1895 15C22.1895 15.4144 22.3541 15.8118 22.6471 16.1049C22.9401 16.3979 23.3376 16.5625 23.752 16.5625ZM6.25195 11.5625C8.15195 11.5625 9.68945 13.1 9.68945 15C9.68945 16.9 8.15195 18.4375 6.25195 18.4375C4.35195 18.4375 2.81445 16.9 2.81445 15C2.81445 13.1 4.35195 11.5625 6.25195 11.5625ZM6.25195 16.5625C6.66635 16.5625 7.06378 16.3979 7.35681 16.1049C7.64983 15.8118 7.81445 15.4144 7.81445 15C7.81445 14.5856 7.64983 14.1882 7.35681 13.8951C7.06378 13.6021 6.66635 13.4375 6.25195 13.4375C5.83755 13.4375 5.44012 13.6021 5.1471 13.8951C4.85407 14.1882 4.68945 14.5856 4.68945 15C4.68945 15.4144 4.85407 15.8118 5.1471 16.1049C5.44012 16.3979 5.83755 16.5625 6.25195 16.5625ZM15.002 11.5625C16.902 11.5625 18.4395 13.1 18.4395 15C18.4395 16.9 16.902 18.4375 15.002 18.4375C13.102 18.4375 11.5645 16.9 11.5645 15C11.5645 13.1 13.102 11.5625 15.002 11.5625ZM15.002 16.5625C15.4164 16.5625 15.8138 16.3979 16.1068 16.1049C16.3998 15.8118 16.5645 15.4144 16.5645 15C16.5645 14.5856 16.3998 14.1882 16.1068 13.8951C15.8138 13.6021 15.4164 13.4375 15.002 13.4375C14.5876 13.4375 14.1901 13.6021 13.8971 13.8951C13.6041 14.1882 13.4395 14.5856 13.4395 15C13.4395 15.4144 13.6041 15.8118 13.8971 16.1049C14.1901 16.3979 14.5876 16.5625 15.002 16.5625Z"
                      fill="#2F2F2F"
                    />
                  </svg>
                </div>
                <div className={styles.sound} onClick={Muted}>
                  {isMuted ? (
                    <svg
                      width="32"
                      height="31"
                      viewBox="0 0 32 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.212 26.594C15.1916 26.594 14.0679 26.2323 12.9441 25.5219L9.17246 23.1582C8.91413 23.0032 8.61704 22.9127 8.31996 22.9127H6.45996C3.33413 22.9127 1.61621 21.1948 1.61621 18.069V12.9023C1.61621 9.77649 3.33413 8.05857 6.45996 8.05857H8.30704C8.60413 8.05857 8.90121 7.96815 9.15954 7.81315L12.9312 5.4494C14.817 4.27399 16.6512 4.0544 18.0979 4.85524C19.5445 5.65607 20.3325 7.32232 20.3325 9.5569V21.4015C20.3325 23.6232 19.5316 25.3023 18.0979 26.1032C17.5295 26.439 16.8837 26.594 16.212 26.594ZM6.45996 10.009C4.41913 10.009 3.55371 10.8744 3.55371 12.9152V18.0819C3.55371 20.1227 4.41913 20.9882 6.45996 20.9882H8.30704C8.97871 20.9882 9.62454 21.169 10.1929 21.5307L13.9645 23.8944C15.2175 24.6694 16.38 24.8761 17.1679 24.4369C17.9558 23.9977 18.4079 22.8998 18.4079 21.4402V9.56982C18.4079 8.09732 17.9558 6.9994 17.1679 6.57315C16.38 6.13399 15.2045 6.32774 13.9645 7.11565L10.18 9.46649C9.62454 9.82815 8.96579 10.009 8.30704 10.009H6.45996ZM28.4183 19.0016C28.1729 19.0016 27.9275 18.9112 27.7337 18.7174L22.6187 13.6024C22.4385 13.4201 22.3375 13.1741 22.3375 12.9178C22.3375 12.6615 22.4385 12.4155 22.6187 12.2332C22.9933 11.8587 23.6133 11.8587 23.9879 12.2332L29.1029 17.3482C29.4775 17.7228 29.4775 18.3428 29.1029 18.7174C28.9091 18.8982 28.6637 19.0016 28.4183 19.0016Z"
                        fill="#2F2F2F"
                      />
                      <path
                        d="M23.2529 19.0522C23.0075 19.0522 22.7621 18.9618 22.5683 18.768C22.3881 18.5857 22.2871 18.3398 22.2871 18.0835C22.2871 17.8271 22.3881 17.5812 22.5683 17.3989L27.6833 12.2839C28.0579 11.9093 28.6779 11.9093 29.0525 12.2839C29.4271 12.6585 29.4271 13.2784 29.0525 13.653L23.9375 18.768C23.7437 18.9618 23.4983 19.0522 23.2529 19.0522Z"
                        fill="#2F2F2F"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="32"
                      height="31"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 9.99979V13.9998C2 15.9998 3 16.9998 5 16.9998H6.43C6.8 16.9998 7.17 17.1098 7.49 17.2998L10.41 19.1298C12.93 20.7098 15 19.5598 15 16.5898V7.40979C15 4.42979 12.93 3.28979 10.41 4.86979L7.49 6.69979C7.17 6.88979 6.8 6.99979 6.43 6.99979H5C3 6.99979 2 7.99979 2 9.99979Z"
                        stroke="#2F2F2F"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M18 8C18.8665 9.15354 19.335 10.5573 19.335 12C19.335 13.4427 18.8665 14.8465 18 16M19.83 5.5C21.2369 7.37499 21.9975 9.65586 21.9975 12C21.9975 14.3441 21.2369 16.625 19.83 18.5"
                        stroke="#2F2F2F"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <div className={styles.playing} onClick={playOrPause}>
                  {isPlaying ? (
                    <svg
                      className={styles.paused}
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3125 23.8875V6.1125C13.3125 4.425 12.6 3.75 10.8 3.75H6.2625C4.4625 3.75 3.75 4.425 3.75 6.1125V23.8875C3.75 25.575 4.4625 26.25 6.2625 26.25H10.8C12.6 26.25 13.3125 25.575 13.3125 23.8875ZM26.25 23.8875V6.1125C26.25 4.425 25.5375 3.75 23.7375 3.75H19.2C17.4125 3.75 16.6875 4.425 16.6875 6.1125V23.8875C16.6875 25.575 17.4 26.25 19.2 26.25H23.7375C25.5375 26.25 26.25 25.575 26.25 23.8875Z"
                        stroke="#2F2F2F"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="32"
                      height="31"
                      viewBox="0 0 32 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.1677 27.4868C9.14728 27.4868 8.17853 27.2414 7.32603 26.7505C5.31103 25.588 4.2002 23.2243 4.2002 20.1114V10.9018C4.2002 7.77596 5.31103 5.42513 7.32603 4.26263C9.34103 3.10013 11.9373 3.31971 14.6498 4.88263L22.6194 9.48096C25.3189 11.0439 26.8173 13.188 26.8173 15.513C26.8173 17.838 25.3319 19.9822 22.6194 21.5451L14.6498 26.1435C13.0869 27.0347 11.5627 27.4868 10.1677 27.4868ZM10.1677 5.45096C9.4702 5.45096 8.8502 5.60596 8.29478 5.92888C6.89978 6.72971 6.1377 8.49929 6.1377 10.9018V20.0985C6.1377 22.501 6.89978 24.2576 8.29478 25.0714C9.68978 25.8851 11.6014 25.6526 13.681 24.4514L21.6506 19.853C23.7302 18.6518 24.8798 17.1147 24.8798 15.5001C24.8798 13.8855 23.7302 12.3485 21.6506 11.1472L13.681 6.54888C12.4152 5.82555 11.2269 5.45096 10.1677 5.45096Z"
                        fill="#2F2F2F"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.left_btn}>
              <svg
                width="55"
                height="50"
                viewBox="0 0 55 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M34.8024 7.59462C35.2281 7.59462 35.6538 7.73728 35.9898 8.04299C36.3023 8.33064 36.4775 8.71874 36.4775 9.12315C36.4775 9.52757 36.3023 9.91567 35.9898 10.2033L21.3826 23.4914C20.3072 24.4696 20.3072 26.0593 21.3826 27.0376L35.9898 40.3256C36.3023 40.6132 36.4775 41.0014 36.4775 41.4058C36.4775 41.8102 36.3023 42.1983 35.9898 42.4859C35.3401 43.077 34.2647 43.077 33.615 42.4859L19.0078 29.1979C17.8652 28.1585 17.2155 26.7522 17.2155 25.2645C17.2155 23.7767 17.8428 22.3704 19.0078 21.331L33.615 8.04299C33.9511 7.75766 34.3767 7.59462 34.8024 7.59462Z"
                  fill="#F5F5F5"
                  fillOpacity="0.6"
                />
              </svg>
            </div>

            <div className={styles.right_btn}>
              <svg
                width="54"
                height="50"
                viewBox="0 0 54 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.1908 42.7242C19.7651 42.7242 19.3394 42.5816 19.0034 42.2759C18.6909 41.9882 18.5156 41.6001 18.5156 41.1957C18.5156 40.7913 18.6909 40.4032 19.0034 40.1155L33.6106 26.8275C34.6859 25.8492 34.6859 24.2596 33.6106 23.2813L19.0034 9.99325C18.6909 9.7056 18.5156 9.3175 18.5156 8.91309C18.5156 8.50868 18.6909 8.12057 19.0034 7.83292C19.6531 7.24189 20.7284 7.24189 21.3781 7.83292L35.9854 21.121C37.1279 22.1604 37.7776 23.5666 37.7776 25.0544C37.7776 26.5422 37.1503 27.9484 35.9854 28.9878L21.3781 42.2759C21.0421 42.5612 20.6164 42.7242 20.1908 42.7242Z"
                  fill="#F5F5F5"
                  fillOpacity="0.6"
                />
              </svg>
            </div>

            <div className={styles.send_message}>
              <input
                type="text"
                placeholder={t("main.history.btn_msg_send").toString()}
              />

              <svg
                className={styles.like}
                width="32"
                height="31"
                viewBox="0 0 32 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5016 27.9673C15.1012 27.9673 14.7137 27.9157 14.3908 27.7994C9.45663 26.1073 1.61621 20.1011 1.61621 11.2273C1.61621 6.70649 5.27163 3.03816 9.76663 3.03816C11.9495 3.03816 13.9904 3.89066 15.5016 5.41482C16.2519 4.65773 17.1454 4.05764 18.1301 3.64959C19.1147 3.24153 20.1708 3.03368 21.2366 3.03816C25.7316 3.03816 29.387 6.71941 29.387 11.2273C29.387 20.114 21.5466 26.1073 16.6125 27.7994C16.2895 27.9157 15.902 27.9673 15.5016 27.9673ZM9.76663 4.97566C6.34371 4.97566 3.55371 7.77857 3.55371 11.2273C3.55371 20.0494 12.04 24.9577 15.0237 25.9782C15.2562 26.0557 15.76 26.0557 15.9925 25.9782C18.9633 24.9577 27.4625 20.0623 27.4625 11.2273C27.4625 7.77857 24.6725 4.97566 21.2495 4.97566C19.2862 4.97566 17.465 5.89274 16.2895 7.48149C15.9279 7.97232 15.1012 7.97232 14.7395 7.48149C14.1656 6.70271 13.4163 6.07005 12.5523 5.6347C11.6884 5.19936 10.7341 4.97359 9.76663 4.97566Z"
                  fill="#2F2F2F"
                />
              </svg>

              <svg
                className={styles.send}
                width="32"
                height="31"
                viewBox="0 0 32 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.96 27.4481H9.04329C4.32871 27.4481 1.61621 24.7356 1.61621 20.021V10.9793C1.61621 6.26475 4.32871 3.55225 9.04329 3.55225H21.96C26.6745 3.55225 29.387 6.26475 29.387 10.9793V20.021C29.387 24.7356 26.6745 27.4481 21.96 27.4481ZM9.04329 5.48975C5.34913 5.48975 3.55371 7.28516 3.55371 10.9793V20.021C3.55371 23.7152 5.34913 25.5106 9.04329 25.5106H21.96C25.6541 25.5106 27.4495 23.7152 27.4495 20.021V10.9793C27.4495 7.28516 25.6541 5.48975 21.96 5.48975H9.04329Z"
                  fill="#2F2F2F"
                />
                <path
                  d="M15.5007 16.621C14.4157 16.621 13.3178 16.2852 12.4782 15.6006L8.43526 12.3714C8.24725 12.2082 8.12953 11.9787 8.10663 11.7308C8.08374 11.4828 8.15744 11.2356 8.31237 11.0407C8.4673 10.8458 8.69149 10.7182 8.93819 10.6846C9.18489 10.651 9.43506 10.7139 9.63651 10.8602L13.6794 14.0894C14.6611 14.8773 16.3273 14.8773 17.309 14.0894L21.3519 10.8602C21.7653 10.5244 22.3853 10.5889 22.7082 11.0152C23.044 11.4285 22.9794 12.0485 22.5532 12.3714L18.5103 15.6006C17.6836 16.2852 16.5857 16.621 15.5007 16.621Z"
                  fill="#2F2F2F"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
