import React, { useState } from "react";
import Square from "./Square";
import { isValidMove } from "@/utils";

function Board({ boardState, onClick, currentPlayer }) {
  const [hoveredSquare, setHoveredSquare] = useState(null); // 只保存当前悬停的棋盘格

  const handleMouseEnter = (rowIndex, colIndex) => {
    // 如果是合法走法，设置当前悬停的棋盘格
    if (isValidMove(boardState, rowIndex, colIndex, currentPlayer)) {
      setHoveredSquare([rowIndex, colIndex]);
    }
  };

  const handleMouseLeave = () => {
    setHoveredSquare(null); // 离开时清除悬停状态
  };

  return (
    <div className="board">
      {boardState.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => onClick(rowIndex, colIndex)}
              isHovered={
                hoveredSquare
                  ? hoveredSquare[0] === rowIndex &&
                    hoveredSquare[1] === colIndex
                  : false
              } // 判断该格子是否悬停
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              onMouseLeave={handleMouseLeave}
              currentPlayer={currentPlayer}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
