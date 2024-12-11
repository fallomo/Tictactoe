import React from "react";
import Square from "./Square";

function Board({ boardState, onClick }) {
  return (
    <div className="board">
      {boardState.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Square
              key={colIndex}
              value={cell}
              text ={`${rowIndex},${colIndex}`}
              onClick={() => onClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;


