import './App.css';
import { Route, Routes } from 'react-router-dom';
import { AuthSelection } from './Pages/Auth/Selection/AuthSelection';
import { SignIn } from './Pages/Auth/SignIn/SignIn';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<AuthSelection/>}>
        
      </Route>
      <Route path='/signin' element={<SignIn/>}></Route>
      {/* <Route path="/" element={<HomeLayout/>}>
        <Route index element={
          <RequireAuth redirectTo="/login">
            <Home/>
          </RequireAuth>
        } />
        <Route path='/login' element={
          <NotRequireAuth redirectTo="/">
              <Login/>
          </NotRequireAuth>
        } />
        <Route path="*" element={<NoMatch />} />
      </Route> */}
    </Routes>
  );
}

export default App;