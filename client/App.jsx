import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import SettingsBar from "./components/Settings.jsx";
import EditProfile from "./components/EditProfile.jsx";
import AccountInterests from "./components/AccountInterests.jsx";
import AccountMgmt from "./components/AccountMgmt.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import "./styles.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<SettingsBar />} /> this component needs to go somewhere */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<EditProfile />}>
            <Route path="interests" element={<AccountInterests />} />
            <Route path="management" element={<AccountMgmt />} />
            <Route path="password" element={<ChangePassword />} />
          </Route>
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
