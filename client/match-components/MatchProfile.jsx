import React from "react";
// import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMatch, removeMatch } from "../features/matches/matchReducer";

const UserProfile = ({ name, email, interests, zipCode, handleLike }) => {
  const dispatch = useDispatch();

  return (
    <>
      <article className="profile-container">
        <img src="" />
        <h1>{name}</h1>
        <p>{interests.join(", ")}</p>
        <p>{zipCode}</p>
        <button
          onClick={() =>
            dispatch(
              addMatch({ name: name, interests: interests, zipCode: zipCode })
            )
          }
        >
          Like
        </button>
        <button
          onClick={() =>
            dispatch(
              removeMatch({
                name: name,
                interests: interests,
                zipCode: zipCode,
              })
            )
          }
        >
          Unlike
        </button>
      </article>
    </>
  );
};

export default UserProfile;
