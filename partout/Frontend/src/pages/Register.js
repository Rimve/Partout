import React, {Component} from 'react';
import '../styles/Login.css';
import RegisterComponent from "../components/RegisterComponent";

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulRegister = this.handleSuccessfulRegister.bind(this);
    }

    handleSuccessfulRegister() {
        this.props.history.push("/");
    }

    render() {
        return (
            <>
                <div className='fill-screen'>
                    <RegisterComponent handleSuccessfulRegister={this.handleSuccessfulRegister} />
                </div>
            </>
        );
    }
}