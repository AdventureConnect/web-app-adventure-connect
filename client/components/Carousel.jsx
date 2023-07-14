import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = React.Children.count(children) - 1;
    }

    setActiveIndex(newIndex);
  };

  //Austin's version of Carousel
  // return (
  //   <>
  //   <div className="carousel-container">
  //   <div className="carousel">
  //     <div className="inner" style={{transform: `translateX(-${activeIndex * 100}%)`}}>
  //       {React.Children.map(children, (child, index) => {
  //         return React.cloneElement(child, {width: "100%"})
  //       })}
  //     </div>
  //   </div>
  //   <div className="indicators">
  //       <button onClick={() => updateIndex(activeIndex - 1)}>Dislike</button>
  //       <button onClick={() => updateIndex(activeIndex + 1)}>Like</button>
  //   </div>
  //   </div>
  //   </>
  // )
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel">
      <img key={currentIndex} src={images[currentIndex]} />
      <div className="slide_direction">
        <div className="left" onClick={handlePrevious}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 96 960 960"
            width="20"
          >
            <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
          </svg>
        </div>
        <div className="right" onClick={handleNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 96 960 960"
            width="20"
          >
            <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
          </svg>
        </div>
      </div>
      {/* <div className="indicator">
        {images.map((_, index) => (
          <div
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div> */}
    </div>
  );
};

export default Carousel;
