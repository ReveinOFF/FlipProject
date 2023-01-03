import { Link } from 'react-router-dom';
import { Button, Nav, Navbar } from 'react-bootstrap'
import { useEffect, useState } from 'react';

function Home() {
    const [isAuth, setIsAuth] = useState<boolean>();

    useEffect(() => {
        checkAuth();
    });

    const checkAuth = () => {
        var storage = localStorage.getItem('token');

        if(storage != null) {
            setIsAuth(true);
            return true;
        } else {
            setIsAuth(false);
            return false;
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        checkAuth();
        window.location.reload();
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
                    {isAuth ? (
                        <Button className='text-light' style={{textDecoration: "none"}} onClick={logout}>
                            Logout
                        </Button>
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