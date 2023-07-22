import React from 'react'

function Temp() {
  return (
    <div>
       <div>
        <label>Email Address</label>
        <input
          type="text"
          require="true"
          onChange={(e) => {
            setEmail(e.target.value);
            console.log(e.target.value);
            setCheckEmailTimer(e.target.value);
          }}
        ></input>
        {/* {emailInUse && <span> Hey, Find Another Email!</span>} */}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          require="true"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Zipcode</label>
        <input
          type="text"
          require="true"
          onChange={(e) => {
            checkZipcode(e.target.value);
            setZipcode(e.target.value);
          }}
        ></input>
      </div>
      {/* <div>
          <label>Photos</label>
          <div
            style={{
              display: "grid",
              gridTemplate: "1fr 1fr 1fr",
              textAlign: "center",
            }}
          >
            {imageSelector}
          </div>
        </div> */}
      <div>
        <label>Interests</label>
        <Select
          placeholder=""
          options={activities}
          onChange={(opt) => {
            const tempInt = new Set(interests);
            let tempAct = activities.slice();
            tempInt.add(opt.value);
            tempAct = tempAct.filter((act) => act.label !== opt.value);
            setInterests(tempInt);
            // setActivities(tempAct);
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
        ></input>
      </div>
      <button type="submit">Create Account</button>
      {/* </form> */}
      {/* should conditionally render this message if handlesubmit is not successful */}
      {/* {badSignup && <span> Invalid Signup, Try Again!</span>} */}
      {/* </div> */}
    </div>
  )
}

export default Temp
