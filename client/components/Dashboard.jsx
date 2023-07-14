import React from "react";
import Carousel from "./Carousel"
import CarouselItem from "./CarouselItem";

const Dashboard = () => {

  const getUsers = async () => {
    console.log('get users function ran');
    try {
      const response = await fetch('http://localhost:8080/api/getUsers', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });

      console.log(response);
      
      if (response.ok) {
        const users = await response.json();
        console.log(users);
        return users;
      } else {
        throw new Error( `Status: ${response.status}`);
      }
    } catch (err) {
      alert(`An error has occurred grabbing users! ${err.message}`);
      throw err;
    }
  };

  getUsers();
  
  return (
    <div>
      <Carousel>
        <CarouselItem>Number 1</CarouselItem>
        <CarouselItem>Number 2</CarouselItem>
        <CarouselItem>Number 3</CarouselItem>
      </Carousel>
    </div>
  )
}

export default Dashboard;