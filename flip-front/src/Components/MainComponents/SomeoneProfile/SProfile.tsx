import styles from "./SProfile.module.scss";
import img from "../../../Assets/Img/monkey-selfie_custom-7117031c832fc3607ee5b26b9d5b03d10a1deaca-s1100-c50.jpg";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import axios from "axios";
import { useEffect, useState } from "react";
import { FollowUser } from "../../../Interface/Profile";

export const SProfile = (props) => {
  const myProfile = useTypedSelector((state) => state.auth.user);
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const { profile } = props;

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`user/check/${myProfile?.id}/follow/${profile?.id}`)
        .then((res) => {
          setIsFollow(res.data);
        });
    }, 400);
  }, [myProfile?.id, profile?.id]);

  const Follow = async () => {
    const follow: FollowUser = { UserId: myProfile?.id, FollowId: profile?.id };

    await axios
      .post("user/follow", follow)
      .then((res) => {
        alert("Followed");
        setIsFollow(true);
      })
      .catch((err) => alert("Error followed"));
  };

  const UnFollow = async () => {
    await axios
      .delete(`user/${myProfile?.id}/unfollow/${profile?.id}`)
      .then((res) => {
        alert("UnFollowed");
        setIsFollow(false);
      })
      .catch((err) => alert("Error unfollowed"));
  };

  return (
    <>
      <div className={styles.profile_inf}>
        <div className={styles.profile_inf_data}>
          {profile.userImage ? (
            <img
              className={styles.profile_img}
              src={`http://localhost:5170/resources/userimages/${profile.id}/${profile.userImage}`}
              alt=""
            />
          ) : (
            <div className={styles.profile_img}></div>
          )}
          <div className={styles.information}>
            <div className={styles.inf_menu}>
              <div>
                <div className={styles.profile_names}>
                  <div className={styles.profile_name}>{profile.name}</div>
                  <div className={styles.profile_username}>
                    (@{profile.userName})
                  </div>
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
                <div className={styles.profile_count}>
                  <div>ПІДПИСНИКИ: {profile.followers}</div>
                  <div>ПІДПИСКИ: {profile.followings}</div>
                  <div>ДОПИСИ: {profile.createdPostCount}</div>
                </div>
                {profile.description && !profile.isPrivateUser && (
                  <div className={styles.profile_description}>
                    {profile.description}
                  </div>
                )}
              </div>
              <div className={styles.settings}>
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
            <div className={styles.profile_btn}>
              {isFollow ? (
                <button onClick={UnFollow}>Відстежується</button>
              ) : (
                <button onClick={Follow}>Стежити</button>
              )}
              <button>Повідомлення</button>
            </div>
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
        </div>
      </div>
      <div className={styles.profile_data}>
        <div className={styles.selection}>
          <div>дописи</div>
          <div>flipers</div>
        </div>
        <div className={styles.profile_data_imgs}>
          {profile.createdPost && !profile.isPrivateUser && (
            <>
              {/* {profile?.createdPost.map((item) => )} */}
              <div className={styles.profile_data_img}></div>
              <div className={styles.profile_data_img}></div>
              <div className={styles.profile_data_img}></div>
              <div className={styles.profile_data_img}></div>
              <div className={styles.profile_data_img}></div>
              <div className={styles.profile_data_img}></div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
