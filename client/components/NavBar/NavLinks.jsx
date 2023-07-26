import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

const NavLinks = () => {
    return (
        <ul>
        <li>
            <a href="/dashboard">My dashboard</a>
        </li>
        <li>
            <a href="/likedusers">Liked users</a>
        </li>
        <li>
            <a href="/settings">Account settings</a>
        </li>
        <li>
            <a href="/">Signout</a>
        </li>
    </ul>
    )
}

export default NavLinks;