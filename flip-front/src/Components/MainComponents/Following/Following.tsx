import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { GetFollow } from "../../../Interface/Profile";
import { ToastActionTypes } from "../../Toast/store/type";
import styles from "./Following.module.scss";

export const Following = ({ userId, show, onClick }) => {
  const [following, setFollowing] = useState<GetFollow[]>();

  const myuser = useTypedSelector((state) => state.auth.user);
  const [t] = useTranslation("translation");
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`user/get-followers/${userId}`).then((res) => {
      if (res.status === 204) setFollowing(res.data);
    });
  }, [userId]);

  const deleteUser = (id) => {
    axios.delete(`user/${id}/unfollow/${myuser?.id}`).then((res) => {
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

  return (
    <>
      {show && (
        <div className={styles.following_bg}>
          <div className={styles.following_modal}>
            <svg
              onClick={() => onClick()}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 3L21 21M3 21L21 3" stroke="#EAEAEA" strokeWidth="2" />
            </svg>
            <div className={styles.header}>{t("main.following.header")}</div>
            <div className={styles.line}></div>
            <div className={styles.following_list}>
              {following &&
                following.map((item) => (
                  <div key={item.id} className={styles.following}>
                    <div className={styles.image}>
                      <img
                        src="Assets/Img/monkey-selfie_custom-7117031c832fc3607ee5b26b9d5b03d10a1deaca-s1100-c50.jpg"
                        alt=""
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.name}>{item.name}</div>
                    <button onClick={() => deleteUser(item.id)}>
                      {t("main.following.delete_user")}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
