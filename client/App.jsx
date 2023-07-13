import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import PasswordReset from './components/PasswordReset.jsx'
import UserProfile from "./components/UserProfile.jsx";
import SettingsBar from "./components/Settings.jsx";
import EditProfile from "./components/EditProfile.jsx";
import AccountInterests from "./components/AccountInterests.jsx";
import AccountMgmt from "./components/AccountMgmt.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import Dashboard from "./components/Dashboard.jsx"
import "./styles.css"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/passwordreset" element={<PasswordReset />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/settings" element={<SettingsBar />} />
          <Route path="/account" element={<EditProfile />} />
          <Route path="/account/interests" element={<AccountInterests />} />
          <Route path="/account/management" element={<AccountMgmt />} />
          <Route path="/account/password" element={<ChangePassword />} />
          <Route path="*" element={<div>404 Error. This page was not found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
