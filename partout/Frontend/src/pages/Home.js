import React, {Component} from 'react';
import {getUserRoles} from "../services/TokenValidator";
import '../styles/Home.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='home'>
                <h1 className='color-accent'>Status: {localStorage.getItem('status')}</h1>
                <h1 className='color-accent'>Roles: {getUserRoles(localStorage.getItem("token"))}</h1>
            </div>
        );
    }
}