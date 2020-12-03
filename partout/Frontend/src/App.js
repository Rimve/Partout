import React, {Component} from 'react';
import './styles/App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Content from "./components/Content";

export default class App extends Component {
    render() {
        return (
            <div className='background-image'>
                <Router>
                    <Content />
                </Router>
            </div>
        );
    }
}
