import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LazyLoading } from "../../../Components/LazyLoading/LazyLoading";
import { ToastActionTypes } from "../../../Components/Toast/store/type";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import styles from "./ChangeProfile.module.scss";

export const ChangeProfile = () => {
  const profile = useTypedSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t] = useTranslation("translation");
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<any>();
  const [selectedFile, setSelectedFile] = useState<any>();
  const [nameValue, setNameValue] = useState(profile?.name);
  const [loginValue, setLoginValue] = useState(profile?.userName);
  const [descriptionValue, setDescriptionValue] = useState(
    profile?.description || ""
  );
  const [dateValue, setDateValue] = useState<Date>();
  const [phoneValue, setPhoneValue] = useState(profile?.phone);

  const editProfile = async () => {
    const res = await axios.put(
      "settings/edit-user",
      {
        id: profile?.id,
        name: nameValue,
        userName: loginValue,
        dateOfBirth: dateValue?.toISOString().substring(0, 10),
        description: descriptionValue,
        numberPhone: phoneValue,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res;
  };

  const { isLoading, data, mutateAsync } = useMutation(editProfile, {
    onSuccess: () => {
      localStorage.setItem("token", data?.data.token);
      localStorage.setItem("refreshToken", data?.data.refreshToken);
      window.location.reload();
      dispatch({
        type: ToastActionTypes.SHOW,
        payload: {
          message: t("toast.success.profile2"),
          type: "success",
        },
      });
    },
    onError: () => {
      dispatch({
        type: ToastActionTypes.SHOW,
        payload: {
          message: t("toast.error.profile2"),
          type: "error",
        },
      });
    },
  });

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    mutateImage();

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const postImage = async () => {
    const res = await axios.post(
      "settings/add-image-user",
      {
        userId: profile?.id,
        file: selectedFile,
      },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return res;
  };

  const { mutateAsync: mutateImage } = useMutation(postImage);

  useEffect(() => {
    document.title = t("main.settings.change_profile.title");
  }, []);

  const handleClick = () => {
    if (hiddenFileInput.current !== null) {
      hiddenFileInput.current.click();
    }
  };

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

        <div>{t("main.settings.change_profile.back")}</div>
      </div>

      <div className={styles.profile}>
        <div className={styles.curr}>
          <div className={styles.image}>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={(event: any) => {
                const file = event.currentTarget.files[0];
                setSelectedFile(file);
              }}
              style={{ display: "none" }}
              accept=".jpg, .jpeg"
            />

            {selectedFile ? (
              <>
                <img src={preview} alt="" />
              </>
            ) : (
              <>
                {profile?.userImage ? (
                  <img
                    src={`${process.env.REACT_APP_BASE_RESOURCES}UserImages/${profile?.id}/${profile?.userImage}`}
                    alt=""
                  />
                ) : (
                  <svg
                    className={styles.profile_img}
                    width="112"
                    height="112"
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
              </>
            )}
            <svg
              onClick={handleClick}
              className={styles.change_img}
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.75 28.4375H11.25C4.4625 28.4375 1.5625 25.5375 1.5625 18.75V11.25C1.5625 4.4625 4.4625 1.5625 11.25 1.5625H13.75C14.2625 1.5625 14.6875 1.9875 14.6875 2.5C14.6875 3.0125 14.2625 3.4375 13.75 3.4375H11.25C5.4875 3.4375 3.4375 5.4875 3.4375 11.25V18.75C3.4375 24.5125 5.4875 26.5625 11.25 26.5625H18.75C24.5125 26.5625 26.5625 24.5125 26.5625 18.75V16.25C26.5625 15.7375 26.9875 15.3125 27.5 15.3125C28.0125 15.3125 28.4375 15.7375 28.4375 16.25V18.75C28.4375 25.5375 25.5375 28.4375 18.75 28.4375Z"
                fill="url(#paint0_linear_1451_6250)"
              />
              <path
                d="M10.6252 22.1112C9.86266 22.1112 9.16266 21.8362 8.65016 21.3362C8.03766 20.7237 7.77516 19.8362 7.91266 18.8987L8.45016 15.1362C8.55016 14.4112 9.02516 13.4737 9.53766 12.9612L19.3877 3.11123C21.8752 0.62373 24.4002 0.62373 26.8877 3.11123C28.2502 4.47373 28.8627 5.86123 28.7377 7.24873C28.6252 8.37373 28.0252 9.47373 26.8877 10.5987L17.0377 20.4487C16.5252 20.9612 15.5877 21.4362 14.8627 21.5362L11.1002 22.0737C10.9377 22.1112 10.7752 22.1112 10.6252 22.1112ZM20.7127 4.43623L10.8627 14.2862C10.6252 14.5237 10.3502 15.0737 10.3002 15.3987L9.76266 19.1612C9.71266 19.5237 9.78766 19.8237 9.97516 20.0112C10.1627 20.1987 10.4627 20.2737 10.8252 20.2237L14.5877 19.6862C14.9127 19.6362 15.4752 19.3612 15.7002 19.1237L25.5502 9.27373C26.3627 8.46123 26.7877 7.73623 26.8502 7.06123C26.9252 6.24873 26.5002 5.38623 25.5502 4.42373C23.5502 2.42373 22.1752 2.98623 20.7127 4.43623Z"
                fill="url(#paint1_linear_1451_6250)"
              />
              <path
                d="M24.8118 12.2876C24.7243 12.2876 24.6368 12.2751 24.5618 12.2501C22.9373 11.7875 21.4577 10.9179 20.2634 9.72351C19.069 8.52914 18.1993 7.04961 17.7368 5.42509C17.6711 5.1848 17.7024 4.9283 17.8239 4.71086C17.9455 4.49342 18.1476 4.33244 18.3868 4.26259C18.8868 4.12509 19.3993 4.41259 19.5368 4.91259C20.2868 7.57509 22.3993 9.6876 25.0618 10.4376C25.5618 10.5751 25.8493 11.1001 25.7118 11.6001C25.5993 12.0251 25.2243 12.2876 24.8118 12.2876Z"
                fill="url(#paint2_linear_1451_6250)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1451_6250"
                  x1="-3.6498"
                  y1="25.75"
                  x2="28.9071"
                  y2="25.0317"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#48D824" />
                  <stop offset="1" stopColor="#10D0EA" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1451_6250"
                  x1="3.82802"
                  y1="20.0247"
                  x2="29.1183"
                  y2="19.4664"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#48D824" />
                  <stop offset="1" stopColor="#10D0EA" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_1451_6250"
                  x1="16.1432"
                  y1="11.4817"
                  x2="25.8867"
                  y2="11.2671"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#48D824" />
                  <stop offset="1" stopColor="#10D0EA" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className={styles.curr_name}>{profile?.name}</div>
        </div>
        <div className={styles.change_data}>
          <div>{t("main.settings.change_profile.name")}</div>
          <div>
            <input
              type="text"
              value={nameValue}
              onChange={(event) => setNameValue(event.target.value)}
            />
            <div className={styles.descrip}>
              {t("main.settings.change_profile.desc1")}
            </div>
          </div>
        </div>
        <div className={styles.change_data}>
          <div>{t("main.settings.change_profile.login")}</div>
          <div>
            <input
              type="text"
              value={loginValue}
              onChange={(event) => setLoginValue(event.target.value)}
            />
            <div className={styles.descrip}>
              {t("main.settings.change_profile.desc2")}{" "}
              <span>{t("main.settings.change_profile.span")}</span>
            </div>
          </div>
        </div>
        <div className={styles.change_data}>
          <div>{t("main.settings.change_profile.date")}</div>
          <input
            type="date"
            defaultValue={profile?.dateOfBirth.toString()}
            onChange={(e) => setDateValue(new Date(e.target.value))}
          />
        </div>
        <div className={styles.change_data}>
          <div>{t("main.settings.change_profile.description")}</div>
          <div>
            <textarea
              value={descriptionValue}
              maxLength={50}
              onChange={(event) => setDescriptionValue(event.target.value)}
            />
            <div className={styles.lenght}>{descriptionValue!.length}/50</div>
          </div>
        </div>
        <div className={styles.change_data}>
          <div>{t("main.settings.change_profile.phone")}</div>
          <input
            type="text"
            value={phoneValue}
            onChange={(event) => setPhoneValue(event.target.value)}
          />
        </div>
        <div className={styles.buttons}>
          <a href="#" onClick={() => navigate(-1)}>
            {t("main.settings.change_profile.cancel")}
          </a>
          <button onClick={async () => await mutateAsync()}>
            {t("main.settings.change_profile.save")}
          </button>
        </div>
      </div>
    </>
  );
};
