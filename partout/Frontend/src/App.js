import React, {Component} from 'react';
import './styles/App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";

export default class App extends Component {
    render() {
        return (
            <div className='background-image'>
                <Router>
                    <Header />
                    <Content />
                    <Footer />
                </Router>
            </div>
        );
    }
}
