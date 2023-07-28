import React, { useState } from "react";
import { GrPrevious, GrNext } from 'react-icons/gr'
// import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://cdn.pixabay.com/photo/2021/09/28/11/48/squirrel-6664212_1280.png",
  "https://cdn.pixabay.com/photo/2023/04/12/21/52/mountain-7921253_1280.png",
  "https://cdn.pixabay.com/photo/2023/02/07/18/56/rocket-7774875_1280.png",
  "https://cdn.pixabay.com/photo/2022/04/12/04/43/kiwi-7127148_1280.png",
  "https://cdn.pixabay.com/photo/2021/02/18/05/02/frog-6026117_1280.png",
  "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg?auto=compress&cs=tinysrgb&w=1600"

]

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= images.length ? 0 : prevIndex + 3
    );
  };
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 3 < 0 ? images.length - (images.length % 3) : prevIndex - 3
    );
  };
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div>
        <div className="text-white ml-16 text-3xl font-semibold">
          Top picks
        </div>
        <div className="ml-16 text-white/50">
          People with most in common
        </div>
        <div className="flex gap-8 items-center">
          <div className="cursor-pointer bg-white/30 hover:bg-white/40 rounded-md" onClick={handlePrevious}>
            <GrPrevious size={30}/>
          </div>
          {/* profile cards */}
          <div className="flex gap-8 w-[1000px] overflow-x-hidden p-3 border border-x-0 border-b-0 border-slate-700/70">
            {
              images.slice(currentIndex, currentIndex + 3).map((image, index) => {
                return (
                  <div key={index} className="max-w-[300px] max-h-[300px] hover:transform hover:transition-all hover:scale-105">
                    <img
                      className="rounded-md w-full h-full object-cover object-bottom outline-none"
                      key={index}
                      src={image}
                    />
                  </div>
                )
              })
            }
          </div>
          <div className="cursor-pointer bg-white/30 hover:bg-white/40 rounded-md" onClick={handleNext}>
            <GrNext size={30}/>
          </div>
        </div>
      </div>
    </div>
  );
};

//   return (
//     <div className="carousel">
//       {/* <img key={currentIndex} src={images[currentIndex]} />
//       <div className="slide_direction">
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
//         </div> */}
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
//   );
// };
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
/*
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
      // {/* <CarouselItem name={data}/> */
//       </div>
//       <div className="indicators">
//         <button>Dislike</button>
//         <button onClick={handleLikeClick}>Like</button>
//       </div>
//     </div>
//     </>
//   )
// }

export default Carousel;
