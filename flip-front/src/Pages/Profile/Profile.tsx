import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { SProfile } from "../../Components/MainComponents/SomeoneProfile/SProfile";
import { UProfile } from "../../Components/MainComponents/UserProfile/UProfile";
import { ToastActionTypes } from "../../Components/Toast/store/type";
import { useTypedSelector } from "../../Hooks/useTypedSelector";
import { IUser } from "../../Interface/Profile";
import { PageNotFound } from "../PageNotFound/PageNotFound";

export const Profile = () => {
  const myuser = useTypedSelector((state) => state.auth.user);
  const [t] = useTranslation("translation");
  const dispatch = useDispatch();
  const params = useParams();

  const [itsMe, setItsMe] = useState<boolean>(false);
  const [profile, setProfile] = useState<IUser>();

  useEffect(() => {
    if (params.profile === myuser?.name) {
      setItsMe(true);
      setProfile(myuser);
    } else {
      setItsMe(false);
      axios.get(`user/get-user-by-name/${params.profile}`).then((res) => {
        if (res.status === 200) setProfile(res.data);
        else
          dispatch({
            type: ToastActionTypes.SHOW,
            payload: {
              message: t("toast.error.profile"),
              type: "error",
            },
          });
      });
    }
  }, [myuser, params.profile]);

  return (
    <>
      {profile ? (
        <div>
          {itsMe ? (
            <UProfile profile={profile} />
          ) : (
            <SProfile profile={profile} />
          )}
        </div>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};
