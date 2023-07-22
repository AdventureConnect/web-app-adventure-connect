import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMatch } from "../features/matches/matchReducer";

const MatchProfile = ({ name, interests, zipCode }) => {
  const dispatch = useDispatch();
  return (
    <>
      <article className="profile-container">
        <img src="" />
        <h1>{name}</h1>
        <p>{interests.join(", ")}</p>
        <p>{zipCode}</p>
        <button onClick={() => dispatch(addMatch)}>Like</button>
      </article>
    </>
  );
};

export default MatchProfile;
