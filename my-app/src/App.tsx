import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/login';
import Home from './Components/home';
import Profile from './Components/profile';
import { FindUser } from './Components/finduser';
import { Following } from './Components/following';
import { Follower } from './Components/follower';
import { NotRequireAuth, RequireAuth } from './Components/Service/Auth';
import Confirmpassword from './Components/RecoverPassword/Confirmpassword';
import RecoverPassword from './Components/RecoverPassword/RecoverPassword';

const App =() => {
  return (
    <Routes>
      <Route path='/recover-password' element={<RecoverPassword />} />
      <Route path='/confirm-password/:email/:token' element={<Confirmpassword />} />
      <Route path='/' element={
        <RequireAuth redirectTo="/login">
          <Home/>
        </RequireAuth>
      } />
      <Route path='/login' element={
        <NotRequireAuth redirectTo="/">
            <Login/>
        </NotRequireAuth>
      } />
      <Route path='/:profile' element={
        <RequireAuth redirectTo="/login">
          <Profile/>
        </RequireAuth>
      } />
      <Route path='/searchprofile' element={
      <RequireAuth redirectTo="/login">
        <FindUser/>
      </RequireAuth>
      } />
      <Route path='/:profile/follower' element={
        <RequireAuth redirectTo="/login">
          <Follower/>
        </RequireAuth>
      } />
      <Route path='/:profile/following' element={
        <RequireAuth redirectTo="/login">
          <Following/>
        </RequireAuth>
      } />
      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
}

export default App;