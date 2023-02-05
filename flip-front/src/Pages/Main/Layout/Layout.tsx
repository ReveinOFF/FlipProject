import { Outlet } from "react-router-dom";
import { LeftMenu } from "../../../Components/MainComponents/Left-Menu/LeftMenu";

export const Loyout = () => {
  return (
    <div>
      <LeftMenu />
      <Outlet />
    </div>
  );
};
