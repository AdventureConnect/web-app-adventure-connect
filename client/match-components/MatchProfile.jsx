import React from "react";

const handleClick = () => {
  console.log("liked!");
};

const MatchProfile = ({ name, interests, zipCode }) => {
  return (
    <>
      <article className="profile-container">
        <img src="" />
        <h1>{name}</h1>
        <p>{interests.join(", ")}</p>
        <p>{zipCode}</p>
        <button onClick={handleClick}>Like</button>
      </article>
    </>
  );
};

export default MatchProfile;
