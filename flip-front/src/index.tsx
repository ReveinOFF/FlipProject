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
import AuthApp from "./AuthApp";

const ldMode = localStorage.getItem("LightDarkMode");
const token = localStorage.getItem("token");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (!ldMode) {
  localStorage.setItem("LightDarkMode", "light");
}

ThemeActions(store.dispatch);

// const NotUser = () => {
//   root.render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   );
// };

// if (token) {
//   const user = AuthUser(token as string, store.dispatch);

//   setTimeout(() => {
//     if (user) {
//       root.render(
//         <Provider store={store}>
//           <BrowserRouter>
//             <AuthApp />
//           </BrowserRouter>
//         </Provider>
//       );
//     } else {
//       NotUser();
//     }
//   }, 400);
// } else {
//   NotUser();
// }

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthApp />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
