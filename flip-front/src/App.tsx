import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { AuthSelection } from "./Pages/Auth/Selection/AuthSelection";
import { SignIn } from "./Pages/Auth/SignIn/SignIn";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { SignUp } from "./Pages/Auth/SignUp/SignUp";
import { AuthBg } from "./Components/Auth/SignBg/AuthBg";

const App = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6Le0YTQkAAAAAHftYF71fIFvFCyVdwfIlI5aLGDK">
      <Routes>
        <Route path="/" element={<AuthBg />}>
          <Route index element={<AuthSelection />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    </GoogleReCaptchaProvider>
  );
};

export default App;
