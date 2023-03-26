import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import styles from "./PostCreater.module.scss";

export const PostCreater = ({ show, onClick }) => {
  const myUser = useTypedSelector((state) => state.auth.user);

  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<any>(null);

  const [currentValue, setCurrentValue] = useState<string>("");
  const [selectFiles, setSelectFiles] = useState<any>(null);
  const [preview, setPreview] = useState<any>();

  useEffect(() => {
    setSelectFiles(null);
    setPreview(null);
  }, []);

  useEffect(() => {
    if (!selectFiles) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectFiles);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectFiles]);

  useEffect(() => {
    if (textAreaRef.current) {
      if (textAreaRef.current.scrollHeight > 102) return;

      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [currentValue]);

  const handleClick = () => {
    if (hiddenFileInput.current !== null) {
      hiddenFileInput.current.click();
    }
  };

  const addPost = async () => {
    const res = await axios.post(
      "post/add-post",
      {
        description: currentValue,
        files: selectFiles,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res;
  };

  const { mutateAsync } = useMutation(addPost, {
    onSuccess: () => {
      onClick();
    },
  });

  return (
    <>
      {show && (
        <div className={styles.post_creater}>
          {preview ? (
            <div className={styles.container_post}>
              <div className={styles.top}>
                <div onClick={onClick} className={styles.back}>
                  Відмінити
                </div>
                <div className={styles.header_create}>Створення публікації</div>
                <div
                  onClick={async () => await mutateAsync()}
                  className={styles.post}
                >
                  Опублікувати
                </div>
              </div>
              <div className={styles.image}>
                <img src={preview} alt="" />
                <img src={preview} alt="" />
              </div>
              <div className={styles.bottom}>
                <div className={styles.one}>
                  <div className={styles.profile}>
                    {myUser?.userImage ? (
                      <img
                        src={`${process.env.REACT_APP_BASE_RESOURCES}UserImages/${myUser.id}/${myUser.userImage}`}
                        alt=""
                      />
                    ) : (
                      <svg
                        width="67"
                        height="67"
                        viewBox="0 0 209 209"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="104.5"
                          cy="104.5"
                          r="102.029"
                          fill="url(#paint0_linear_1675_10359)"
                          fillOpacity="0.5"
                          stroke="#2F2F2F"
                          strokeWidth="4.94119"
                        />
                        <path
                          d="M77.3984 78.5C77.3984 85.4036 71.802 91 64.8984 91C57.9949 91 52.3984 85.4036 52.3984 78.5C52.3984 71.5964 57.9949 66 64.8984 66C71.802 66 77.3984 71.5964 77.3984 78.5Z"
                          fill="#2F2F2F"
                        />
                        <path
                          d="M157.398 78.5C157.398 85.4036 151.802 91 144.898 91C137.995 91 132.398 85.4036 132.398 78.5C132.398 71.5964 137.995 66 144.898 66C151.802 66 157.398 71.5964 157.398 78.5Z"
                          fill="#2F2F2F"
                        />
                        <path
                          d="M84.8984 146H124.898"
                          stroke="#2F2F2F"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_1675_10359"
                            x1="-40.5348"
                            y1="188.1"
                            x2="212.652"
                            y2="182.514"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#48D824" />
                            <stop offset="1" stopColor="#10D0EA" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                    <div className={styles.name}>{myUser?.name}</div>
                    <div className={styles.location}>
                      <input
                        type="text"
                        placeholder="Додати місцезнаходження"
                      />
                      <svg
                        width="16"
                        height="20"
                        viewBox="0 0 16 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 10C8.55 10 9.021 9.804 9.413 9.412C9.80433 9.02067 10 8.55 10 8C10 7.45 9.80433 6.979 9.413 6.587C9.021 6.19567 8.55 6 8 6C7.45 6 6.97933 6.19567 6.588 6.587C6.196 6.979 6 7.45 6 8C6 8.55 6.196 9.02067 6.588 9.412C6.97933 9.804 7.45 10 8 10ZM8 17.35C10.0333 15.4833 11.5417 13.7873 12.525 12.262C13.5083 10.7373 14 9.38333 14 8.2C14 6.38333 13.4207 4.89567 12.262 3.737C11.104 2.579 9.68333 2 8 2C6.31667 2 4.89567 2.579 3.737 3.737C2.579 4.89567 2 6.38333 2 8.2C2 9.38333 2.49167 10.7373 3.475 12.262C4.45833 13.7873 5.96667 15.4833 8 17.35ZM8 19.625C7.86667 19.625 7.73333 19.6 7.6 19.55C7.46667 19.5 7.35 19.4333 7.25 19.35C4.81667 17.2 3 15.2043 1.8 13.363C0.6 11.521 0 9.8 0 8.2C0 5.7 0.804333 3.70833 2.413 2.225C4.021 0.741667 5.88333 0 8 0C10.1167 0 11.979 0.741667 13.587 2.225C15.1957 3.70833 16 5.7 16 8.2C16 9.8 15.4 11.521 14.2 13.363C13 15.2043 11.1833 17.2 8.75 19.35C8.65 19.4333 8.53333 19.5 8.4 19.55C8.26667 19.6 8.13333 19.625 8 19.625Z"
                          fill="#222222"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className={styles.textarea}>
                    <textarea
                      placeholder="Додати підпис"
                      rows={1}
                      ref={textAreaRef}
                      value={currentValue}
                      onChange={(e) => {
                        setCurrentValue(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className={styles.two}>
                  <div className={styles.select}>
                    <div>Вимкнути коментарі</div>
                    <div>Приховувати кількість позначок</div>
                  </div>
                  <div className={styles.select}>
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="18"
                        fill="url(#paint0_linear_1225_6960)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_1225_6960"
                          x1="-6.98206"
                          y1="32.4"
                          x2="36.6291"
                          y2="31.4378"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#48D824" />
                          <stop offset="1" stopColor="#10D0EA" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="18" cy="18" r="18" fill="#D9D9D9" />
                    </svg>
                  </div>
                </div>
                <svg
                  className={styles.select_image}
                  width="38"
                  height="40"
                  viewBox="0 0 38 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M31.9724 11.2726C32.0444 12.3705 31.9544 13.6123 31.7384 14.9981L30.4246 23.4391C29.3088 30.4762 26.0512 32.8519 19.014 31.754L10.5731 30.4222C8.1434 30.0443 6.27164 29.3963 4.90381 28.4245C2.29414 26.6067 1.53823 23.6191 2.25814 19.0116L3.58997 10.5707C4.70583 3.53358 7.96342 1.15787 15.0005 2.25574L23.4415 3.58757C29.0928 4.46946 31.7384 6.77317 31.9724 11.2726Z"
                    stroke="#2F2F2F"
                    stroke-width="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M35.3365 22.6469L32.6369 30.7639C30.3872 37.5311 26.7876 39.3308 20.0204 37.0811L11.9035 34.3815C7.81798 33.0316 5.55026 31.1599 4.90234 28.4242C6.27017 29.3961 8.14194 30.044 10.5716 30.422L19.0126 31.7538C26.0497 32.8517 29.3073 30.476 30.4231 23.4388L31.737 14.9979C31.953 13.6121 32.0429 12.3702 31.971 11.2724C36.2724 13.5581 37.2083 17.0136 35.3365 22.6469ZM13.2713 14.5659C13.6825 14.5659 14.0898 14.4849 14.4697 14.3276C14.8497 14.1702 15.1949 13.9395 15.4857 13.6487C15.7765 13.3579 16.0071 13.0127 16.1645 12.6328C16.3219 12.2528 16.4029 11.8456 16.4029 11.4343C16.4029 11.0231 16.3219 10.6159 16.1645 10.2359C16.0071 9.85598 15.7765 9.51076 15.4857 9.21996C15.1949 8.92916 14.8497 8.69849 14.4697 8.54111C14.0898 8.38374 13.6825 8.30273 13.2713 8.30273C12.4407 8.30273 11.6442 8.63267 11.0569 9.21996C10.4696 9.80725 10.1397 10.6038 10.1397 11.4343C10.1397 12.2649 10.4696 13.0614 11.0569 13.6487C11.6442 14.236 12.4407 14.5659 13.2713 14.5659Z"
                    stroke="#2F2F2F"
                    stroke-width="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <div className={styles.container}>
              <svg
                onClick={onClick}
                className={styles.close}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3L21 21M3 21L21 3"
                  stroke="#2F2F2F"
                  strokeWidth="2"
                />
              </svg>
              <div className={styles.header}>Новий пост</div>
              <div className={styles.block_upload}>
                <div className={styles.icons}>
                  <svg
                    width="61"
                    height="51"
                    viewBox="0 0 61 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M38.6919 51H21.8081C6.52837 51 0 45.4967 0 32.6163V18.3837C0 5.50326 6.52837 0 21.8081 0H38.6919C53.9716 0 60.5 5.50326 60.5 18.3837V32.6163C60.5 45.4967 53.9716 51 38.6919 51ZM21.8081 3.55814C8.83581 3.55814 4.22093 7.44837 4.22093 18.3837V32.6163C4.22093 43.5516 8.83581 47.4419 21.8081 47.4419H38.6919C51.6642 47.4419 56.2791 43.5516 56.2791 32.6163V18.3837C56.2791 7.44837 51.6642 3.55814 38.6919 3.55814H21.8081Z"
                      fill="#8D8D8D"
                    />
                    <path
                      d="M21.8083 22.535C17.5311 22.535 14.0699 19.6174 14.0699 16.0118C14.0699 12.4062 17.5311 9.48853 21.8083 9.48853C26.0855 9.48853 29.5466 12.4062 29.5466 16.0118C29.5466 19.6174 26.0855 22.535 21.8083 22.535ZM21.8083 13.0467C20.8754 13.0467 19.9807 13.3591 19.3211 13.9151C18.6614 14.4712 18.2908 15.2254 18.2908 16.0118C18.2908 16.7982 18.6614 17.5524 19.3211 18.1084C19.9807 18.6645 20.8754 18.9769 21.8083 18.9769C22.7412 18.9769 23.6358 18.6645 24.2955 18.1084C24.9551 17.5524 25.3257 16.7982 25.3257 16.0118C25.3257 15.2254 24.9551 14.4712 24.2955 13.9151C23.6358 13.3591 22.7412 13.0467 21.8083 13.0467ZM3.99314 43.7629C3.54088 43.7635 3.10048 43.641 2.73751 43.4135C2.37455 43.1861 2.10842 42.8659 1.97875 42.5007C1.84909 42.1354 1.86282 41.7447 2.0179 41.3865C2.17298 41.0284 2.46112 40.7221 2.83942 40.5131L16.7122 32.6615C19.7513 30.9299 23.9441 31.1434 26.7017 33.1122L27.6303 33.8001C29.0373 34.8201 31.4292 34.8201 32.808 33.8001L44.5141 25.3317C47.4969 23.1731 52.1962 23.1731 55.2071 25.3317L59.7938 28.6527C60.6662 29.2931 60.7787 30.408 60.019 31.1671C59.2592 31.9024 57.9366 31.9973 57.0362 31.3569L52.4494 28.0359C51.0424 27.0159 48.6506 27.0159 47.2436 28.0359L35.5376 36.5043C32.5548 38.6629 27.8555 38.6629 24.8445 36.5043L23.9159 35.8164C22.6215 34.8913 20.4829 34.7964 19.0478 35.6266L5.175 43.4782C4.80918 43.668 4.38709 43.7629 3.99314 43.7629Z"
                      fill="#8D8D8D"
                    />
                  </svg>
                  <svg
                    width="73"
                    height="51"
                    viewBox="0 0 73 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M39.8742 51H19.7812C5.01283 51 0.525391 46.591 0.525391 32.0806V18.9194C0.525391 4.40903 5.01283 0 19.7812 0H39.8742C54.6426 0 59.13 4.40903 59.13 18.9194V32.0806C59.13 46.591 54.6426 51 39.8742 51ZM19.7812 4.93548C7.79237 4.93548 5.54865 7.1729 5.54865 18.9194V32.0806C5.54865 43.8271 7.79237 46.0645 19.7812 46.0645H39.8742C51.8631 46.0645 54.1068 43.8271 54.1068 32.0806V18.9194C54.1068 7.1729 51.8631 4.93548 39.8742 4.93548H19.7812ZM64.9905 36.1935C63.6175 36.1935 62.4789 35.0748 62.4789 33.7258C62.4789 32.3768 63.6175 31.2581 64.9905 31.2581C66.9663 31.2581 67.4017 30.9619 67.4352 30.9619C67.5021 30.7645 67.5021 29.6129 67.5021 28.7903V22.2097C67.5021 21.3871 67.5021 20.2684 67.3682 19.9723C67.4017 20.0052 66.8324 19.7419 64.9905 19.7419C63.6175 19.7419 62.4789 18.6232 62.4789 17.2742C62.4789 15.9252 63.6175 14.8065 64.9905 14.8065C71.9561 14.8065 72.5254 18.1626 72.5254 22.2097V28.7903C72.5254 32.8374 71.9561 36.1935 64.9905 36.1935Z"
                      fill="#8D8D8D"
                    />
                  </svg>
                </div>
                <div className={styles.description}>
                  Перемістіть сюди, Фото або Відео{" "}
                </div>
                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={(event: any) => {
                    const file = event.currentTarget.files[0];
                    setSelectFiles(file);
                  }}
                  style={{ display: "none" }}
                  accept=".jpg, .jpeg"
                />
                <button onClick={handleClick}>Додати</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
