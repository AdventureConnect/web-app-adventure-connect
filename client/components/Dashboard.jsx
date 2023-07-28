import React, { Component } from "react";
import Carousel from "./Carousel";
import CarouselItem from "./CarouselItem";
import UserPage from "./UserPage";
import { useState } from "react";
import { useSelector } from "react-redux";
import MatchContainer from "../match-components/MatchContainer";
import NavBar from "./NavBar/NavBar";

const Dashboard = () => {
  // const { matchList, total } = useSelector((store) => store.matches);

  // const [matches, setMatches] = useState(0);

  const handleButtonIncrement = () => {
    // setMatches(matches + 1);
    console.log(total);
    console.log(matchList);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-black text-white">
      <NavBar />
      <Carousel />
      {/* <MatchContainer /> */}
    </div>
  );
};

export default Dashboard;
