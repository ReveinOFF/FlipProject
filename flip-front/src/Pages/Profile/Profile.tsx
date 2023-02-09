import { useState } from "react";
import { useParams } from "react-router-dom";
import { SProfile } from "../../Components/MainComponents/SomeoneProfile/SProfile";
import { UProfile } from "../../Components/MainComponents/UserProfile/UProfile";

export const Profile = () => {
  const [itsMe, setItsMe] = useState<boolean>();
  const params = useParams();

  return <div>{itsMe ? <UProfile /> : <SProfile />}</div>;
};
