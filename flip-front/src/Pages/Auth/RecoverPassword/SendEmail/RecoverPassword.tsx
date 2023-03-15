import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EmailFound } from "../../../../Components/Auth/RecoverPassword/EmailFound/EmailFound";
import { SendEmail } from "../../../../Components/Auth/RecoverPassword/SendEmail/SendEmail";
import { ChangePassword } from "../ChangePassword/ChangePassword";
import styles from "./RecoverPassword.module.scss";

export const RecoverPassword = () => {
  const [page, setPage] = useState(1);

  const [t] = useTranslation("translation");

  const handleClick = () => {
    setPage(2);
  };

  useEffect(() => {
    document.title = t("auht.recoverPass.title");
  }, []);

  return (
    <>
      {page === 1 && <SendEmail onClick={handleClick} />}
      {page === 2 && <EmailFound />}
    </>
  );
};
