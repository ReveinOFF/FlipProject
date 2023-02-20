import { Route, Routes } from "react-router-dom";
import "./AuthApp.scss";
import React from "react";

const LoyoutComponent = React.lazy(() =>
  import("../../Components/Layout/Layout").then((module) => ({
    default: module.Loyout,
  }))
);
const MainComponent = React.lazy(() =>
  import("../../Pages/Main/Main").then((module) => ({
    default: module.Main,
  }))
);
const ProfileComponent = React.lazy(() =>
  import("../../Pages/Profile/Profile").then((module) => ({
    default: module.Profile,
  }))
);
const FliperComponent = React.lazy(() =>
  import("../../Pages/Fliper/Fliper").then((module) => ({
    default: module.Fliper,
  }))
);
const SettingsComponent = React.lazy(() =>
  import("../../Pages/Settings/Settings").then((module) => ({
    default: module.Settings,
  }))
);
const MessagesSelectionComponent = React.lazy(() =>
  import("../../Pages/Messages/MessageSelection/MessageSelection").then(
    (module) => ({
      default: module.MessageSelection,
    })
  )
);
const MessagesRoomComponent = React.lazy(() =>
  import("../../Pages/Messages/MessageRoom/MessageRoom").then((module) => ({
    default: module.MessageRoom,
  }))
);
const PNFComponent = React.lazy(() =>
  import("../../Pages/PageNotFound/PageNotFound").then((module) => ({
    default: module.PageNotFound,
  }))
);

const AuthApp = () => {
  return (
    <Routes>
      <Route path="/" element={<LoyoutComponent />}>
        <Route index element={<MainComponent />} />
        <Route path=":profile" element={<ProfileComponent />} />
        <Route path="fliper" element={<FliperComponent />} />
        <Route path="settings" element={<SettingsComponent />} />
        <Route path="messages" element={<MessagesSelectionComponent />} />
        <Route path="testmessages" element={<MessagesRoomComponent />} />
      </Route>
      <Route path="*" element={<PNFComponent />} />
    </Routes>
  );
};

export default AuthApp;
