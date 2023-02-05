import { Route, Routes } from "react-router-dom";
import { LeftMenu } from "./Components/MainComponents/Left-Menu/LeftMenu";
import "./AuthApp.scss";

const AuthApp = () => {
  return (
    <Routes>
      <Route path="/" element={<LeftMenu />} />
      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
};

export default AuthApp;
