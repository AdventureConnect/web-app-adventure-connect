import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
// import { useContext } from "react";
// import { RecoveryContext } from "../App";
import { LuBackpack } from 'react-icons/lu'

import bg from '../../styles/bg-photo.jpeg'
import logo from '../../styles/logo.png'
import LoginForm from "./LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  /*

	need to review implementing the one time password/password reset routes they are missing from the api router; would lovce to make a separate router for this


	the current uncommented code runs a successful login route that redirects to that user's profile


	we want to reroute to dashboard?
	-chandler
	*/

  // const { setOTP, setEmail } = useContext(RecoveryContext);

  // const sendOtp = async () => {
  //   if (userEmail) {
  //     try {
  //       const data = await fetch(
  //         `http://localhost:8080/api/check_email?email=${userEmail}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       const json = await data.json();
  //       console.log(json);
  //       if (json.user) {
  //         const OTP = Math.floor(Math.random() * 9000 + 1000);
  //         console.log(OTP);
  //         setOTP(OTP);
  //         setEmail(userEmail);

  //         try {
  //           await fetch(`http://localhost:8080/api/send_email`, {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             credentials: "include",
  //             body: JSON.stringify({
  //               OTP: OTP,
  //               recipient_email: userEmail,
  //             }),
  //           });
  //           navigate("/otp");
  //         } catch (err) {
  //           alert("User with this email does not exist!");
  //           console.log(response.data.message);
  //         }
  //       }
  //     } catch {}
  //   }

  if (authenticated) {
    return navigate("/userprofile", {
      state: { currentUser: currentUser, authenticated: authenticated },
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const credential = {
    //   email: userEmail,
    //   password: password,
    // };

    if (!username || !password) {
      setLoginError("Username and password are required")
      setTimeout(() => {
       setLoginError("");
      }, 2000)
      return;
    }
    try {
      const res = await axios.post('/api/login', { email: userEmail, password })
      
      if (res.data.error) {
        setLoginError(res.data.error);
        setTimeout(() => {
          setLoginError("");
        }, 2000)
        setUserName("")
        setPassword("")
        e.target.reset()
        return;
      }
      console.log(res.data);
      setAuthenticated(true);
      // navigate("/dashboard", {
      //   state: { currentUser: currentUser, authenticated: authenticated },
      // });
    } catch (err) {
      console.log("login not successful");
    }
  };

  return (
      <div className="flex justify-center items-center h-screen w-full p-10 bg-black/70">
        <div 
          className="
            flex
            flex-col
            items-center
            justify-center
            rounded-xl 
            h-full 
            bg-cover 
            bg-center 
            w-full
            text-zinc-200
          "
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="md:bg-black/30 bg-black/50 w-full h-full flex flex-col items-center justify-center rounded-xl">
            <div className="flex flex-col mb-36 absolute top-12 left-12">
              <div className="flex items-center gap-2">
                <h1 
                  className="
                    flex 
                    gap-2 
                    text-3xl 
                    font-bold 
                    text-zinc-300 
                    px-8 
                    mt-8 
                    rounded-full 
                    pointer-events-none
                  "
                >
                  Adventure Connect 
                  <LuBackpack className="text-blue-500" size={40}/>
                </h1> 
              </div>
              <h2 className="text-zinc-400 px-8 pointer-events-none">Find Friends Outdoors</h2>
            </div>
            {/* main div container for the form */}
            <LoginForm handleSubmit={handleSubmit} setUserName={setUserName} setPassword={setPassword} loginError={loginError} />
            <div className="flex gap-2 p-6">
              <div className="pointer-events-none">
                Dont have an account?
              </div>
              <span 
                className="
                  text-blue-500 
                  hover:text-blue-600 
                  hover:transform
                  hover:transition-all
                  hover:scale-110
                  cursor-pointer"
                onClick={() => navigate("signup")} >Sign up</span>
            </div>
            <a href="https://github.com/CampfireConnect/adventure-connect/tree/dev">
              <img className="absolute w-38 h-12 right-14 bottom-20 rounded-md bg-blue-600/80" src={logo} />
            </a>
          </div>
        </div>
      </div>
  );
};

export default Login;
