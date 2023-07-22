import React from 'react'
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
        handleSubmit
    }) {

  const interestLabels = [];
  interests.forEach((interest) => {
    interestLabels.push(
      <div interest={interest}>
        {interest}
        <button className="deleteInterest" onClick={(e) => removeInterest(e)}>
          x
        </button>
      </div>
    );
  });
  return (
    <div className="flex flex-col w-[350px] md:w-[500px] p-8 gap-8 ml-8 bg-black/60 text-zinc-300 rounded-xl">
      <div className="flex flex-col gap-2">
        <span className="flex items-center text-4xl font-bold pointer-events-none">
          Create your account
        </span>
        <span className="text-zinc-400">Join now to connect with adventurers near you</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            require="true"
            placeholder="Name"
            
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            require="true"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            require="true"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
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
        <div>
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
          />
          <div id="interestBox">{interestLabels}</div>
        </div>
        <div>
          <label>Tell us more about yourself</label>
          <br></br>
          <input
            type="text"
            placeholder="Favorite outdoor memories
                What are you looking for?"
            onChange={(e) => setBio(e.target.value)}
            style={{ height: "150px", width: "250px", textAlign: "top" }}
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  )
}

export default SignupForm
