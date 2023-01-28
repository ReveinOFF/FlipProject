import axios from 'axios';
import { url } from 'inspector';
import { config } from 'process';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useNavigate, useParams } from "react-router-dom";


function Confirmpassword() {
    const {email, token} = useParams();
    const [password, setpassword] = useState(null);
    const [Confirmpassword, setConfirmpassword] = useState(null);
    return (
        <div style={{ height: '100vh' }} className='d-flex flex-column align-middle justify-content-center'>
            <InputGroup style={{ width: '300px', height: '40px' }} className="mb-3 ms-auto me-auto">
                <Form.Control
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    onChange={e => {setpassword(e.target.value);}}
                />
            </InputGroup>
            <InputGroup style={{ width: '300px', height: '40px' }} className="mb-3 ms-auto me-auto">
            <Form.Control
                    placeholder="Confirm password"
                    aria-label="Confirm password"
                    aria-describedby="basic-addon1"
                    onChange={e => {setConfirmpassword(e.target.value);}}
                />
            </InputGroup>
            <Button style={{ width: '300px', height: '40px' }} className="mb-4 ms-auto me-auto" >
                <Link className="w-300 text-center" style={{ textAlign: "left", color: 'white'}} to="/login" onClick={e =>{axios.post('https://localhost:7170/api/Account/ConfirmPassword', {
                    email:email,
                    token:token,
                    newPassword: password
                })}}>Confirm</Link>
            </Button>
        </div>
    )
    const RequestAxios = () => {
        axios.post('https://localhost:7170');
    }
}


export default Confirmpassword;