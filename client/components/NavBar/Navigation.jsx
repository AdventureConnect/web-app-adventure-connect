import React from 'react';
import NavLinks from "./NavLinks";
import { GiLightBackpack } from 'react-icons/gi';
import './NavBar.css';

const Navigation = () => {
    return (
      <nav className="Navigation border border-x-0 border-t-0 border-gray-600/40">
        <div className="flex flex-col absolute -top-2 left-0">
            <div className="flex items-center gap-2">
              <h1
                className="
                  text-xl
                  flex
                  gap-2
                  md:text-2xl
                  font-bold
                  px-8
                  mt-8
                  rounded-full
                  pointer-events-none
              "
              >
                Adventure Connect
                <GiLightBackpack className="text-blue-500" size={30} />
              </h1>
            </div>
          </div>
        <NavLinks/>
      </nav>
    )
}

export default Navigation;