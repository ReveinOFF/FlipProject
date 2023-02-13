import ReactDOM from "react-dom/client";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { store } from "./Store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeActions } from "./Components/Theme/themeActions";
import "./Components/Axios/axios";
import AuthApp from "./Main/IsAuth/AuthApp";
import App from "./Main/NotAuth/App";
import { AuthUser } from "./Components/Auth/store/actions";
import jwtDecode from "jwt-decode";
import { JwtDecoder } from "./Interface/JwtDecoder";
import "./Assets/i18n/i18n";
import { Suspense } from "react";
import axios from "axios";

const ldMode = localStorage.getItem("LightDarkMode");
const token = localStorage.getItem("token");
const lng = localStorage.getItem("lng");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (!ldMode) localStorage.setItem("LightDarkMode", "light");

if (!lng) {
  axios.get("https://ipapi.co/json/").then((response) => {
    let data = response.data;

    if (data.country_name === "Ukraine") localStorage.setItem("lng", "ua");
    else if (data.country_name === "Russian") localStorage.setItem("lng", "ru");
    else localStorage.setItem("lng", "en");
  });
}

ThemeActions(store.dispatch);

const NotUser = () => {
  root.render(
    <Provider store={store}>
      <Suspense fallback={<div>...</div>}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </Provider>
  );
};

if (token) {
  var user;
  AuthUser(token as string, store.dispatch).then((value) => {
    user = value;
  });
  const excToken = jwtDecode<JwtDecoder>(token);
  const date = new Date().getTime();

  setTimeout(() => {
    if (excToken.exp < date && user) {
      root.render(
        <Provider store={store}>
          <Suspense fallback={<div>...</div>}>
            <BrowserRouter>
              <div className="root_main">
                <AuthApp />
              </div>
            </BrowserRouter>
          </Suspense>
        </Provider>
      );
    } else {
      NotUser();
    }
  }, 400);
} else {
  NotUser();
}

reportWebVitals();
