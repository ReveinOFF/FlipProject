import { Route, Routes } from "react-router-dom";
import { Fliper } from "../../Pages/Fliper/Fliper";
import { Loyout } from "../../Components/Layout/Layout";
import { Profile } from "../../Pages/Profile/Profile";
import "./AuthApp.scss";
import { Main } from "../../Pages/Main/Main";
import { Settings } from "../../Pages/Settings/Settings";
import { MessageSelection } from "../../Pages/Messages/MessageSelection/MessageSelection";
import { MessageRoom } from "../../Pages/Messages/MessageRoom/MessageRoom";

const AuthApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Loyout />}>
        <Route index element={<Main />} />
        <Route path=":profile" element={<Profile />} />
        <Route path="fliper" element={<Fliper />} />
        <Route path="settings" element={<Settings />} />
        <Route path="messages" element={<MessageSelection />} />
        <Route path="testmessages" element={<MessageRoom />} />
      </Route>
      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
};

export default AuthApp;
