import React from "react";

function Scoreboard({ blackScore, whiteScore }) {
  return (
    <div className="scoreboard">
      <p>Black: {blackScore}</p>
      <p>White: {whiteScore}</p>
    </div>
  );
}

export default Scoreboard;