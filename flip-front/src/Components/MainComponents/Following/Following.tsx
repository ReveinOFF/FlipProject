import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { GetFollow } from "../../../Interface/Profile";
import { ToastActionTypes } from "../../Toast/store/type";
import styles from "./Following.module.scss";

export const Following = ({
  show,
  onClick,
  followings,
  isMyProfile,
  profileId,
}) => {
  const myuser = useTypedSelector((state) => state.auth.user);
  const [t] = useTranslation("translation");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [phase, setPhase] = useState(1);
  const [following, setFollowing] = useState<GetFollow>();

  const deleteUser = async (id) => {
    await axios.delete(`user/${profileId}/unfollow/${id}`).then((res) => {
      if (res.status === 200)
        dispatch({
          type: ToastActionTypes.SHOW,
          payload: {
            message: "Ви успішно відписалися від користувача!",
            type: "success",
          },
        });
      else
        dispatch({
          type: ToastActionTypes.SHOW,
          payload: {
            message: "Виникла помилка при відписці від користувача!",
            type: "error",
          },
        });
    });
  };

  const subscribe = async (id) => {
    await axios
      .post(`user/follow`, {
        UserId: profileId,
        FollowId: id,
      })
      .then((res) => {
        if (res.status === 200)
          dispatch({
            type: ToastActionTypes.SHOW,
            payload: {
              message: t("toast.success.follow"),
              type: "success",
            },
          });
        else
          dispatch({
            type: ToastActionTypes.SHOW,
            payload: {
              message: t("toast.error.follow"),
              type: "error",
            },
          });
      });
  };

  return (
    <>
      {show && (
        <div className={styles.following_bg}>
          <div className={styles.following_modal}>
            <svg
              className={styles.close}
              onClick={() => {
                if (phase === 1) onClick();
                else setPhase(1);
              }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 3L21 21M3 21L21 3" stroke="#EAEAEA" strokeWidth="2" />
            </svg>
            {phase === 1 && (
              <>
                <div className={styles.header}>
                  {t("main.following.header")}
                </div>
                <div className={styles.line}></div>
                <div className={styles.following_list}>
                  {followings &&
                    followings.map((item) => (
                      <div key={item.id} className={styles.following}>
                        <div
                          className={styles.select}
                          onClick={() => {
                            navigate(item.name);
                            onClick();
                          }}
                        >
                          <div className={styles.image}>
                            {item.userImage ? (
                              <img
                                src={`${process.env.REACT_APP_BASE_RESOURCES}UserImages/${item.id}/${item.userImage}`}
                                alt=""
                                loading="lazy"
                              />
                            ) : (
                              <svg
                                width="52"
                                height="52"
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
                          </div>
                          <div className={styles.name}>{item.name}</div>
                        </div>
                        {isMyProfile ? (
                          <>
                            <button
                              onClick={() => {
                                setPhase(2);
                                setFollowing(item);
                              }}
                            >
                              {t("main.following.delete_user")}
                            </button>
                          </>
                        ) : (
                          <>
                            {item.id !== myuser?.id && (
                              <>
                                {item.isFollowed ? (
                                  <button
                                    onClick={() => {
                                      setPhase(2);
                                      setFollowing(item);
                                    }}
                                  >
                                    {t("main.following.unsubscribe")}
                                  </button>
                                ) : (
                                  <button onClick={() => subscribe(item.id)}>
                                    {t("main.following.subscribe")}
                                  </button>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                </div>
              </>
            )}
            {phase === 2 && (
              <div className={styles.confirm}>
                {following?.userImage ? (
                  <img
                    src={`${process.env.REACT_APP_BASE_RESOURCES}UserImages/${following?.id}/${following?.userImage}`}
                    alt=""
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.confirm_img}></div>
                )}
                <div className={styles.confirm_h}>
                  {t("main.following.confirm.header")} {following?.name}
                </div>
                <button
                  onClick={() => {
                    deleteUser(following?.id);
                    setPhase(1);
                  }}
                >
                  {t("main.following.confirm.btn")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
