import React, { useState } from 'react'
import { HiOutlineIdentification, HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { BsKey } from 'react-icons/bs';
import Select from "react-select";
import Input from './Input';

function SignupForm({ 
        name,
        setName, 
        email,
        setEmail, 
        password,
        setPassword,
        zipcode, 
        setZipcode, 
        interests,
        setInterests,
        removeInterest,
        activities, 
        setActivities,
        handleSubmit,
        bio,
        setBio,
        list,
        error,
        setError
}) {

  const [ nextPage, setNextPage ] = useState(false);

  console.log(password)
    
  const customOptionRenderer = ({ label, icon }) => (
    <div className="flex items-center gap-1">
      <span className="text-gray-500">{label}</span>
      {icon}
    </div>
  )

  const selectedInterestsLabels = Array.from(interests).map((interest) => (
    <div key={interest} interest={interest} className="flex items-center border border-sky-500 group group-hover:bg- gap-1 p-3 text-zinc-300 relative">
      <span>{interest}</span>
      {list.find((item) => item.value === interest)?.icon}
      <span 
        className="
          cursor-pointer 
          absolute 
          top-0 
          right-1
          font-bold 
          text-zinc-500 
          hover:text-zinc-400
        "
        onClick={(e) => removeInterest(e)}
      >
        x
      </span>
    </div>
  ));

  return (
    <div className="flex flex-col justify-center w-full md:w-[500px] xl:w-[600px] bg-black/40 p-8 gap-8 mt-20 rounded-xl">
      <div className="flex flex-col gap-2">
        <span className="flex items-center text-3xl font-bold pointer-events-none">
          Create Your Account
        </span>
        <span className="text-zinc-400 pointer-events-none">
          {nextPage === false 
            ? 'Join now to connect with others near you' 
            : 'These details will help us match you with others'
          }
        </span>
      </div>
      <form className="flex flex-col " onSubmit={handleSubmit}>
        { !nextPage && <>
        <div className="relative flex items-center mt-6 text-sm font-bold text-gray-400 focus-within:text-gray-500">
          <Input handler={setName} val={name} type={"text"} text={"Name"} />
          <HiOutlineIdentification className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-3"/>    
        </div>
        <div className="relative flex items-center mt-6 text-sm font-bold text-gray-400 focus-within:text-gray-500">
          <Input handler={setEmail} val={email} type={"email"} text={"Email"} />
          <HiOutlineMail className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-3"/>    
        </div>
        <div className="relative flex items-center mt-6 text-sm font-bold text-gray-400 focus-within:text-gray-500">
          <Input handler={setPassword} val={password} type={"password"} text={"Password"} />
          <BsKey className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-3"/>    
        </div>
        { error && <span className="text-red-600 font-bold text-sm mt-2">{error}</span>}
        <div 
          onClick={() => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

            if (!name || !password || !email) {
              setError("All fields are required")
              return
            } 

            if (!emailRegex.test(email)) {
              setError("Invalid email")
              return;
            }
            setNextPage(true)
            setError("")
          }}
          className="
            bg-blue-600/80 
            p-3 
            w-full 
            text-white
            text-center 
            rounded-lg 
            mt-8
            mb-4
            hover:bg-blue-700 
            hover:transform
            hover:transition-all
            hover:scale-105
            font-bold
            cursor-pointer
            text-sm
          " 
        >
          Next step
        </div></>}
        {/* Next page of form starts here */}
        { nextPage && 
        <div className='flex flex-col gap-4'>
          <div className="relative flex items-center  text-sm font-bold text-gray-400 focus-within:text-gray-500">
            <Input handler={setZipcode} val={zipcode} type={"text"} text={"Zipcode"} />
            <HiOutlineLocationMarker className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-3"/>    
          </div>
          {/* <div>
                  <label>Photos</label>
                  <div style={{display: 'grid', gridTemplate: '1fr 1fr 1fr', textAlign: 'center'}}>
                      {imageSelector}
                  </div>
              </div> */}
          <div className="font-bold text-sm text-gray-600 flex flex-col gap-2">
            <Select
              placeholder="Interests"
              options={activities}
              onChange={(opt) => {
                const tempInt = new Set(interests);
                let tempAct = activities.slice();
                tempInt.add(opt.value);
                tempAct = tempAct.filter((act) => act.label !== opt.value);
                setInterests(tempInt);
                setActivities(tempAct);
              }}
              isOptionSelected={(option) => interests.has(option.value)}
              formatOptionLabel={customOptionRenderer}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  padding: 3,
                  color: "rgba(0, 0, 0)",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                }),
                indicatorSeparator: (provided) => ({
                  ...provided,
                  backgroundColor: "#6B7280", // Change the color of the indicator separator line here
                }),
                dropdownIndicator: (provided, state) => ({
                  ...provided,
                  color: "#6B7280", // Change the color of the dropdown arrow here
                  "&:hover": {
                    color: "#4B5563", // Change the color when hovering over the dropdown arrow here
                  },
                }),
                // Add other custom styles if needed
                // ...
              }}
              value=""
            />
            <div className="flex flex-wrap gap-2">
              {selectedInterestsLabels}
            </div>
          </div>
          <div className="relative flex items-center mb-4 text-sm font-bold text-gray-400 focus-within:text-gray-500">
            <textarea
              className="
                w-full 
                p-3 
                font-bold 
                rounded-md 
                peer
                text-sm 
                text-black
                bg-white/80
                focus:bg-white/95
              "
              type="text"
              id="text-area"
              placeholder="Tell us more about you..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div> 
          { error && <span className="text-red-600 font-bold text-sm">{error}</span>}
          <div className="flex gap-2">
            <button 
              className="
                bg-gray-500/80
                hover:bg-gray-600
                hover:transform
                hover:transition-all
                hover:scale-95
                font-bold 
                rounded-md
                w-1/3
              " 
              onClick={() => setNextPage(false)}
            >
              Previous
            </button>
            <button 
              className="
                bg-blue-600/80 
                p-3 
                w-full 
                text-white 
                rounded-md
                hover:bg-blue-700 
                hover:transform
                hover:transition-all
                hover:scale-95
                font-bold
              " 
              type="submit"
              onSubmit={handleSubmit}
            >
              Create account
            </button>
          </div>
        </div>}
      </form>
    </div>
  )
}

export default SignupForm
