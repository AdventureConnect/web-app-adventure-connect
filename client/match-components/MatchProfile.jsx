import React from "react";
// import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMatch, removeMatch } from "../features/matches/matchReducer";

const UserProfile = ({ name, id, interests, zipCode }) => {
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
              addMatch({
                name,
                interests,
                zipCode,
              })
            )
          }
        >
          Like
        </button>
        <div>
          <button
            onClick={() =>
              dispatch(
                removeMatch({
                  name,
                  interests,
                  zipCode,
                })
              )
            }
          >
            Unlike
          </button>
        </div>
      </article>
    </>
  );
};

export default UserProfile;
