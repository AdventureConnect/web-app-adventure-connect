import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

const NavLinks = () => {
  // hooks muct be called inside the component
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    dispatch(logout());
  };
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
      <li onClick={handleLogout}>
        <a href="/">Signout</a>
      </li>
    </ul>
  );
};

export default NavLinks;
