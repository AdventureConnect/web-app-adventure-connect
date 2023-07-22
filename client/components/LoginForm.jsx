import React from 'react'

import { HiOutlineIdentification } from 'react-icons/hi'
import { BsKey } from 'react-icons/bs'

function LoginForm({ handleSubmit, setUserName, setPassword, loginError }) {
  return (
    <div className="flex flex-col w-[350px] md:w-[500px] p-8 gap-8 ml-8 bg-black/60 text-zinc-300 rounded-xl">
      <div className="flex flex-col gap-2">
        <span className="flex items-center text-4xl font-bold pointer-events-none">
            Sign In
        </span>
        <div className="flex gap-2 text-blue-600">
            <span className="text-zinc-400 pointer-events-none">
            Login to connect with other adventurers!
            </span>
        </div>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="relative focus-within:text-gray-600 text-gray-400 block">
          <HiOutlineIdentification className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-3"/>            
          <input 
            className="
              rounded-md 
              shadow-xl
              w-full 
              p-3 
              bg-zinc-200
              focus:bg-zinc-100
              focus:text-black
              text-black
              font-bold
            " 
            type="text" 
            placeholder="Username" 
            onChange={(e) => setUserName(e.target.value)} 
          />
        </div>
        <div className="relative focus-within:text-gray-600 text-gray-400 block">
          <BsKey className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-3"/>            
          <input
            className="
              rounded-md 
              shadow-xl 
              w-full 
              p-3
              bg-zinc-200
              focus:text-black
              text-black
              font-bold
            "
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {loginError && <span className='text-red-600 font-semibold'>{loginError}</span>}
        <div className="flex gap-2">
            {/* <button className="bg-white" onClick={() => navigate("/signup")}>Register</button> */}
          <button className="bg-blue-600 p-3 w-full text-white rounded-lg hover:bg-blue-700 font-bold" type="submit">Login</button>
        </div>
      </form>
      <span 
        className="
          w-[200px] 
          hover:transform
          hover:transition-all
          hover:scale-105
          hover:text-blue-600
          cursor-pointer
        "
        onClick={() => sendOtp()}
      >
        Forgot your password?
      </span>
    </div>
  )
}

export default LoginForm
