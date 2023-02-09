import { Route, Routes } from "react-router-dom";
import { Loyout } from "../../Pages/Main/Layout/Layout";
import { Profile } from "../../Pages/Profile/Profile";
import "./AuthApp.scss";

const AuthApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Loyout />}>
        <Route path=":profile" element={<Profile />} />
      </Route>
      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
};

export default AuthApp;
