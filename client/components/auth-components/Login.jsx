import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login, reset } from "../../features/auth/authSlice";
// import { useContext } from "react";
// import { RecoveryContext } from "../App";
import { GiLightBackpack } from "react-icons/gi";

import bg from "../../../styles/bg-photo.jpeg";
import logo from "../../../styles/logo.png";
import LoginForm from "./LoginForm";

const Login = () => {
  const { user, user_id } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [currentUser, setCurrentUser] = useState("");
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

  // useEffect(() => {
  //   //if there is an error we want to send an error message
  //   if (isError) alert(message);
  //   // if sign up is successful (re: stgate updating) we want to send them on their way to dashboard
  //   if (isSuccess) {
  //     navigate("/dashboard");
  //   }
  //   dispatch(reset());
  // }, [user, isError, isSuccess, navigate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail || !password) {
      setLoginError("Username and password are required");
      return;
    }
    // try {
    // error handling needs to updated -Chandler
    dispatch(login({ email: userEmail.toLowerCase(), password }))
      .unwrap()
      .then((user) => {
        navigate("dashboard");
      })
      .catch(() => setLoginError("Invalid username or password"));
    // need to prevent navigating to dashboard
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-black/60 p-10">
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
        <div className="md:bg-black/40 bg-black/50 w-full h-full flex flex-col items-center justify-center rounded-xl">
          <div className="flex flex-col mb-12 ">
            <div className="flex items-center gap-2">
              <h1
                className="
                    flex 
                    gap-2 
                    text-3xl 
                    md:text-4xl
                    font-bold 
                    text-zinc-300 
                    px-8 
                    mt-8 
                    rounded-full 
                    pointer-events-none
                  "
              >
                Adventure Connect
                <GiLightBackpack className="text-blue-500" size={40} />
              </h1>
            </div>
            <h2 className="text-zinc-400 px-8 pointer-events-none">
              Find Friends Outdoors
            </h2>
          </div>
          <LoginForm
            handleSubmit={handleSubmit}
            email={userEmail}
            setUserEmail={setUserEmail}
            password={password}
            setPassword={setPassword}
            loginError={loginError}
          />
          <div className="flex gap-2 p-6">
            <div className="pointer-events-none">Dont have an account?</div>
            <span
              className="
                  text-blue-500 
                  hover:text-blue-600 
                  hover:transform
                  hover:transition-all
                  hover:scale-110
                  cursor-pointer"
              onClick={() => navigate("signup")}
            >
              Sign up
            </span>
          </div>
          <a href="https://github.com/CampfireConnect/adventure-connect/tree/dev">
            <img
              className="hover:bg-blue-700/80 hover:transform hover:transition-all hover:scale-110 absolute w-38 h-12 right-14 bottom-20 rounded-md bg-blue-600/80"
              src={logo}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
