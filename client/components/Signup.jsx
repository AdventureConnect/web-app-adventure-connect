import React, { useEffect, useState, history } from "react";
import Select from "react-select";
import { Navigate, useNavigate } from "react-router-dom";
import { set } from "mongoose";

const Signup = () => {
  const list = [
    { label: "Backpacking", value: "Backpacking" },
    { label: "Camping", value: "Camping" },
    { label: "Climbing", value: "Climbing" },
    { label: "Hiking", value: "Hiking" },
    { label: "Mountain Biking", value: "Mountain Biking" },
    { label: "Rafting", value: "Rafting" },
    { label: "Road Cycling", value: "Road Cycling" },
    { label: "Roller Skating", value: "Roller Skating" },
    { label: "Trail Running", value: "Trail Running" },
  ];

  const navigate = useNavigate();
  // const [ interestLabels, setInterestLabels ] = useState([]);
  const [interests, setInterests] = useState(new Set());
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [zipcode, setZipcode] = useState();
  const [bio, setBio] = useState();
  // const [redirect, setRedirect] = useState(false);
  const [emailInUse, setEmailInUse] = useState(false);
  const [emailTimeout, setEmailTimeout] = useState(null);
  const [badSignup, setBadSignup] = useState(false);
  const [activities, setActivities] = useState(list);
  const [validZipcode, setValidZipCode] = useState(true);

  //will be invoked by checkEmailTimer on typing, and will notify user in real time if account in use
  const checkEmailInUse = async (emailVal) => {
    try {
      const response = await fetch("http://localhost:8080/api/checkEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailVal }),
      });

      const data = await response.json();
      setEmailInUse(data);
    } catch (error) {
      console.log("Error in checkEmailInUse function:", error);
    }
  };

  //set a timeout to after typing has stopped
  const setCheckEmailTimer = (emailVal) => {
    if (emailInUse) setEmailInUse(false);
    setEmailTimeout(clearTimeout(emailTimeout));
    const timeout = setTimeout(() => checkEmailInUse(emailVal), 500);
    setEmailTimeout(timeout);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const info = {
      name: name,
      email: email,
      password: password,
      zipCode: zipcode,
      interests: Array.from(interests),
      bio: bio,
    };
    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(info),
      });

      if (response.ok) navigate("/imageupload", { state: { email: email } });
      else {
        setBadSignup(true);
      }
      return;
    } catch (err) {
      alert(`An error has occurred! ${err.message}`);
      return err;
    }
  };

  const removeInterest = (e) => {
    e.preventDefault();
    let interest = e.target.parentElement.getAttribute("interest");
    const tempInt = new Set(interests);
    const tempAct = activities.slice();
    tempInt.delete(interest);
    tempAct.push({ label: interest, value: interest });
    setInterests(tempInt);
    setActivities(tempAct.sort((a, b) => a.label.localeCompare(b.label)));
    console.log(interests);
  };

  const interestLabels = [];
  interests.forEach((interest) => {
    interestLabels.push(
      <div interest={interest}>
        {interest}
        <button className="deleteInterest" onClick={(e) => removeInterest(e)}>
          x
        </button>
      </div>
    );
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            require="true"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Email Address</label>
          <input
            type="text"
            require="true"
            onChange={(e) => {
              setEmail(e.target.value);
              console.log(e.target.value);
              setCheckEmailTimer(e.target.value);
            }}
          ></input>
          {emailInUse && <span> Hey, Find Another Email!</span>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            require="true"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Zipcode</label>
          <input
            type="text"
            require="true"
            onChange={(e) => {
              checkZipcode(e.target.value);
              setZipcode(e.target.value);
            }}
          ></input>
        </div>
        {/* <div>
          <label>Photos</label>
          <div
            style={{
              display: "grid",
              gridTemplate: "1fr 1fr 1fr",
              textAlign: "center",
            }}
          >
            {imageSelector}
          </div>
        </div> */}
        <div>
          <label>Interests</label>
          <Select
            placeholder=""
            options={activities}
            onChange={(opt) => {
              const tempInt = new Set(interests);
              let tempAct = activities.slice();
              tempInt.add(opt.value);
              tempAct = tempAct.filter((act) => act.label !== opt.value);
              setInterests(tempInt);
              // setActivities(tempAct);
            }}
          />
          <div id="interestBox">{interestLabels}</div>
        </div>
        <div>
          <label>Tell us more about yourself</label>
          <br></br>
          <input
            type="text"
            placeholder="Favorite outdoor memories
                    What are you looking for?"
            onChange={(e) => setBio(e.target.value)}
            style={{ height: "150px", width: "250px", textAlign: "top" }}
          ></input>
        </div>
        <button type="submit">Create Account</button>
      </form>
      {/* should conditionally render this message if handlesubmit is not successful */}
      {badSignup && <span> Invalid Signup, Try Again!</span>}
    </div>
  );
};

export default Signup;
