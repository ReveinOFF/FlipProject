import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { History } from "../../Components/MainComponents/History/History";
import { Toast } from "../../Components/Toast/Toast";
import { ToastType } from "../../Interface/ToastType";
import styles from "./Main.module.scss";

export const Main = () => {
  const [t] = useTranslation("translation");

  const toastRef = useRef<any>(null);

  useEffect(() => {
    document.title = t("main.main.title_page");
  }, []);

  // return (
  //   <>
  //     <History />
  //   </>
  // );

  return (
    <>
      <button
        onClick={() => {
          if (toastRef.current) toastRef.current.show();
        }}
      >
        Show toast
      </button>
      <Toast ref={toastRef} message="Error message" type={ToastType.error} />
    </>
  );
};
