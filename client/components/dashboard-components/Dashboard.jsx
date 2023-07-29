import React, { useState, useEffect } from "react";
import Carousel from "./Carousel";
import NavBar from "../NavBar/NavBar";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({})
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user_id"))
    
    const getUsers = async () => {
      try {
        const response = await axios.get(`/api/getUsers/${userId}`)

        setUsers(response.data.users);
        setCurrentUser(response.data.currentUser)
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }

    getUsers();


  }, [])

  return (
    <div className="flex flex-col h-screen w-full bg-black text-white">
      <NavBar className="" />
      <Carousel users={users} currentUser={currentUser} setCurrentUser={setCurrentUser} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
