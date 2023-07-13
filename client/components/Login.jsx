import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState();
  const [loginError, setLoginError] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  if (authenticated) {
    return navigate("/userprofile", {
      state: { currentUser: currentUser, authenticated: authenticated },
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credential = {
      username: username,
      password: password,
    };
    try {
      const data = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      });
      const json = await data.json();
      setAuthenticated(true);
      navigate("/userprofile", {
        state: { currentUser: currentUser, authenticated: authenticated },
      });
    } catch (err) {
      setAuthenticated(false);
      setLoginError(true);
    }
  };

  return (
    <div>
      <h1>
        Adventure<br></br>Connect
      </h1>
      <h2>Find Friends Outdoors</h2>
      <div id="login_container">
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" onChange={(e) => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {loginError && (
            <p style={{ color: "red" }}>
              Invalid login information. Please try again or{" "}
              <a href="/signup">sign up</a>.
            </p>
          )}
          <div>
            <button onClick={() => navigate("/signup")}>Register</button>
            <button type="submit">Login</button>
          </div>
        </form>
        <Link to="/passwordreset">Forgot your passowrd?</Link>
      </div>
    </div>
  );
};

export default Login;
