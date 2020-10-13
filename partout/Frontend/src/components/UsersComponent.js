import React from 'react';
import UserService from '../services/UserService';

class UsersComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users:[],
            errorMessage: ''
        }
    }

    componentDidMount(){
        UserService.getUsers()
            .then((response) => {
                this.setState({ users: response.data})
            })
            .catch(err => {
                if (err.response.status === 403) {
                    this.setState({errorMessage: "You do not have the required rights"});
                }
                else {
                    this.setState({errorMessage: err.message});
                }
                console.log(err);
            });
    }

    render () {
        if (!this.state.errorMessage) {
            return (
                <div>
                    <h1 className='text-center color-accent'>Users List</h1>
                    <table className="table table-secondary">
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
                                    <tr key={user.id_User}>
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
        if (this.state.errorMessage) {
            return (<h3 className="alert-danger text-center"> { this.state.errorMessage } </h3>);
        }
    }
}

export default UsersComponent;