import { Outlet } from "react-router-dom";
import { LeftMenu } from "../../../Components/MainComponents/Left-Menu/LeftMenu";
import { RightMenu } from "../../../Components/MainComponents/Right-Menu/RightMenu";
import styles from "./Layout.module.scss";

export const Loyout = () => {
  return (
    <>
      <LeftMenu />
      <div className={styles.container}>
        <Outlet />
      </div>
      <RightMenu />
    </>
  );
};
