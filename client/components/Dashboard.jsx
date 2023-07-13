import React from "react";
import Carousel from "./Carousel"
import CarouselItem from "./CarouselItem";

const Dashboard = () => {
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