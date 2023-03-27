import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { GetFollow } from "../../../Interface/Profile";
import { ToastActionTypes } from "../../Toast/store/type";
import styles from "./Followers.module.scss";

export const Followers = ({
  show,
  onClick,
  followers,
  isMyProfile,
  profileId,
}) => {
  const [t] = useTranslation("translation");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myuser = useTypedSelector((state) => state.auth.user);

  const [phase, setPhase] = useState(1);
  const [follower, setFollower] = useState<GetFollow>();

  const deleteUser = async (id) => {
    await axios.delete(`user/${id}/unfollow/${profileId}`).then((res) => {
      if (res.status === 200)
        dispatch({
          type: ToastActionTypes.SHOW,
          payload: {
            message: t("toast.success.delete_follow"),
            type: "success",
          },
        });
      else
        dispatch({
          type: ToastActionTypes.SHOW,
          payload: {
            message: t("toast.error.delete_follow"),
            type: "error",
          },
        });
    });
  };

  const unSubscribe = async (id) => {
    await axios.delete(`user/${profileId}/unfollow/${id}`).then((res) => {
      if (res.status === 200)
        dispatch({
          type: ToastActionTypes.SHOW,
          payload: {
            message: t("toast.success.unfollow"),
            type: "success",
          },
        });
      else
        dispatch({
          type: ToastActionTypes.SHOW,
          payload: {
            message: t("toast.error.unfollow"),
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
        <div className={styles.followers_bg}>
          <div className={styles.followers_modal}>
            <svg
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
                  {t("main.followers.header")}
                </div>
                <div className={styles.line}></div>
                <div className={styles.followers_list}>
                  {followers &&
                    followers.map((item) => (
                      <div key={item.id} className={styles.follower}>
                        <div
                          className={styles.select}
                          onClick={() => {
                            navigate(item.name);
                            onClick();
                          }}
                        >
                          <div className={styles.image}>
                            {item.userImage && (
                              <img
                                src={`${process.env.REACT_APP_BASE_RESOURCES}UserImages/${item.id}/${item.userImage}`}
                                alt=""
                                loading="lazy"
                              />
                            )}
                          </div>
                          <div className={styles.name}>{item.name}</div>
                        </div>
                        {item.isFollowed ? (
                          <>
                            {isMyProfile ? (
                              <button
                                onClick={() => {
                                  setPhase(2);
                                  setFollower(item);
                                }}
                              >
                                {t("main.followers.delete_user")}
                              </button>
                            ) : (
                              <>
                                {item.id !== myuser?.id && (
                                  <button
                                    onClick={() => {
                                      setPhase(3);
                                      setFollower(item);
                                    }}
                                  >
                                    {t("main.followers.unsubscribe")}
                                  </button>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {item.id !== myuser?.id && (
                              <button onClick={() => subscribe(item.id)}>
                                {t("main.followers.subscribe")}
                              </button>
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
                {follower?.userImage ? (
                  <img
                    src={`${process.env.REACT_APP_BASE_RESOURCES}UserImages/${follower?.id}/${follower?.userImage}`}
                    alt=""
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.confirm_img}></div>
                )}
                <div className={styles.confirm_h}>
                  {t("main.followers.confirm.header1")}
                </div>
                <div className={styles.confirm_p}>
                  {t("main.followers.confirm.p")}
                </div>
                <button
                  onClick={() => {
                    deleteUser(follower?.id);
                    setPhase(1);
                  }}
                >
                  {t("main.followers.confirm.btn")}
                </button>
              </div>
            )}
            {phase === 3 && (
              <div className={styles.confirm}>
                {follower?.userImage ? (
                  <img
                    src={`${process.env.REACT_APP_BASE_RESOURCES}UserImages/${follower?.id}/${follower?.userImage}`}
                    alt=""
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.confirm_img}></div>
                )}
                <div className={styles.confirm_h}>
                  {t("main.followers.confirm.header2")} {follower?.name}
                </div>
                <button
                  onClick={() => {
                    unSubscribe(follower?.id);
                    setPhase(1);
                  }}
                >
                  {t("main.followers.confirm.btn")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
