import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthUser } from "./Components/Auth/store/actions";
import { store } from "./Store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeActions } from "./Components/Theme/themeActions";
import "./Components/Axios/axios";

const token = localStorage.getItem("token");
const ldMode = localStorage.getItem("LightDarkMode");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (!ldMode) {
  localStorage.setItem("LightDarkMode", "light");
}

ThemeActions(store.dispatch);

if (token) {
  AuthUser(token, store.dispatch);

  setTimeout(() => {
    root.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }, 400);
} else {
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

reportWebVitals();
