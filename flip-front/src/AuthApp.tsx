import { Route, Routes } from "react-router-dom";
import "./AuthApp.scss";
import { Loyout } from "./Pages/Main/Layout/Layout";
import { Profile } from "./Pages/Main/Profile/Profile";

const AuthApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Loyout />}>
        <Route path="profile" element={<Profile />} />
      </Route>
      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
};

export default AuthApp;
