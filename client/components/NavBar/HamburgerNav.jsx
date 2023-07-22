import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import './NavBar.css';

const HamburgerNav = () => {
    return (
        <nav className="HamburgerNav">
        <NavLinks/>
        </nav>
    )
}

export default HamburgerNav;