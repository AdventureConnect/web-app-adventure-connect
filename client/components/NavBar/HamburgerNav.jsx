import React, { useState } from 'react';
import { IoMenuOutline, IoClose } from 'react-icons/io5';
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
            {open ? closeIcon : hamburgerIcon}
            <div className={open ? 'menu show' : 'menu hide'}>
                <NavLinks/>
            </div>
        </nav>
    );
};

export default HamburgerNav;
