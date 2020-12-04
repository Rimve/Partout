import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import '../styles/App.css';

export const DropdownData = [
    {
        title: 'Profile',
        path: '/profile',
        icon: <FaIcons.FaUserCircle />,
        onClick: () => temp()
    },
    {
        title: 'Cart',
        path: '/cart',
        icon: <FaIcons.FaShoppingCart />,
        onClick: () => temp()
    },
    {
        title: 'Logout',
        path: '/',
        icon: <BiIcons.BiLogOut />,
        onClick: () => handleLogout()
    }
];

function handleLogout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('status');
}

function temp() {

}