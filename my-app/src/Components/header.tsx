import { Link } from 'react-router-dom';
import { Button, Nav, Navbar } from 'react-bootstrap'
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { AuthActionTypes } from './Auth/store/types';
import axios from 'axios';

function Home() {
    const getUser = useTypedSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        axios.post("account/revoke-token", localStorage.getItem("refreshToken")).then(res => {
            localStorage.removeItem('token');
            localStorage.removeItem("refreshToken");
            dispatch({type: AuthActionTypes.LOGOUT})
        }).catch(error => console.log(error));
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
                                <Link className='text-light' style={{textDecoration: "none"}} to="/searchprofile">Search Profile</Link>
                            </Button>
                            <Button>
                                <Link className='text-light' style={{textDecoration: "none"}} to={getUser.user.name}>Profile</Link>
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