import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

          try {
            await fetch(`http://localhost:8080/api/send_email`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
                },
              credentials: 'include',
              body: JSON.stringify({
                  OTP: OTP,
                  recipient_email: userEmail
              })
            });
            navigate('/otp');
          }
          catch (err) {
            alert('User with this email does not exist!');
            console.log(response.data.message);
          }
}

  if (authenticated) {
    return navigate("/userprofile", {
      state: { currentUser: currentUser, authenticated: authenticated },
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credential = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      });
      // const json = await response.json();
      //if the verifyLogin middleware successful, then navigate to userprofile
      if (response.ok) {
        setAuthenticated(true);
        navigate("/userprofile", {
          state: { currentUser: currentUser, authenticated: authenticated },
        });
      } else {
        setLoginError(true); //to trigger the Invalid Login Information element to render
      }
    } catch (err) {
      setLoginError(true);
      console.log("login not successful");
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
            <p>Email</p>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {/* if loginError evaluates to true, then conditionally render element */}
          {loginError === true && (
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
