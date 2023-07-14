import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import PasswordReset from "./components/PasswordReset.jsx";
import UserProfile from "./components/UserProfile.jsx";
import SettingsBar from "./components/Settings.jsx";
import EditProfile from "./components/EditProfile.jsx";
import AccountInterests from "./components/AccountInterests.jsx";
import AccountMgmt from "./components/AccountMgmt.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import Dashboard from "./components/Dashboard.jsx"
import Header from "./components/Header.jsx";
import "./styles.css"
import Dashboard from "./components/Dashboard.jsx";
import "./styles.css";

const App = () => {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<SettingsBar />} /> this component needs to go somewhere */}
          {/* <Route index element={<Login />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/passwordreset" element={<PasswordReset />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/account" element={<EditProfile />} />
          <Route path="/account/interests" element={<AccountInterests />} />
          <Route path="/account/management" element={<AccountMgmt />} />
          <Route path="/account/password" element={<ChangePassword />} />
          <Route
            path="*"
            element={<div>404 Error. This page was not found</div>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

//account
