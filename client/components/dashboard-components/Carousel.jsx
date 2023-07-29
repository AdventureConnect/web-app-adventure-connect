import React, { useState, useEffect } from "react";
import { GrPrevious, GrNext } from 'react-icons/gr'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import list from '../data/list'
import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";

const Carousel = ({ users, isLoading, currentUser, setCurrentUser }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewable, setViewable] = useState(3);

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  useEffect(() => {
    // Add an event listener to handle window resize
    const handleResize = debounce(() => {
      // Check the screen width and update viewable accordingly
      if (window.innerWidth < 1125) {
        setViewable(2); // Set viewable to 1 when screen is below md size
      } else if (window.innerWidth < 1450){
        setViewable(3); // Set viewable to 3 for larger screens
      } else {
        setViewable(4);
      }
    });

    // Call the handleResize function initially and on window resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + viewable >= users.length ? users.length - 1 : prevIndex + viewable
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - viewable < 0 ? 0 : prevIndex - viewable
    );
  };

  const handleLike = async (user) => {
    try {
      const userId = user._id
  
      const response = await axios.put('/api/user/like', { 
        email: currentUser.email,
        userId
      })
      setCurrentUser(response.data)
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async (user) => {
    try {
      const userId = user._id
  
      const response = await axios.put('/api/user/unlike', { 
        email: currentUser.email,
        userId
      })
      setCurrentUser(response.data)
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col text-sm bg-inherit border border-l-0 border-y-0 border-gray-500/50 h-full min-w-[200px]">
        <div className="text-xl font-semibold">Discover</div>
        <div className="p-1 pl-3 hover:bg-gray-500/30 mx-5 rounded-md">Search</div>
        <div className="p-3">Search</div>
        <div className="p-3">Search</div>
      </div>
      <div className="flex flex-col">
        <div className="w-full h-full px-10 pt-10">Liked section</div>
        <div className="flex flex-col w-full h-full px-10 pt-10">
          <div className="pl-16">
            <div className="text-white text-2xl font-semibold">
              Top picks
            </div>
            <div className="text-white/50 text-sm">
              People in your area with similar interests
            </div>
          </div>
            <div className="flex gap-8 items-center">
              <div className="cursor-pointer scale-125 bg-white/30 hover:bg-white/40 rounded-md -translate-y-20" onClick={handlePrevious}>
                <GrPrevious size={20}/>
              </div>
              {/* profile cards */}
              <div className="flex gap-6 w-[320px] md:w-[840px] lg:w-[1075px] h-[600px] overflow-x-hidden border border-x-0 border-b-0 border-slate-700/70">
                {
                  users.slice(currentIndex, currentIndex + viewable).map((user, index) => {
                    return (
                      <div className="flex flex-col gap-2 pt-6 w-[250px]" key={index}>
                        <div className="w-[250px] h-[300px] overflow-hidden rounded-md">
                          <img
                            className="rounded-md w-full h-full object-cover object-bottom hover:transform hover:transition-all hover:scale-105"
                            src={user.images[0]}
                            alt={`Image ${index + 1}`}
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex justify-between">
                            <span className="text-xl font-semibold">{user.name}</span>
                            { currentUser.iLiked.find(item => item === user._id) ? 
                              <MdFavorite onClick={() => handleUnlike(user)} className="text-pink-600/80 hover:text-pink-500/80 cursor-pointer" size={30}/>
                              :
                              <MdFavoriteBorder onClick={() => handleLike(user)} className="text-gray-600/80 hover:text-gray-500/80 cursor-pointer" size={30}/>
                            }
                          </div>
                          <span className="text-white/50 text-sm">{user.bio}</span>
                          <div className="flex max-w-[280px] flex-wrap gap-3 mt-4">
                            {
                              user.interests.map((interest) => {
                                return (
                                  <div
                                    key={interest}
                                    interest={interest}
                                    className="
                                      flex
                                      bg-white/30
                                      text-sm
                                      p-2
                                      rounded-md  
                                    "
                                  >
                                    <span className="text-white">{interest}</span>
                                    <span>{list.find((item) => item.value === interest)?.icon}</span>
                                  </div>
                                )
                              })
                            }
                          </div>   
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div className="cursor-pointer scale-125 bg-white/30 hover:bg-white/40 rounded-md -translate-y-20" onClick={handleNext}>
                <GrNext size={20}/>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
