import { Outlet } from "react-router-dom";
import { LeftMenu } from "../MainComponents/Left-Menu/LeftMenu";
import { RightMenu } from "../MainComponents/Right-Menu/RightMenu";
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
