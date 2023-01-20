import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch } from 'react-redux';
import { AuthActionTypes } from './Auth/store/types';
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { useInput } from '../hooks/useInput';

interface UserLogin {
    UserName: string;
    Password: string;
}

interface JwtDecoder {
    Role: string[],
    UserId: string,
    iss: string
}

function Login() {
    const login = useInput('', {isEmpty: true, minLenght: 5});
    const password = useInput('', {isEmpty: true, minLenght: 8});
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function postLogin(userName: string, password: string) {
        const user: UserLogin = {UserName: userName, Password: password};
        setIsLoading(true);
        axios.post("account/login", user).then(res => {
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem("refreshToken", res.data.refreshToken);

            const decode: JwtDecoder = jwtDecode(res.data.token);
            axios.get(`user/get-user-by-id/${decode.UserId}`).then(res => {
                dispatch({type: AuthActionTypes.LOGIN, payload: {token: res.data.token, user: res.data}});
            });
            navigate("/");
        }).catch(err => {
            console.log(err);
            alert("Error login");
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div style={{height: '100vh'}} className='d-flex flex-column align-middle justify-content-center'>
            {isLoading && <div>Loading...</div>}

            {(login.isDirty && login.isEmpty) && <div style={{color: "red"}}>Поле не может быть пустым!</div>}
            {(login.isDirty && login.minLenghtError) && <div style={{color: "red"}}>Некоректная длина!</div>}
            <InputGroup style={{width: '300px', height: '40px'}} className="mb-3 ms-auto me-auto">
                <Form.Control
                    placeholder="Login"
                    aria-label="Login"
                    aria-describedby="basic-addon1"
                    value={login.value}
                    onChange={e => login.onChange(e)}
                    onBlur={e => login.onBlur(e)}
                />
            </InputGroup>

            {(password.isDirty && password.isEmpty) && <div style={{color: "red"}}>Поле не может быть пустым!</div>}
            {(password.isDirty && password.minLenghtError) && <div style={{color: "red"}}>Некоректная длина!</div>}
            <InputGroup style={{width: '300px', height: '40px'}} className="mb-3 ms-auto me-auto">
                <Form.Control
                    placeholder="Password"
                    aria-label="Password"
                    type='password'
                    aria-describedby="basic-addon1"
                    value={password.value}
                    onChange={e => password.onChange(e)}
                    onBlur={e => password.onBlur(e)}
                />
            </InputGroup>

            <Button disabled={!login.inputValid || !password.inputValid} style={{width: '300px'}} className="ms-auto me-auto" onClick={() => postLogin(login.value, password.value)}>Login</Button>
        </div>
    );
}

export default Login;