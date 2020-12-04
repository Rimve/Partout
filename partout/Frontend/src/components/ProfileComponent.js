import React from "react";
import {getUserRoles} from "../services/TokenValidator";
import '../styles/Profile.css';

class ProfileComponent extends React.Component {
    render () {
        return (
            <>
                <div className='content-container'>
                    <h1 className='color-accent'>Username: {localStorage.getItem('username')}</h1>
                    <h1 className='color-accent'>Status: {localStorage.getItem('status')}</h1>
                    <h1 className='color-accent'>Roles: {getUserRoles(localStorage.getItem("token"))}</h1>
                </div>
            </>
        );
    }
}

export default ProfileComponent;