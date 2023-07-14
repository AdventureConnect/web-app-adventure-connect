import React from "react";

const CarouselItem = ({children, width}) => {
  return (
    <div className="carousel-item">
      {children}
    </div>
  )
}

export default CarouselItem;