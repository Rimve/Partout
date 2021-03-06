import React, { Component } from 'react';
import '../styles/Login.css';
import {Form, FormControl} from "react-bootstrap";
import UserService from "../services/UserService";
import axios from "axios";

export default class CreateUserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {},
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({
            input
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if(this.validate()){
            let input = {};
            input["username"] = "";
            input["password"] = "";
            input["email"] = "";
            input["phone"] = "";
            input["role"] = "";
            this.setState({input: input});

            axios
                .post(
                    UserService.getUserApi(),
                    {
                        username: this.state.input["username"],
                        password: this.state.input["password"],
                        email: this.state.input["email"],
                        phone_number: this.state.input["phone"],
                        role: this.state.input["role"]
                    }
                )
                .then(response => {
                    if (response.status === 201) {
                        alert("User created successfully");
                        this.props.shouldReload(true);
                    }
                })
                .catch(error => {
                    console.log(error);
                    if (error.response.status === 409) {
                        alert("Username is already taken");
                    }
                });
        }
        else {

        }
    }

    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["username"]) {
            isValid = false;
            errors["username"] = "Please enter your username";
        }

        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password";
        }

        if (typeof input["password"] !== "undefined") {
            if (input["password"].length < 8) {
                isValid = false;
                errors["password"] = "Password must be at least 8 characters long";
            }
        }

        if (typeof input["role"] === 'undefined') {
            isValid = false;
            errors["role"] = "Please specify user role";
        }

        if (!input["email"]) {
            isValid = false;
            errors["email"] = "Please enter your email address";
        }

        if (typeof input["email"] !== "undefined") {
            const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

            var pattern = new RegExp(expression);
            if (!pattern.test(input["email"])) {
                isValid = false;
                errors["email"] = "Please enter a valid email address";
            }
        }

        if (!input["phone"]) {
            isValid = false;
            errors["phone"] = "Please enter your phone number";
        }

        if (typeof input["phone"] !== "undefined") {

            var pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(input["phone"])) {
                isValid = false;
                errors["phone"] = "Please enter only numbers";
            }
            else if(input["phone"].length < 8){
                isValid = false;
                errors["phone"] = "Please enter a valid phone number";
            }
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    render () {
        return (
            <div className='div-login margin-top'>
                <Form className='form-login' onSubmit={this.handleSubmit}>

                    <label className="text align-start"><b>Username*</b></label>
                    <FormControl
                        type="text"
                        name="username"
                        value={this.state.input.username}
                        onChange={this.handleChange}
                        placeholder="Enter your username"
                        className='text-field-login align-center'
                        id="username"/>
                    <div className="text-danger align-warning">{this.state.errors.username}</div>

                    <label className="text align-start"><b>Password*</b></label>
                    <FormControl
                        type="password"
                        name="password"
                        value={this.state.input.password}
                        onChange={this.handleChange}
                        placeholder="Enter your password"
                        className='text-field-login align-center'
                        id="password"/>
                    <div className="text-danger align-warning">{this.state.errors.password}</div>

                    <label className="text align-start"><b>Email*</b></label>
                    <FormControl
                        type="email"
                        name="email"
                        value={this.state.input.email}
                        onChange={this.handleChange}
                        placeholder="Enter your email address"
                        className='text-field-login align-center'
                        id="email"/>
                    <div className="text-danger align-warning">{this.state.errors.email}</div>

                    <label className="text align-start"><b>Phone number*</b></label>
                    <FormControl
                        type="phone"
                        name="phone"
                        value={this.state.input.phone}
                        onChange={this.handleChange}
                        placeholder="Enter your phone number"
                        className='text-field-login align-center'
                        id="phone"/>
                    <label className="text-danger align-warning">{this.state.errors.phone}</label>

                    <label className="text align-start"><b>Role*</b></label>
                    <FormControl
                        as="select"
                        name="role"
                        value={this.state.input.role}
                        onChange={this.handleChange}
                        placeholder="Which category fits your product best?"
                        className='text-field-login align-center'
                        id="role">
                        <option />
                        <option>ROLE_USER</option>
                        <option>ROLE_ADMIN</option>
                    </FormControl>

                    <button className='button-login align-center'>
                        <b>Create</b>
                    </button>
                </Form>
            </div>
        );
    }
}