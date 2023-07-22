import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import HamburgerNav from './HamburgerNav';
import Navigation from "./Navigation";
import './NavBar.css'


const NavBar = () => {
    return (
        <div className="Navigation">
            <Navigation/>
            <HamburgerNav/>
        </div>
    )
}

export default NavBar;