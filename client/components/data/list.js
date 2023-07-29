import React from "react";
import { LuBike } from "react-icons/lu";
import { FaRunning, FaHiking } from "react-icons/fa";
import {
  GiCampingTent,
  GiMountainClimbing,
  GiCanoe,
  GiRollerSkate,
  GiRoad,
  GiLightBackpack,
} from "react-icons/gi";

const list = [
    {
      label: "Backpacking",
      value: "Backpacking",
      icon: <GiLightBackpack size={20} className="text-blue-500" />,
    },
    {
      label: "Camping",
      value: "Camping",
      icon: <GiCampingTent size={20} className="text-orange-500" />,
    },
    {
      label: "Climbing",
      value: "Climbing",
      icon: <GiMountainClimbing size={20} className="text-red-500" />,
    },
    {
      label: "Hiking",
      value: "Hiking",
      icon: <FaHiking size={20} className="text-green-500" />,
    },
    {
      label: "Mountain Biking",
      value: "Mountain Biking",
      icon: <LuBike size={20} className="text-purple-500" />,
    },
    {
      label: "Rafting",
      value: "Rafting",
      icon: <GiCanoe size={20} className="text-teal-500" />,
    },
    {
      label: "Road Cycling",
      value: "Road Cycling",
      icon: <GiRoad size={20} className="text-indigo-500" />,
    },
    {
      label: "Roller Skating",
      value: "Roller Skating",
      icon: <GiRollerSkate size={20} className="text-pink-500" />,
    },
    {
      label: "Trail Running",
      value: "Trail Running",
      icon: <FaRunning size={20} className="text-sky-500" />,
    },
  ];

  export default list