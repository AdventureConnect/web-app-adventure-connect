import React from 'react';
import HamburgerNav from './HamburgerNav';
import Navigation from "./Navigation";
import './NavBar.css'


const NavBar = () => {
    return (
        <div className="NavBar">
            <Navigation/>
            <HamburgerNav/>
        </div>
    )
}

export default NavBar;