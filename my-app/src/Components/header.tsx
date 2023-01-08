import { Link } from 'react-router-dom';
import { Button, Nav, Navbar } from 'react-bootstrap'
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { AuthActionTypes } from './Auth/store/types';

function Home() {
    const getUser = useTypedSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({type: AuthActionTypes.LOGOUT})
    }

    return (
        <div>
            <Navbar bg="dark">
                <Nav>
                    <Button variant="link">
                        <Link className='text-light' style={{textDecoration: "none"}} to="/">Home</Link>
                    </Button>
                </Nav>
                <Nav className='ms-auto p-2'>
                    {getUser.isAuth ? (
                        <div>
                            <Button>
                                <Link className='text-light' style={{textDecoration: "none"}} to="/profile">Profile</Link>
                            </Button>
                            <Button className='text-light' style={{textDecoration: "none"}} onClick={logout}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Button>
                            <Link className='text-light' style={{textDecoration: "none"}} to="/login">Login</Link>
                        </Button>
                    )}
                </Nav>
            </Navbar>
        </div>
    );
}

export default Home;