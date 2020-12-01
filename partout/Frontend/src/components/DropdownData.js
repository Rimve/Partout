import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import '../styles/App.css';

export const DropdownData = [
    {
        title: 'Profile',
        path: '/profile',
        icon: <FaIcons.FaUserCircle />,
        onClick: null
    },
    {
        title: 'Cart',
        path: '/items',
        icon: <FaIcons.FaShoppingCart />,
        onClick: null
    },
    {
        title: 'Logout',
        path: '/',
        icon: <BiIcons.BiLogOut />,
        onClick: () => handleLogout()
    }
];

function handleLogout() {
    localStorage.clear();
}