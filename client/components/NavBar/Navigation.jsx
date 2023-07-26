import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import './NavBar.css';
import NavBar from './NavBar';

const Navigation = () => {
    return (
        <nav className="Navigation">
      <NavLinks/>
      </nav>
    )
}

export default Navigation;