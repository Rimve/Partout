import React, {Component} from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import About from './pages/About'
import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            loggedInStatus: "NOT_LOGGED_IN"
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        this.checkLoginStatus();
    }

    handleLogout() {
        this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
        });
    }

    handleLogin(data) {
        localStorage.setItem('token', data);
        this.setState({
            loggedInStatus: "LOGGED_IN"
        });
    }

    checkLoginStatus() {
        if (localStorage.getItem("token") !== null) {
            this.setState({
                loggedInStatus: "LOGGED_IN"
            });
        }
        else {
            this.setState({
                loggedInStatus: "NOT_LOGGED_IN"
            });
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
                                    loggedInStatus={this.state.loggedInStatus}
                                />
                            )}
                        />
                        <Route path='/' exact component={Home} />
                        <Route path='/about' component={About} />
                        <Route path='/users' component={Users} />
                        <Route path='/login' render={props => (
                            <Login
                                {...props}
                                handleLogin={this.handleLogin}
                            />
                        )} />
                        <Route path='/register' component={Register} />
                    </Switch>
                </Router>
            </div>
        );
    }
}
