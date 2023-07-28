import React, { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth-components/Login.jsx";
import Signup from "./components/auth-components/Signup.jsx";
import PasswordReset from "./components/auth-components/PasswordReset.jsx";
import UserProfile from "./components/profile-components/UserProfile.jsx";
import UserSpecific from "./components/profile-components/UserSpecific.jsx";
import SettingsContainer from "./components/NavBar/Settings.jsx";
import Dashboard from "./components/dashboard-components/Dashboard.jsx";
import ImageUpload from "./components/dashboard-components/ImageUpload.jsx";
import OTP from "./components/auth-components/OTP.jsx";
import LikedUsers from "./components/dashboard-components/LikedUsers.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";


export const RecoveryContext = createContext();
// import Header from "./components/Header.jsx";
// import Matches from "./components/Matches.jsx";

const App = () => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");

  return (
    <div>
      {/* <RecoveryContext.Provider value={{ otp, setOTP, email, setEmail }}> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route index element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/passwordreset" element={<PasswordReset />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/settings" element={<SettingsContainer />} />
            {/* <Route path="/account/password" element={<ChangePassword />} /> */}
            <Route
              path="*"
              element={<div>404 Error. This page was not found</div>}
            />
            <Route path="/likedusers" element={<LikedUsers />} />
            <Route path="/userspecific" element={<UserSpecific />} />
            <Route path="/imageupload" element={<ImageUpload />} />
            <Route path="/otp" element={<OTP />} />
          </Routes>
        </BrowserRouter>
      {/* </RecoveryContext.Provider> */}
      <NavBar />
    </div>
  );
};

export default App;
