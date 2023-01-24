import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthUser } from './Components/Auth/store/actions';
import { store } from './Store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const token = localStorage.getItem("token");

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if(token) {
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
}
else {
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

reportWebVitals();
