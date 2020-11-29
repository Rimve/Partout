import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';

export const DropdownData = [
    {
        title: 'Profile',
        path: '/profile',
        icon: <FaIcons.FaUserCircle />,
        cName: '',
        onClick: null
    },
    {
        title: 'Cart',
        path: '/items',
        icon: <FaIcons.FaShoppingCart />,
        cName: '',
        onClick: null
    },
    {
        title: 'Logout',
        path: '/',
        icon: <BiIcons.BiLogOut />,
        cName: '',
        onClick: () => handleLogout()
    }
];

function handleLogout() {
    localStorage.clear();
}