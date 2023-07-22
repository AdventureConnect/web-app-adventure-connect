import React from 'react'
import { HiOutlineIdentification, HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { BsKey } from 'react-icons/bs';
import Select from "react-select";

function SignupForm({ 
        setName, 
        setEmail, 
        setPassword, 
        setZipcode, 
        interests,
        setInterests,
        activities, 
        setActivities,
        handleSubmit,
        list
    }) {
    
    const customOptionRenderer = ({ label, icon }) => (
      <div className="flex items-center gap-1 text-blue-500">
        <span className="text-gray-500">{label}</span>
        {icon}
      </div>
    )

    const selectedInterestsLabels = Array.from(interests).map((interest) => (
      <div key={interest} className="flex items-center gap-1 rounded-md p-2 text-zinc-300">
        <span>{interest}</span>
        {list.find((item) => item.value === interest)?.icon}
      </div>
    ));

  return (
    <div className="flex flex-col justify-center w-[350px] md:w-5/12 p-8 gap-8 h-full rounded-xl">
      <div className="flex flex-col gap-2">
        <span className="flex items-center text-3xl font-bold pointer-events-none">
          Create Your Account
        </span>
        <span className="text-zinc-400">Join now to connect with adventurers near you</span>
      </div>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="relative focus-within:text-gray-600 text-gray-400 block">
          <HiOutlineIdentification className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-3" />
          <input
            className="
              rounded-md
              w-full
              p-2
              bg-black
              border
              border-blue-500
              focus:text-zinc-200
              text-zinc-300
              text-sm
              font-bold
            "
            type="text"
            require="true"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="relative focus-within:text-gray-600 text-gray-400 block">
          <HiOutlineMail className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-3" />
          <input
            className="
              rounded-md
              w-full
              p-2
              bg-black
              border
              border-blue-500
              focus:text-zinc-200
              text-zinc-300
              text-sm
              font-bold
            "
            type="text"
            require="true"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative focus-within:text-gray-600 text-gray-400 block">
          <BsKey className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-3"/>            
          <input
            className="
              rounded-md
              w-full
              p-2
              bg-black
              border
              border-blue-500
              focus:text-zinc-200
              text-zinc-300
              text-sm
              font-bold
            "
            type="password"
            require="true"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="relative focus-within:text-gray-600 text-gray-400 block">
          <HiOutlineLocationMarker className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-3" />
          <input
            className="
              rounded-md
              w-full
              p-2
              bg-black
              border
              border-blue-500
              focus:text-zinc-200
              text-zinc-300
              text-sm
              font-bold
            "
            type="text"
            require="true"
            placeholder="Zipcode"
            onChange={(e) => setZipcode(e.target.value)}
          />
        </div>
        {/* <div>
                <label>Photos</label>
                <div style={{display: 'grid', gridTemplate: '1fr 1fr 1fr', textAlign: 'center'}}>
                    {imageSelector}
                </div>
            </div> */}
        <div className="font-bold text-sm text-gray-500">
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
                backgroundColor: "black",
                border: "blue" // Change the background color when focused
              }),
            }}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedInterestsLabels}
          </div>
        </div>
        {/* <div>
          <label>Tell us more about yourself</label>
          <br></br>
          <input
            type="text"
            placeholder="Favorite outdoor memories
                What are you looking for?"
            onChange={(e) => setBio(e.target.value)}
            style={{ height: "150px", width: "250px", textAlign: "top" }}
          />
        </div> */}
        <button className="bg-blue-600 p-3 w-full text-white rounded-lg hover:bg-blue-700 font-bold" type="submit">Create account</button>
      </form>
    </div>
  )
}

export default SignupForm
