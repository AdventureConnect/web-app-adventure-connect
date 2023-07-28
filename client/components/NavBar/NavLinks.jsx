import React from 'react';
import { Navigate } from "react-router-dom";

const handleLogout = () => {
    localStorage.clear();
}

const NavLinks = () => {
    return (
        <div className="">
          <ul className="">
            <li>
                <a href="/dashboard">My dashboard</a>
            </li>
            <li>
                <a href="/likedusers">Liked users</a>
            </li>
            <li>
                <a href="/settings">Account settings</a>
            </li>
            <li onClick={handleLogout}>
                <a href="/">Signout</a>
            </li>
          </ul>
        </div>
    )
}

export default NavLinks;