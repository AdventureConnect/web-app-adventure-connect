import React, { useState } from 'react';
import { IoMenuOutline, IoClose } from 'react-icons/io5';
import { GiLightBackpack } from 'react-icons/gi'
import NavLinks from './NavLinks';

const HamburgerNav = () => {
    const [open, setOpen] = useState(false);

    const hamburgerIcon = (
        <IoMenuOutline
            className="MenuIcon"
            size="40px"
            color="black"
            onClick={() => setOpen(!open)}
        />
    );

    const closeIcon = (
        <IoClose
            className="MenuIcon"
            size="40px"
            color="black"
            onClick={() => setOpen(!open)}
        />
    );

    return (
        <nav className="HamburgerNav">
          <div className="flex flex-col absolute -top-2 left-0">
            <div className="flex items-center gap-2">
              <h1
                className="
                  text-3xl
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
            {open ? closeIcon : hamburgerIcon}
            <div className={open ? 'menu show' : 'menu hide'}>
                <NavLinks/>
            </div>
        </nav>
    );
};

export default HamburgerNav;
