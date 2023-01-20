import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthUser } from './Components/Auth/store/actions';
import './Components/Service/axios';

const token = localStorage.getItem("token");

if(token) {
  AuthUser(token, store.dispatch);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header/>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();