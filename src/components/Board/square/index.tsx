import React from "react";

const Square = React.memo(
  ({
    value,
    onClick,
    isHovered,
    onMouseEnter,
    onMouseLeave,
    currentPlayer,
  }) => {
    // 判断悬停状态的颜色：黑方时显示半透明黑，白方时显示半透明黄
    const getHoveredStyle = () => {
      if (!isHovered) return "";

      if (currentPlayer === "Black") {
        return "hovered-Black"; // 黑方的半透明黑
      } else if (currentPlayer === "White") {
        return "hovered-White"; // 白方的半透明黄
      }

      return "";
    };

    return (
      <div
        className={`square ${value ? value : getHoveredStyle()}`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {value}
      </div>
    );
  }
);

export default Square;
