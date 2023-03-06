import { EmailFound } from "../../../../Components/Auth/RecoverPassword/EmailFound/EmailFound";
import { SendEmail } from "../../../../Components/Auth/RecoverPassword/SendEmail/SendEmail";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import styles from "./RecoverPassword.module.scss";

export const RecoverPassword = () => {
  const page = useTypedSelector((state) => state.recPas.page);

  return (
    <>
      {page === 1 && <SendEmail />}
      {page === 2 && <EmailFound />}
    </>
  );
};
