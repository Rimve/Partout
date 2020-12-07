import React from 'react';
import UserService from '../services/UserService';
import '../styles/Users.css';
import CreateUserComponent from "./CreateUserComponent";

class UsersComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users:[],
            errorMessage: "You do not have the required rights",
            createdUser: false
        }
    }

    callbackFunction = (childData) => {
        this.getUsers();
    }

    getUsers() {
        UserService.getUsers()
            .then((response) => {
                this.setState({ users: response.data})
                this.setState({errorMessage: ''});
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

    componentDidMount(){
        this.getUsers();
    }

    handleRemove = (userId) => {
        UserService.deleteByUserId(userId)
            .then((response) => {
                this.setState(this.state)
                alert("User has been deleted");
            })
            .catch(err => {
                alert("Something went wrong");
            });
        this.getUsers();
    };

    showTable() {
        if (!this.state.errorMessage) {
            return (
                <div>
                    <h1 className='text-center color-accent'>Users List</h1>
                    <table className="table">
                        <thead className='table-head'>
                        <tr>
                            <td>User ID</td>
                            <td>Username</td>
                            <td>Email</td>
                            <td>Phone Number</td>
                            <td></td>
                            <td></td>
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
                                        <td><button className='modal-btn remove-btn' onClick={() => this.handleRemove(user.id_User)}>
                                            <b>Remove</b></button></td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <CreateUserComponent shouldReload={this.callbackFunction}/>
                </div>
            );
        }
        if (this.state.errorMessage) {
            return (<h3 className="alert-danger text-center"> { this.state.errorMessage } </h3>);
        }
    }

    render () {
        return (
            <div className='user-container'>
                <div className='center-user-container'>
                    {this.showTable()}
                </div>
            </div>
        );
    }
}

export default UsersComponent;