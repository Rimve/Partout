import React, {Component} from 'react';
import {checkUserRoles} from "../services/TokenValidator";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    handleLogoutClick() {
        localStorage.removeItem('token');
        this.props.handleLogout();
    }

    render() {
        return (
            <div className='center'>
                <h1 className='color-accent'>Status: {this.props.loggedInStatus}</h1>
                <h1 className='color-accent'>Roles: {checkUserRoles(localStorage.getItem("token"))}</h1>
                <button onClick={() => this.handleLogoutClick()} className='button-login'>Logout</button>
            </div>
        );
    }
}