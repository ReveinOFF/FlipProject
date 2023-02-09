import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUser } from "../../Components/Auth/store/types";
import { SProfile } from "../../Components/MainComponents/SomeoneProfile/SProfile";
import { UProfile } from "../../Components/MainComponents/UserProfile/UProfile";
import { useTypedSelector } from "../../Hooks/useTypedSelector";

export const Profile = () => {
  const myuser = useTypedSelector((state) => state.auth.user);
  const [itsMe, setItsMe] = useState<boolean>(false);
  const params = useParams();
  const [profile, setProfile] = useState<IUser>();

  useEffect(() => {
    if (params.profile === myuser?.name) {
      setItsMe(true);
      setProfile(myuser);
    } else {
      setItsMe(false);
      axios
        .get(`user/get-user-by-name/${params.profile}`)
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log("Error get-user"));
    }
  }, []);

  return (
    <>
      {profile && (
        <div>
          {itsMe ? (
            <UProfile profile={profile} />
          ) : (
            <SProfile profile={profile} />
          )}
        </div>
      )}
    </>
  );
};
