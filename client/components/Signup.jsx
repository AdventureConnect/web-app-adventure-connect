import React, { useState } from "react";
import { useNavigate } from "react-router";

/**
 * imports for redux
 */
import { useDispatch, useSelector } from "react-redux";
import registerUser from "../features/auth/authActions";

import bg from "../../styles/bg-photo5.jpeg";

import SignupForm from "./SignupForm";
import { LuBackpack } from "react-icons/lu";

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

const Signup = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [ interestLabels, setInterestLabels ] = useState([]);
  const [interests, setInterests] = useState(new Set());
  const [activities, setActivities] = useState(list);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [zipcode, setZipcode] = useState();
  const [bio, setBio] = useState();
  /**
   * asyncronous function that initiates a fetch request to the API route when user clicks submit
   * @param {*} e
   * @returns status of reponse from server
   */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const info = {
      name: name,
      email: email,
      password: password,
      zipCode: zipcode,
      interests: interests,
      bio: bio,
    };
    try {
      fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(info),
      });
      navigate("/dashboard");
      dispatch(registerUser(info));
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
        <div
          className="
            md:bg-black/30 
            bg-black/50 
            w-full 
            h-full 
            flex 
            flex-col 
            items-center 
            justify-center 
            rounded-xl
          "
        >
          <div className="flex flex-col mb-36 absolute top-12 left-12">
            <div className="flex items-center gap-2">
              <h1
                className="
                  flex
                  gap-2
                  text-3xl
                  font-bold
                  px-8
                  mt-8
                  rounded-full
                  pointer-events-none
              "
              >
                Adventure Connect
                <LuBackpack className="text-blue-500" size={40} />
              </h1>
            </div>
          </div>
          <SignupForm
            setActivities={setActivities}
            setEmail={setEmail}
            setName={setName}
            setPassword={setPassword}
            setZipcode={setZipcode}
            interests={interests}
            setInterests={setInterests}
            handleSubmit={handleSubmit}
            activities={activities}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
