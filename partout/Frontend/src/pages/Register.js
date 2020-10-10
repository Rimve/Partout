import React from 'react';
import '../styles/Login.css';
import * as FaIcons from 'react-icons/fa';
import {Form, FormControl} from "react-bootstrap";

export const Register = (props) => (
    <div className='div-login margin-top'>
        <Form className='form-login'>
            <FaIcons.FaUserCircle className='icon-profile align-center' />
            <FormControl type="text" placeholder="Username" className='text-field-login align-center' />
            <FormControl type="password" placeholder="Password" className='text-field-login align-center' />
            <FormControl type="password" placeholder="Repeat password" className='text-field-login align-center' />
            <FormControl type="email" placeholder="Email address" className='text-field-login align-center' />
            <FormControl type="phone" placeholder="Phone number" className='text-field-login align-center' />
            <button className='button-login align-center'>
                <b>Register</b>
            </button>
        </Form>
    </div>
);
export default Register;