import React, {useState} from 'react'
import * as RiIcons from 'react-icons/ri';
import { Link, Router, Route, Switch, withRouter } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../styles/Navbar.css';
import '../styles/App.css';
import {Form, FormControl, Nav} from "react-bootstrap";

function Navbar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

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