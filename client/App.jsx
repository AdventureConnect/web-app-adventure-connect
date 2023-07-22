import React, { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import PasswordReset from "./components/PasswordReset.jsx";
import UserProfile from "./components/UserProfile.jsx";
import UserSpecific from "./components/UserSpecific.jsx";
import SettingsContainer from "./components/Settings.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ImageUpload from "./components/ImageUpload.jsx";
import OTP from "./components/OTP.jsx";
export const RecoveryContext = createContext();
import Header from "./components/Header.jsx";
import Matches from "./components/Matches.jsx";

const App = () => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");

  return (
    <div>
      <RecoveryContext.Provider value={{ otp, setOTP, email, setEmail }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route index element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/passwordreset" element={<PasswordReset />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/settings" element={<SettingsContainer />} />
            <Route path="/account/password" element={<ChangePassword />} />
            <Route
              path="*"
              element={<div>404 Error. This page was not found</div>}
            />
            <Route path="/userspecific" element={<UserSpecific />} />
            <Route path="/imageupload" element={<ImageUpload />} />
            <Route path="/otp" element={<OTP />} />
          </Routes>
        </BrowserRouter>
      </RecoveryContext.Provider>
    </div>
  );
};

export default App;
