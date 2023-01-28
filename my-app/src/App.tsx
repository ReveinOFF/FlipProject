import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/login';
import Home from './Components/home';
import Profile from './Components/profile';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AuthActionTypes } from './Components/Auth/store/types';
import RecoverPassword from './Components/RecoverPassword/RecoverPassword';
import Confirmpassword from './Components/RecoverPassword/Confirmpassword';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  
  useEffect(() => {
    const userGet = JSON.parse(user);
    if(token !== null)
      dispatch({type: AuthActionTypes.LOGIN, payload: {token: token, user: userGet}});
    else
      dispatch({type: AuthActionTypes.LOGOUT})
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/recover-password' element={<RecoverPassword />} />
      <Route path='/confirm-password/:email/:token' element={<Confirmpassword />} />
      
      
      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
}

export default App;