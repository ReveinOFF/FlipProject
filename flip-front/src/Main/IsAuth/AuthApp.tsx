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
  import("../../Pages/Settings/Main/Settings").then((module) => ({
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

const ChangeEmailComponent = React.lazy(() =>
  import("../../Pages/Settings/Email/ChangeEmail").then((module) => ({
    default: module.ChangeEmail,
  }))
);

const ChangePassComponent = React.lazy(() =>
  import("../../Pages/Settings/Password/ChangePassword").then((module) => ({
    default: module.ChangePassword,
  }))
);

const ForgotPassComponent = React.lazy(() =>
  import("../../Pages/Settings/ForgotPassword/ForgotPassword").then(
    (module) => ({
      default: module.ForgotPassword,
    })
  )
);

const ChangeProfileComponent = React.lazy(() =>
  import("../../Pages/Settings/Profile/ChangeProfile").then((module) => ({
    default: module.ChangeProfile,
  }))
);

const LanguageComponent = React.lazy(() =>
  import("../../Pages/Settings/Language/Language").then((module) => ({
    default: module.Language,
  }))
);

const AdvertisingComponent = React.lazy(() =>
  import("../../Pages/Settings/Advertising/Advertising").then((module) => ({
    default: module.Advertising,
  }))
);

const EntrancesComponent = React.lazy(() =>
  import("../../Pages/Settings/Entrances/Entrances").then((module) => ({
    default: module.Entrances,
  }))
);

const InformationComponent = React.lazy(() =>
  import("../../Pages/Settings/Information/Information").then((module) => ({
    default: module.Information,
  }))
);

const HelpComponent = React.lazy(() =>
  import("../../Pages/Settings/Help/Help").then((module) => ({
    default: module.Help,
  }))
);

const AuthApp = () => {
  return (
    <Routes>
      <Route path="/" element={<LoyoutComponent />}>
        <Route index element={<MainComponent />} />
        <Route path=":profile" element={<ProfileComponent />} />
        <Route path="fliper" element={<FliperComponent />} />
        <Route path="settings">
          <Route index element={<SettingsComponent />} />
          <Route path="edit-profile" element={<ChangeProfileComponent />} />
          <Route path="change-email" element={<ChangeEmailComponent />} />
          <Route path="change-password" element={<ChangePassComponent />} />
          <Route path="forgot-password" element={<ForgotPassComponent />} />
          <Route path="language" element={<LanguageComponent />} />
          <Route path="advertising" element={<AdvertisingComponent />} />
          <Route path="entrances" element={<EntrancesComponent />} />
          <Route path="information" element={<InformationComponent />} />
          <Route path="help" element={<HelpComponent />} />
        </Route>
        <Route path="messages" element={<MessagesSelectionComponent />} />
        <Route path="chat" element={<MessagesRoomComponent />} />
      </Route>
      <Route path="*" element={<PNFComponent />} />
    </Routes>
  );
};

export default AuthApp;
