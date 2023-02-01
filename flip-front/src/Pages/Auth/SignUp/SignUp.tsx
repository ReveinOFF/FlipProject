import { useEffect } from "react";
import { Confirm } from "../../../Components/Auth/SignUp/Confirm/Confirm";
import { RegPhaseOne } from "../../../Components/Auth/SignUp/PhaseOne/RegPhaseOne";
import { RegPhaseTwo } from "../../../Components/Auth/SignUp/PhaseTwo/RegPhaseTwo";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { SelectPhase } from "../../../Interface/Registration";

export const SignUp = () => {
  const selector = useTypedSelector((state) => state.reg);

  useEffect(() => {}, [selector]);

  return (
    <>
      <RegPhaseOne />
      {/* {selector?.phase === SelectPhase.phaseOne && <RegPhaseOne />}
      {selector?.phase === SelectPhase.phaseTwo && <RegPhaseTwo />}
      {selector?.phase === SelectPhase.confrim && <Confirm />} */}
    </>
  );
};
