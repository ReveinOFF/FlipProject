import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface UserLogin {
    UserName: string;
    Password: string;
}

const useValidation = (value, validation) => {
    const [isEmpty, setIsEmpty] = useState(true);
    const [minLenghtError, setMinLenghtError] = useState(false);
    const [inputValid, setInputValid] = useState(false);

    useEffect(() => {
        for(const valid in validation) {
            switch(valid) {
                case 'minLenght':
                    value.length < validation[valid] ? setMinLenghtError(true) : setMinLenghtError(false);
                    break;
                case 'isEmpty':
                    value ? setIsEmpty(false) : setIsEmpty(true);
                    break;
                default:
                    break;
            }
        }
    }, [value, validation]);

    useEffect(() => {
        if(isEmpty || minLenghtError) {
            setInputValid(false);
        }
        else {
            setInputValid(true);
        }
    }, [isEmpty, minLenghtError]);

    return {
        isEmpty,
        minLenghtError,
        inputValid
    }
}

const useInput = (initialValue, validation) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setIsDirty] = useState(false);
    const valid = useValidation(value, validation);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onBlur = (e) => {
        setIsDirty(true);
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

function Login() {
    const login = useInput('', {isEmpty: true, minLenght: 5});
    const password = useInput('', {isEmpty: true, minLenght: 8});
    const [isLoading, setIsLoading] = useState(false);

    function postLogin(userName: string, password: string) {
        const user: UserLogin = {UserName: userName, Password: password};
        setIsLoading(true);
        axios.post("http://localhost:5170/api/account/login", JSON.stringify(user), {headers: {'Content-Type': 'application/json'}}).then(res => {
            const { token } = res.data;
            localStorage.setItem('token', token);
            window.location.reload();
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