import React from "react";

const Square = ({ value, onClick, text }) => {
  return (
    <div className={`square ${value}`} onClick={onClick}>
      {text}
    </div>
  );
};

export default Square;
