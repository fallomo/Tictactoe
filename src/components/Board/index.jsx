import React from "react";
import Square from "./Square";
import { isValidMove } from "@/utils";

function Board({ boardState, onClick, currentPlayer }) {
  return (
    <div className="board">
      {boardState.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Square
              key={colIndex}
              value={cell}
              text={`${rowIndex},${colIndex}`}
              onClick={() => onClick(rowIndex, colIndex)}
              hoveredStyle={
                isValidMove(boardState, rowIndex, colIndex, currentPlayer)
                  ? currentPlayer
                  : ''
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
