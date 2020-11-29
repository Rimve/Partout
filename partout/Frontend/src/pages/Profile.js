import React, {Component} from 'react';
import {getUserRoles} from "../services/TokenValidator";

export default class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='center'>
                <h1 className='color-accent'>Username: {localStorage.getItem('username')}</h1>
                <h1 className='color-accent'>Status: {localStorage.getItem('status')}</h1>
                <h1 className='color-accent'>Roles: {getUserRoles(localStorage.getItem("token"))}</h1>
            </div>
        );
    }
}