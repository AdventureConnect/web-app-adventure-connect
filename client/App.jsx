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
          {/* <Route index element={<SettingsBar />} /> this component needs to go somewhere */}
          <Route index element={<Login />} /> </Routes> 
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
<<<<<<< HEAD
          <Route path="/passwordreset" element={<PasswordReset />} />
          <Route path="/userprofile" element={<UserProfile />} />
=======
          <Route path="/account" element={<EditProfile />} >
          <Route path="/interests" element={<AccountInterests />} />
          <Route path="/management" element={<AccountMgmt />} />
          <Route path="/password" element={<ChangePassword />} />
        </Route>
          <Route path="*" element={<div>404 Error. This page was not found</div>} />
>>>>>>> main
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

//account
