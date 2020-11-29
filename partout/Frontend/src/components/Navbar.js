import React, {useState} from 'react'
import * as RiIcons from 'react-icons/ri';
import { Link, Router, Route, Switch, withRouter } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../styles/Navbar.css';
import '../styles/App.css';
import {Dropdown, Form, FormControl, Nav} from "react-bootstrap";
import {DropdownData} from "./DropdownData";

function Navbar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const checkLoginStatus = () => {
        if (localStorage.getItem('status') === "LOGGED_IN") {
            return (
                <>
                    <span className='nav-small'>
                        <Dropdown className="text-field-height">
                            <Dropdown.Toggle className="shadow-none">
                                <b>{localStorage.getItem('username').toUpperCase()}</b>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {DropdownData.map((item, index) => {
                                    return <Dropdown.Item key={index} className={item.cName}>
                                        <Link to={item.path} className='dropdown-entry' onClick={item.onClick}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </Dropdown.Item>;
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </span>
                </>
            );
        }
        else {
            return (
                <>
                    <span>
                        <Link to='/login'>
                            <button className='button text-field-height'>
                                <b>Login</b>
                            </button>
                        </Link>
                    </span>
                    <span>
                        <Link to='/register'>
                            <button className='button text-field-height'>
                                <b>Register</b>
                            </button>
                        </Link>
                    </span>
                </>
            );
        }
    };

    return (
        <>
            <div className='navbar'>
                <Link to='#' className='menu-bars'>
                    <RiIcons.RiMenuUnfoldLine onClick={showSidebar}/>
                </Link>
                <Link to='/' className='title'>
                    <b>PartOut</b>
                </Link>
                <span>
                    <Form className='form-center'>
                        <FormControl type="text" placeholder="Search" className='text-field-height'/>
                        <span>
                            <button className='button-search text-field-height'>
                                <b>Search</b>
                            </button>
                        </span>
                    </Form>
                    {checkLoginStatus()}
                </span>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <RiIcons.RiCloseLine/>
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return <li key={index} className={item.cName}>
                            <Link to={item.path} className='icon'>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>;
                    })}
                </ul>
            </nav>
        </>
    );
}

export default withRouter(Navbar);