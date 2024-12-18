import React, { useState } from "react";
import Board from "@components/Board";
import Scoreboard from "@components/Scoreboard";
import CurrentPlayer from "@components/CurrentPlayer";
import { isValidMove } from "@/utils";
import "./App.css";

const SIZE = 8;

function App() {
  const initialBoard = Array(SIZE)
    .fill(null)
    .map(() => Array(SIZE).fill(null));

  // 初始棋盘设置
  initialBoard[3][3] = "White";
  initialBoard[4][4] = "White";
  initialBoard[3][4] = "Black";
  initialBoard[4][3] = "Black";

  const [boardState, setBoardState] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("Black");
  const [blackScore, setBlackScore] = useState(2);
  const [whiteScore, setWhiteScore] = useState(2);

  // 处理点击事件
  const handleClick = (row, col) => {
    if (!isValidMove(boardState, row, col, currentPlayer)) return; // 检测位置是否合法

    // 执行翻转逻辑
    const newBoardState = [...boardState];
    newBoardState[row][col] = currentPlayer;

    // 翻转相关棋子，更新分数
    const flipped = flipDiscs(newBoardState, row, col, currentPlayer);

    if (flipped) {
      setBoardState(newBoardState);
      // 更新分数
      const [newBlackScore, newWhiteScore] = countScores(newBoardState);
      setBlackScore(newBlackScore);
      setWhiteScore(newWhiteScore);
      setCurrentPlayer(currentPlayer === "Black" ? "White" : "Black");
    }
  };

  // 翻转棋子的方法
  const flipDiscs = (board, row, col, player) => {
    const opponent = player === "Black" ? "White" : "Black";
    let flipped = false;

    // 遍历 8 个方向
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];

    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      let toFlip = [];

      // 继续遍历直到遇到同色棋子或者越界
      while (
        x >= 0 &&
        x < SIZE &&
        y >= 0 &&
        y < SIZE &&
        board[x][y] === opponent
      ) {
        toFlip.push([x, y]);
        x += dx;
        y += dy;
      }

      // 如果遇到同色棋子，翻转该路径上的棋子
      if (x >= 0 && x < SIZE && y >= 0 && y < SIZE && board[x][y] === player) {
        flipped = true;
        toFlip.forEach(([flipX, flipY]) => {
          board[flipX][flipY] = player;
        });
      }
    }

    return flipped;
  };

  // 计算分数
  const countScores = (board) => {
    let black = 0,
      white = 0;
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (board[i][j] === "Black") black++;
        if (board[i][j] === "White") white++;
      }
    }
    return [black, white];
  };

  return (
    <div className="game">
      <Scoreboard blackScore={blackScore} whiteScore={whiteScore} />
      <CurrentPlayer currentPlayer={currentPlayer} />
      <Board boardState={boardState} onClick={handleClick} currentPlayer={currentPlayer} />
    </div>
  );
}

export default App;
