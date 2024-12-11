import React, { useState } from "react";

const Square = ({ value, onClick, text, hoveredStyle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    console.log(hoveredStyle)
      setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`square ${isHovered ? `hovered-${hoveredStyle}` : ""} ${value}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      >
      {value}
    </div>
  );
};

export default Square;
