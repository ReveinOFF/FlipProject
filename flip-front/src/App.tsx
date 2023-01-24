import './App.css';
import { Route, Routes } from 'react-router-dom';
import { NotRequireAuth, RequireAuth } from './Services/Auth';
import { AuthSelection } from './Pages/Auth/Selection/AuthSelection';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<AuthSelection/>}></Route>
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