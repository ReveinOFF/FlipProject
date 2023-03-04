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
                            {item.userImage && (
                              <img
                                src={`http://localhost:5170/resources/userimages/${item.id}/${item.userImage}`}
                                alt=""
                                loading="lazy"
                              />
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
                      </div>
                    ))}
                </div>
              </>
            )}
            {phase === 2 && (
              <div className={styles.confirm}>
                {following?.userImage ? (
                  <img
                    src={`http://localhost:5170/resources/userimages/${following?.id}/${following?.userImage}`}
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
