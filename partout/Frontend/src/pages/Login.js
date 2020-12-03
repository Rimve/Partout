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
            <>
                <div className='fill-screen'>
                    <LoginComponent handleSuccessfulAuth={this.handleSuccessfulAuth} />
                </div>
            </>
        );
    }
}