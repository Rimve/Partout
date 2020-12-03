import React, {useState, useEffect} from 'react'
import * as RiIcons from 'react-icons/ri';
import * as IoIcons from 'react-icons/io';
import { Link, withRouter } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../styles/Navbar.css';
import '../styles/App.css';
import '../styles/Responsive.css';
import {DropdownData} from "./DropdownData";
import SearchComponent from "./SearchComponent";

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const [button, setButton] = useState(true);
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showSidebar = () => setSidebar(!sidebar);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    const checkLoginStatus = () => {
        if (localStorage.getItem('status') === "LOGGED_IN") {
            return (
                <>
                    <div className='menu-icon' onClick={handleClick}>
                        <b className='accent-color cursor-remove'>
                            {localStorage.getItem('username').toUpperCase()}
                            {click ? <IoIcons.IoIosArrowUp /> : <IoIcons.IoIosArrowDown />}
                        </b>
                    </div>
                    <ul className={click ? 'profile active' : 'profile'}>
                        {DropdownData.map((item, index) => {
                            return (
                                <li key={index} className='prof-text'>
                                    <Link to={item.path} className='icon' onClick={function() {item.onClick(); closeMobileMenu()}}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </>
            );
        }
        else {
            return (
                <>
                    <div className='menu-icon' onClick={handleClick}>
                        <Link to='#' className='menu-bars'>
                            {click ? <RiIcons.RiCloseLine /> : <RiIcons.RiMenuFoldLine />}
                        </Link>
                    </div>
                    <ul className={click ? 'res-menu active' : 'res-menu'}>
                        <li className='res-item'>
                            <Link to='/login' onClick={closeMobileMenu}>
                                <button className='button text-field-height'>
                                    <b>Login</b>
                                </button>
                            </Link>
                        </li>
                        <li className='res-item'>
                            <Link to='/register' onClick={closeMobileMenu}>
                                <button className='button text-field-height'>
                                    <b>Register</b>
                                </button>
                            </Link>
                        </li>
                    </ul>
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
                <SearchComponent />
                {checkLoginStatus()}
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