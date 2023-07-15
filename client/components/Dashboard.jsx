import React, { Component } from "react";
import Carousel from "./Carousel";
import CarouselItem from "./CarouselItem";
import UserPage from "./UserPage";
import { useState } from "react";

const Dashboard = () => {
  const [matches, setMatches] = useState(0);

  const handleButtonIncrement = () => {
    setMatches(matches + 1);
  };

  return (
    <>
      <div>
        <Carousel />
      </div>
      <h2>You have {matches} matches!</h2>
      <button onClick={handleButtonIncrement}>Increment</button>
      <button>Find Matches</button>
    </>
  );
};

export default Dashboard;
