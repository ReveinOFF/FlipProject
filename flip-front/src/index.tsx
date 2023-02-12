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

const ldMode = localStorage.getItem("LightDarkMode");
const token = localStorage.getItem("token");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (!ldMode) {
  localStorage.setItem("LightDarkMode", "light");
}

ThemeActions(store.dispatch);

const NotUser = () => {
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
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
          <BrowserRouter>
            <div className="root_main">
              <AuthApp />
            </div>
          </BrowserRouter>
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
