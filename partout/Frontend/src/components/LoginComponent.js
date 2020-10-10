import React, { Component } from 'react';
import '../styles/Login.css';
import {Form, FormControl} from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';
import UserService from '../services/UserService';
import axios from "axios";

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            loginErrors: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState( {
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { username, password } = this.state;
        axios
            .post(
                UserService.getAuthApi(),
                {
                    username: username,
                    password: password
                }
            )
            .then(response => {
                console.log("Login response: ", response.status);
                if (response.status === 200) {
                    this.props.handleSuccessfulAuth(response.data.jwt);
                }
            })
            .catch(error => {
                console.log("Login error: ", error);
            });
    }

    render () {
        return (
            <div className='div-login margin-top'>
                <Form className='form-login' onSubmit={this.handleSubmit}>
                    <FaIcons.FaUserCircle className='icon-profile align-center' />
                    <FormControl name="username" type="text" onChange={this.handleChange} placeholder="Username" className='text-field-login align-center' />
                    <FormControl name="password" type="password" onChange={this.handleChange} placeholder="Password" className='text-field-login align-center' />
                    <button className='button-login align-center' type="submit" >
                        <b>Login</b>
                    </button>
                </Form>
            </div>
        );
    }
}