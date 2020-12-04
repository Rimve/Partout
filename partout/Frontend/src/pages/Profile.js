import React, {Component} from 'react';
import ProfileComponent from "../components/ProfileComponent";

export default class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className='profile-page'>
                    <ProfileComponent />
                </div>
            </>
        );
    }
}