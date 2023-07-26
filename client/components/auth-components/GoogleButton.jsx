import React from 'react'
import { FcGoogle } from 'react-icons/fc';

function GoogleButton() {
  return (
    <a 
        href={''}
        className="
        hover:transform 
        hover:transition-all 
        hover:scale-110 
        cursor-pointer 
        flex 
        items-center 
        justify-center 
        gap-2
        rounded-md
        text-sm
        p-2 
        "
    >
        <FcGoogle size={30}/>
        <span>Sign in with Google</span>
    </a>
      );
    };

export default GoogleButton
