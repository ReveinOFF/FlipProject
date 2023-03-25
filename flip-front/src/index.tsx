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
import "./Components/i18n/i18n";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Toast from "./Components/Toast/Toast";
import { I18nextProvider } from "react-i18next";
import i18n from "./Components/i18n/i18n";

const ldMode = localStorage.getItem("LightDarkMode");
const token = localStorage.getItem("token");
const lng = localStorage.getItem("lng");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (!ldMode) localStorage.setItem("LightDarkMode", "light");

if (!lng) localStorage.setItem("lng", navigator.language.split("-")[0]);

ThemeActions(store.dispatch);

const client = new QueryClient();

const NotUser = () => {
  root.render(
    <Suspense fallback="">
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <BrowserRouter>
            <QueryClientProvider client={client}>
              <App />
              <Toast />
            </QueryClientProvider>
          </BrowserRouter>
        </Provider>
      </I18nextProvider>
    </Suspense>
  );
};

if (token) {
  AuthUser(token as string, store.dispatch);
  const excToken = jwtDecode<JwtDecoder>(token);
  const date = new Date().getTime();

  setTimeout(() => {
    if (excToken.exp < date) {
      root.render(
        <Suspense fallback="">
          <I18nextProvider i18n={i18n}>
            <Provider store={store}>
              <BrowserRouter>
                <QueryClientProvider client={client}>
                  <div className="root_main">
                    <AuthApp />
                  </div>
                  <Toast />
                </QueryClientProvider>
              </BrowserRouter>
            </Provider>
          </I18nextProvider>
        </Suspense>
      );
    } else {
      NotUser();
    }
  }, 400);
} else {
  NotUser();
}

reportWebVitals();
