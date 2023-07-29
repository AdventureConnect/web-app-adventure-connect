import React from 'react';
import NavLinks from "./NavLinks";
import { GiLightBackpack } from 'react-icons/gi';
import './NavBar.css';

const Navigation = () => {
    return (
      <nav className="Navigation flex justify-between border border-x-0 border-t-0 border-gray-600/40">
        <div className="flex flex-col">
            <div className="flex items-center justify-center gap-2">
              <h1
                className="
                  text-md
                  flex
                  gap-2
                  md:text-lg
                  font-bold
                  px-8
                  
                  pointer-events-none
              "
              >
                Adventure Connect
                <GiLightBackpack className="text-blue-500 translate-y-1" size={20} />
              </h1>
            </div>
          </div>
        <NavLinks/>
      </nav>
    )
}

export default Navigation;