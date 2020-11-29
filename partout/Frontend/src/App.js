import React, {Component} from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {getUserName} from "./services/TokenValidator";
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import About from './pages/About'
import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Profile from "./pages/Profile";

export default class App extends Component {
    constructor() {
        super();

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        this.checkLoginStatus();
    }

    handleLogout() {
        localStorage.clear();
        localStorage.setItem('status', "NOT_LOGGED_IN");
    }

    handleLogin(data) {
        localStorage.setItem('username', getUserName(data));
        localStorage.setItem('token', data);
        localStorage.setItem('status', "LOGGED_IN");
    }

    checkLoginStatus() {
        if (localStorage.getItem("token") !== null) {
            localStorage.setItem('status', "LOGGED_IN");
        }
        else {
            localStorage.setItem('status', "NOT_LOGGED_IN");
        }
    }

    render() {
        return (
            <div className='background-image'>
                <Router>
                    <Navbar/>
                    <Switch>
                        <Route
                            exact
                            path={"/"}
                            render={props => (
                                <Home
                                    {...props}
                                    handleLogout={this.handleLogout}
                                    loggedInStatus={localStorage.getItem('status')}
                                />
                            )}
                        />
                        <Route path='/' exact component={Home} />
                        <Route path='/about' component={About} />
                        <Route path='/users' component={Users} />
                        <Route path='/items' component={Products} />
                        <Route path='/profile' component={Profile} />
                        <Route path='/login' render={props => (
                            <Login
                                {...props}
                                handleLogin={this.handleLogin}
                            />
                        )} />
                        <Route path='/register' render={props => (
                            <Register
                                {...props}
                            />
                        )} />
                    </Switch>
                </Router>
            </div>
        );
    }
}
