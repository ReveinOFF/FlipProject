import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import React from "react";

const AuthBGComponent = React.lazy(() =>
  import("../../Components/Auth/SignBg/AuthBg").then((module) => ({
    default: module.AuthBg,
  }))
);
const AuthSelectionComponent = React.lazy(() =>
  import("../../Pages/Auth/Selection/AuthSelection").then((module) => ({
    default: module.AuthSelection,
  }))
);
const SignInComponent = React.lazy(() =>
  import("../../Pages/Auth/SignIn/SignIn").then((module) => ({
    default: module.SignIn,
  }))
);
const SignUpComponent = React.lazy(() =>
  import("../../Pages/Auth/SignUp/SignUp").then((module) => ({
    default: module.SignUp,
  }))
);
const ConfirmEmailComponent = React.lazy(() =>
  import("../../Components/Auth/SignUp/ConfirmEmail/ConfirmEmail").then(
    (module) => ({
      default: module.ConfirmEmail,
    })
  )
);
const PNFComponent = React.lazy(() =>
  import("../../Pages/PageNotFound/PageNotFound").then((module) => ({
    default: module.PageNotFound,
  }))
);

const App = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6Le0YTQkAAAAAHftYF71fIFvFCyVdwfIlI5aLGDK">
      <Routes>
        <Route path="/" element={<AuthBGComponent />}>
          <Route index element={<AuthSelectionComponent />} />
          <Route path="signin" element={<SignInComponent />} />
          <Route path="signup" element={<SignUpComponent />} />
          <Route path="email-confirm" element={<ConfirmEmailComponent />} />
        </Route>
        <Route path="*" element={<PNFComponent />} />
      </Routes>
    </GoogleReCaptchaProvider>
  );
};

export default App;
