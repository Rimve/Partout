import React from 'react';
import UserService from '../services/UserService';

class UsersComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            users:[]
        }
    }

    componentDidMount(){
        UserService.getUsers().then((response) => {
            this.setState({ users: response.data})
        });
    }

    render () {
        return (
            <div>
                <h1 className='text-center'>Users List</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>User ID</td>
                            <td>Username</td>
                            <td>Email</td>
                            <td>Phone Number</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map(
                            user =>
                                <tr key = {user.id_User}>
                                    <td>{user.id_User}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone_number}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default UsersComponent;