import React, {Component} from 'react';
import '../styles/Login.css';
import LoginComponent from "../components/LoginComponent";

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push("/");
    }

    render() {
        return (
            <LoginComponent handleSuccessfulAuth={this.handleSuccessfulAuth} />
        );
    }
}