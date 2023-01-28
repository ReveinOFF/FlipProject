import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useNavigate } from "react-router-dom";


function RecoverPassword() {
    const [email, setEmail] = useState(null);
     return (
        <div  style={{height: '100vh'}} className='d-flex flex-column align-middle justify-content-center'>
            <InputGroup style={{width: '300px', height: '40px'}} className="mb-3 ms-auto me-auto">
                <Form.Control
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    onChange={e => {setEmail(e.target.value);}}
                />
            </InputGroup>
            <Button style={{width: '300px', height: '40px'}} className="mb-4 ms-auto me-auto" onClick={e =>{axios.post('https://localhost:7170/api/Account/RecoverPassword?email='+ email)}}>Send email</Button>
        </div>
    );
}

export default RecoverPassword;