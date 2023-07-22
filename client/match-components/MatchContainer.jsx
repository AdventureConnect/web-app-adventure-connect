import React from "react";
import { useState } from "react";
import UserProfile from "./MatchProfile";
import { useSelector } from "react-redux/";

import userList from "./userlist";

const MatchContainer = () => {
  const { matchList, total } = useSelector((store) => store.matches);
  console.log("matchList: ", matchList);
  console.log("total: ", total);
  const potentialMatches = userList.map((user, i) => {
    // console.log(<MatchProfile key={(match.name, i)} {...match} />);
    return <UserProfile key={(user.name, i)} {...user} />;
  });
  const matches = matchList.map((user, i) => {
    // console.log(<MatchProfile key={(match.name, i)} {...match} />);
    return <UserProfile key={(user.name, user.id)} {...user} />;
  });
  if (total < 1) {
    return (
      <>
        <section>
          <h1>This is the Match Container</h1>
          <div>{potentialMatches}</div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <section>
          <h1>This is the Match Container</h1>
          <div>{matches}</div>
        </section>
      </>
    );
  }
};

export default MatchContainer;
