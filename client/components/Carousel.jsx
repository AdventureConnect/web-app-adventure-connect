import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

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
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel">
        <img
          key={currentIndex}
          src={images[currentIndex]}
        /><div className="slide_direction">
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
// import React, { useState } from "react"

// const Carousel = ({ children }) => {
//   const [activeIndex, setActiveIndex] = useState(0)

//   const updateIndex = (newIndex) => {
//     if (newIndex < 0) {
//       newIndex = 0
//     } else if (newIndex >= React.Children.count(children)) {
//       newIndex = React.Children.count(children) - 1
//     }

//     setActiveIndex(newIndex)
//   }

//   return (
//     <div className="carousel">
//         <img
//           key={currentIndex}
//           src={images[currentIndex]}
//         /><div className="slide_direction">
//         <div className="left" onClick={handlePrevious}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             height="20"
//             viewBox="0 96 960 960"
//             width="20"
//           >
//             <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
//           </svg>
//         </div>
//         <div className="right" onClick={handleNext}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             height="20"
//             viewBox="0 96 960 960"
//             width="20"
//           >
//             <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
//           </svg>
//         </div>
//       </div>
//       {/* <div className="indicator">
//         {images.map((_, index) => (
//           <div
//             key={index}
//             className={`dot ${currentIndex === index ? "active" : ""}`}
//             onClick={() => handleDotClick(index)}
//           ></div>
//         ))}
//       </div> */}
//     </div>
//   );
// };

//   return (
//     <div className="carousel">
//         <img
//           key={currentIndex}
//           src={images[currentIndex]}
//         /><div className="slide_direction">
//         <div className="left" onClick={handlePrevious}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             height="20"
//             viewBox="0 96 960 960"
//             width="20"
//           >
//             <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
//           </svg>
//         </div>
//         <div className="right" onClick={handleNext}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             height="20"
//             viewBox="0 96 960 960"
//             width="20"
//           >
//             <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
//           </svg>
//         </div>
//       </div>
//       {/* <div className="indicator">
//         {images.map((_, index) => (
//           <div
//             key={index}
//             className={`dot ${currentIndex === index ? "active" : ""}`}
//             onClick={() => handleDotClick(index)}
//           ></div>
//         ))}
//       </div> */}
//     </div>
//   );
// };
import React, { useState, useEffect } from "react"
import CarouselItem from "./CarouselItem";

const Carousel = ({ children }) => {
  const [likes, setLikes] = useState(0);
  const [poolUsers, setPoolUsers] = useState([]);

  // make the request to get matching users
  useEffect(()=> {
    fetch('/api/findInterests')
      .then(res => res.json())
      .then(data => {
        // this is where we set the array to be the data gotten back from the query
        console.log(data, 'this is the data');
        console.log(Array.isArray(data), 'this should return true if this is an array');
        console.log(data.length, 'this should log the length of the array');
        setPoolUsers(data.slice(0)) // this is the array
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  // render a new user to show every time someone clicks on like button
  const handleLikeClick = () => {
    setPoolUsers(poolUsers.slice(0,-1))
  }

  const test = JSON.stringify(poolUsers[0])
  console.log(poolUsers);
  // console.log(typeof test);
  // const parsedData = JSON.parse(test)
  // console.log(parsedData);
  // const name = test.name
  // console.log(poolUsers);

  return (
    <>
    <div>{test}</div>
    <div className="carousel-container">
      <div className="carousel">
      {/* <CarouselItem name={data}/> */}
      </div>
      <div className="indicators">
        <button>Dislike</button>
        <button onClick={handleLikeClick}>Like</button>
      </div>
    </div>
    </>
  )
}

export default Carousel;
