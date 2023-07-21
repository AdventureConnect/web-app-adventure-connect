import React from "react";
import MatchProfile from "./MatchProfile";
import { useSelector } from "react-redux/";

const MatchContainer = () => {
  const { matchList, total } = useSelector((store) => store.matches);
  console.log(total);
  console.log(matchList);
  const matches = matchList.map((match, i) => {
    console.log(<MatchProfile key={(match.name, i)} {...match} />);
    return <MatchProfile key={(match.name, i)} {...match} />;
  });
  if (total > 0) {
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
