import React, { useState } from "react";
import { useNavigate } from "react-router";

import bg from "../../styles/bg-photo3.jpeg"

import SignupForm from "./SignupForm";
import { LuBackpack, LuBike } from "react-icons/lu";
import { FaRunning, FaHiking } from "react-icons/fa"
import { GiCampingTent, GiMountainClimbing, GiCanoe, GiRollerSkate, GiRoad, GiLightBackpack } from "react-icons/gi"


const list = [
  { label: "Backpacking", value: "Backpacking", icon: <GiLightBackpack size={20} className="text-blue-500"/> },
  { label: "Camping", value: "Camping", icon: <GiCampingTent size={20} className="text-orange-500"/>},
  { label: "Climbing", value: "Climbing", icon: <GiMountainClimbing size={20} className="text-red-500" /> },
  { label: "Hiking", value: "Hiking", icon: <FaHiking size={20} className="text-green-500" /> },
  { label: "Mountain Biking", value: "Mountain Biking", icon: <LuBike size={20} className="text-purple-500" /> },
  { label: "Rafting", value: "Rafting", icon: <GiCanoe size={20} className="text-teal-500" /> },
  { label: "Road Cycling", value: "Road Cycling", icon: <GiRoad size={20} className="text-indigo-500" /> },
  { label: "Roller Skating", value: "Roller Skating", icon: <GiRollerSkate size={20} className="text-pink-500" />},
  { label: "Trail Running", value: "Trail Running", icon: <FaRunning size={20} className="text-sky-500" /> },
];

const Signup = () => {
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
      fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(info),
      });
      navigate("/imageupload", { state: { email: email } });
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
            md:bg-black/50 
            bg-black/50 
            w-full 
            h-full 
            flex 
            flex-col
            items-end 
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
                  text-4xl
                  font-bold
                  px-8
                  mt-8
                  rounded-full
                  pointer-events-none
              ">
                Adventure Connect
                <GiLightBackpack className="text-blue-500" size={40}/>
              </h1>
            </div>
            <h2 className="text-zinc-400 px-8 pointer-events-none">Find Friends Outdoors</h2>
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
            list={list}
          />
          <div className="flex gap-2 p-6">
              <div className="pointer-events-none">
                Already have an account?
              </div>
              <span 
                className="
                  text-blue-500 
                  hover:text-blue-600 
                  hover:transform
                  hover:transition-all
                  hover:scale-110
                  cursor-pointer"
                onClick={() => navigate("/")} >Sign in</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
