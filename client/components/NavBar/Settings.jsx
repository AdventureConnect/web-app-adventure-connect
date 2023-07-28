import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import Select from "react-select";

const activities = [
  { label: "Backpacking", value: "Backpacking" },
  { label: "Camping", value: "Camping" },
  { label: "Climbing", value: "Climbing" },
  { label: "Hiking", value: "Hiking" },
  { label: "Mountain Biking", value: "Mountain Biking" },
  { label: "Rafting", value: "Rafting" },
  { label: "Road Cycling", value: "Road Cycling" },
  { label: "Roller Skating", value: "Roller Skating" },
  { label: "Trail Running", value: "Trail Running" },
];
const settingsContainerStyle = {
  display: "flex",
  fontFamily: "Lato",
};
const settingsLabelsStyle = {
  flexDirection: "column",
  display: "flex",
  alignItems: "flex-end",
  marginRight: "20px",
  cursor: "pointer",
  fontFamily: "Lato",
};
const verticalLineStyle = {
  width: "2px",
  backgroundColor: "#ccc",
  marginLeft: "20px",
  height: "100vh",
};
const settingOptionsStyle = {
  marginLeft: "30px",
  flexDirection: "column",
};
const buttonStyle = {
  height: "30px",
  cursor: "pointer",
  borderRadius: "5px",
  border: "none",
  height: "35px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  backgroundColor: "#D3D3D3",
};
const submitButtonContainerStyle = {
  display: "flex",
  justifyContent: "left",
  marginTop: "20px",
  // m
};
const SettingsContainer = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    zipCode: "",
    interests: [],
    bio: "",
  });
  const [selectedOption, setSelectedOption] = useState("editProfile");
  const [interestLabels, setInterestLabels] = useState([]);
  const [interests, setInterests] = useState([]);
  const saveChangesText = "Save\nChanges";
  useEffect(() => {
    // Fetch the user's data from the backend (MongoDB) and populate the state
    // You can use your preferred method/library for making API requests
    // For example, using fetch:
    fetch("http://localhost:8080/api/user")
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);
  const handleProfileSave = (updatedProfile) => {
    // Update the user's profile information in the state and send the updated data to the backend
    setUser((prevUser) => ({ ...prevUser, ...updatedProfile }));
    fetch("http://localhost:8080/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Profile data updated successfully");
          navigate("/settingsContainer");
          alert("Your user information was successfully updated!");
        } else {
          console.error("Failed to update profile data");
        }
      })
      .catch((error) => {
        console.error("Error updating profile data:", error);
      });
  };
  const handleAccountSave = (updatedAccount) => {
    // Update the user's account information in the state and send the updated data to the backend
    setUser((prevUser) => ({ ...prevUser, ...updatedAccount }));
    fetch("http://localhost:8080/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Account data updated successfully");
        } else {
          console.error("Failed to update account data");
        }
      })
      .catch((error) => {
        console.error("Error updating account data:", error);
      });
  };
  // const handleInterestsSave = (updatedInterests) => {
  //   // Update the user's interests in the state and send the updated data to the backend
  //   setUser(prevUser => ({ ...prevUser, interests: updatedInterests }));
  //   fetch('http://localhost:8080/api/user', {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       interests: updatedInterests
  //     }),
  //   })
  //     .then(response => {
  //       if (response.ok) {
  //         console.log('Interests data updated successfully');
  //       } else {
  //         console.error('Failed to update interests data');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error updating interests data:', error);
  //     });
  // };
  const handleInterestsSave = (event) => {
    event.preventDefault();
    // Extract the updated interests from the state
    const updatedInterests = interests;
    // Create a separate object with only the updated interests
    const updatedData = {
      interests: updatedInterests,
    };
    // Update the user's interests in the state and send the updated data to the backend
    setUser((prevUser) => ({
      ...prevUser,
      interests: updatedInterests,
    }));
    fetch("http://localhost:8080/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Interests data updated successfully");
        } else {
          console.error("Failed to update interests data");
        }
      })
      .catch((error) => {
        console.error("Error updating interests data:", error);
      });
  };
  const renderSettingsComponent = () => {
    switch (selectedOption) {
      case "editProfile":
        return (
          //all these divs need stylikng
          <div style={settingOptionsStyle}>
            <h3>Name</h3>
            <input
              type="text"
              value={user.name}
              onChange={(e) =>
                setUser((prevUser) => ({ ...prevUser, name: e.target.value }))
              }
            />
            <h3>Zip Code</h3>
            <input
              type="text"
              value={user.zipCode}
              onChange={(e) =>
                setUser((prevUser) => ({
                  ...prevUser,
                  zipCode: e.target.value,
                }))
              }
            />
            <h3>Bio</h3>
            <textarea
              value={user.bio}
              onChange={(e) =>
                setUser((prevUser) => ({ ...prevUser, bio: e.target.value }))
              }
            ></textarea>
            <div style={submitButtonContainerStyle}>
              <button style={buttonStyle} onClick={handleProfileSave}>
                {saveChangesText}
              </button>
            </div>
          </div>
        );
      case "accountMgmt":
        return (
          <div>
            <h3>Email</h3>
            <input
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser((prevUser) => ({ ...prevUser, email: e.target.value }))
              }
            />
            <h3>Password</h3>
            <input
              type="password"
              value={user.password}
              onChange={(e) =>
                setUser((prevUser) => ({
                  ...prevUser,
                  password: e.target.value,
                }))
              }
            />
            <div style={submitButtonContainerStyle}>
              <button style={buttonStyle} onClick={handleAccountSave}>
                Save Changes
              </button>
            </div>
          </div>
        );
      case "interests":
        return (
          <div>
            <h3>Interests</h3>
            {/* <input
                type="text"
                value={user.interests.join(', ')}
                onChange={(e) => setUser(prevUser => ({ ...prevUser, interests: e.target.value.split(', ') }))}
              /> */}
            <div>
              <form>
                <Select
                  options={activities}
                  onChange={(opt) => {
                    const temp = interestLabels.slice();
                    const interestsTemp = interests.slice();
                    temp.push(
                      <label key={opt.value.toLowerCase()}>{opt.value}</label>
                    );
                    interestsTemp.push(opt.value);
                    setInterestLabels(temp);
                    setInterests(interestsTemp);
                    console.log(interests);
                  }}
                />
              </form>
              <div id="interestBox">{interestLabels}</div>
            </div>
            <div style={submitButtonContainerStyle}>
              <button style={buttonStyle} onClick={handleInterestsSave}>
                Save Changes
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div style={settingsContainerStyle}>
      <div style={settingsLabelsStyle}>
        <h1 style={{ fontSize: "38px", marginBottom: "15px" }}>Settings</h1>
        <h2 onClick={() => setSelectedOption("editProfile")}>Edit Profile</h2>
        <h2 onClick={() => setSelectedOption("accountMgmt")}>
          Account Management
        </h2>
        <h2 onClick={() => setSelectedOption("interests")}>Interests</h2>
      </div>
      <div style={verticalLineStyle}></div>
      <div>
        /*needs styling
        {renderSettingsComponent()}
      </div>
    </div>
  );
};
export default SettingsContainer;
