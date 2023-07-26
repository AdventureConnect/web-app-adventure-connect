import React from "react";
import UserPage from "../profile-components/UserPage";

const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      <UserPage />
    </div>
  );
};

export default CarouselItem;
