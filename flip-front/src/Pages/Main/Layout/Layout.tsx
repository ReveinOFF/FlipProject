import { Outlet } from "react-router-dom";
import { LeftMenu } from "../../../Components/MainComponents/Left-Menu/LeftMenu";
import { RightMenu } from "../../../Components/MainComponents/Right-Menu/RightMenu";

export const Loyout = () => {
  return (
    <>
      <LeftMenu />
      <Outlet />
      <RightMenu />
    </>
  );
};
