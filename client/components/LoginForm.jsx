import React from 'react'
import Input from './Input'

import { HiOutlineMail } from 'react-icons/hi'
import { BsKey } from 'react-icons/bs'
import GoogleButton from './GoogleButton'

function LoginForm({ handleSubmit, email, setUserEmail, password, setPassword, loginError }) {
  return (
    <div className="flex flex-col w-full md:w-[500px] bg-black/40 p-8 gap-4 text-zinc-300 rounded-xl">
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
      <form className="flex flex-col text-sm" onSubmit={handleSubmit}>
        <div className="relative flex items-center mt-7 text-sm font-bold text-gray-400 focus-within:text-gray-500">
          <Input handler={setUserEmail} val={email} type={"text"} text={"Email"} />
          <HiOutlineMail className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-3"/>    
        </div>
        <div className="relative flex items-center mt-7 text-sm font-bold text-gray-400 focus-within:text-gray-500">
          <Input handler={setPassword} val={password} type={"password"} text={"Password"} />
          <BsKey className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-3"/>    
        </div>
        {loginError && <span className='text-red-600 font-semibold mt-2'>{loginError}</span>}
        <span 
         className="
            w-[200px] 
            hover:transform
            hover:transition-all
            hover:scale-105
            hover:text-blue-600
            cursor-pointer
            my-4
          "
          onClick={() => sendOtp()}
        >
          Forgot your password?
        </span>
        <div className="flex gap-2">
            {/* <button className="bg-white" onClick={() => navigate("/signup")}>Register</button> */}
          <button 
            className="
              bg-blue-600 
              p-3 
              w-full 
              text-white 
              rounded-lg 
              hover:bg-blue-700 
              hover:transform 
              hover:transition-all 
              hover:scale-105
              font-bold
            " 
            type="submit"
          >
            Login
          </button>
        </div>
          <div className="flex flex-col gap-3 mt-6 text-center">
            <div className="flex items-center px-3">
              <div className="flex-grow border-b border-gray-400"></div>
              <div className="mx-4 text-sm text-gray-500">OR</div>
              <div className="flex-grow border-b border-gray-400"></div>
            </div>
            <GoogleButton />
          </div>
      </form>
      
    </div>
  )
}

export default LoginForm
