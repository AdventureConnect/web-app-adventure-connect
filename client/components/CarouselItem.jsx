import React from "react";
import UserPage from "./UserPage";

const CarouselItem = ({children, width}) => {
  return (
    <div className="carousel-item" style={{width:width}}>
      <UserPage/>
    </div>
  )
}

export default CarouselItem;