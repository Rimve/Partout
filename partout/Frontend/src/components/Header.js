import React, {Component} from 'react';
import Navbar from "./Navbar";
import '../styles/Header.css';

export default class Header extends Component {
    render() {
        return (
            <div className='header'>
                <Navbar />
            </div>
        )
    }
}