import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { AuthSelection } from "./Pages/Auth/Selection/AuthSelection";
import { SignIn } from "./Pages/Auth/SignIn/SignIn";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { SignUp } from "./Pages/Auth/SignUp/SignUp";
import { AuthBg } from "./Components/Auth/SignBg/AuthBg";
import { CustomCalendar } from "./Components/MainBlock/Calendar/CustomCalendar";
import { ConfirmEmail } from "./Components/Auth/SignUp/ConfirmEmail/ConfirmEmail";

const App = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6Le0YTQkAAAAAHftYF71fIFvFCyVdwfIlI5aLGDK">
      <Routes>
        <Route path="/" element={<AuthBg />}>
          <Route index element={<AuthSelection />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="email-confirm" element={<ConfirmEmail />} />
          <Route path="test" element={<CustomCalendar />} />
        </Route>
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    </GoogleReCaptchaProvider>
  );
};

export default App;
