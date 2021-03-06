import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import '../styles/Content.css';
import Home from "../pages/Home";
import About from "../pages/About";
import Users from "../pages/Users";
import Products from "../pages/Products";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import {getUserName} from "../services/TokenValidator";
import {Orders} from "../pages/Orders";
import ShoppingCart from "../pages/ShoppingCart";
import Header from "./Header";
import Footer from "./Footer";

export default class Content extends Component {
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
        } else {
            localStorage.setItem('status', "NOT_LOGGED_IN");
        }
    }

    render() {
        return (
            <div className='content'>
                <Header />
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
                        <Route path='/orders' component={Orders} />
                        <Route path='/profile' component={Profile} />
                        <Route path='/cart' component={ShoppingCart} />
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
                <Footer />
            </div>
        );
    }
}
