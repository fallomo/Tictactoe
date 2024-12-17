export class GameLogic {
  constructor(board) {
      this.board = board;
      this.currentPlayer = 'B'; // 'B' 为黑方，'W' 为白方
  }

  // 判断某个位置是否是合法走法
  isValidMove(row, col, color) {
      if (this.board.getCell(row, col) !== null) return false;

      const directions = [
          [-1, 0], [1, 0], [0, -1], [0, 1], // 上下左右
          [-1, -1], [-1, 1], [1, -1], [1, 1]  // 四个对角线
      ];

      let isValid = false;

      directions.forEach(([dx, dy]) => {
          let r = row + dx;
          let c = col + dy;
          let foundOpponent = false;

          while (r >= 0 && r < this.board.size && c >= 0 && c < this.board.size) {
              const cell = this.board.getCell(r, c);
              if (cell === null) break;
              if (cell === color) {
                  if (foundOpponent) {
                      isValid = true;
                  }
                  break;
              }
              foundOpponent = true;
              r += dx;
              c += dy;
          }
      });

      return isValid;
  }

  // 翻转棋子
  flipPieces(row, col, color) {
      const directions = [
          [-1, 0], [1, 0], [0, -1], [0, 1], 
          [-1, -1], [-1, 1], [1, -1], [1, 1]
      ];

      directions.forEach(([dx, dy]) => {
          let r = row + dx;
          let c = col + dy;
          let piecesToFlip = [];

          while (r >= 0 && r < this.board.size && c >= 0 && c < this.board.size) {
              const cell = this.board.getCell(r, c);
              if (cell === null) break;
              if (cell === color) {
                  piecesToFlip.forEach(([flipRow, flipCol]) => {
                      this.board.updateBoard(flipRow, flipCol, color);
                  });
                  break;
              }
              piecesToFlip.push([r, c]);
              r += dx;
              c += dy;
          }
      });
  }

  // 获取当前玩家的所有合法走法
  getAvailableMoves(color) {
      const moves = [];
      for (let row = 0; row < this.board.size; row++) {
          for (let col = 0; col < this.board.size; col++) {
              if (this.isValidMove(row, col, color)) {
                  moves.push([row, col]);
              }
          }
      }
      return moves;
  }

  // 切换玩家
  switchPlayer() {
      this.currentPlayer = this.currentPlayer === 'B' ? 'W' : 'B';
  }

  // 检查赢家
  checkWinner() {
      const blackCount = this.board.board.flat().filter(cell => cell === 'B').length;
      const whiteCount = this.board.board.flat().filter(cell => cell === 'W').length;

      if (blackCount + whiteCount === this.board.size * this.board.size) {
          if (blackCount > whiteCount) return 'B';
          if (whiteCount > blackCount) return 'W';
          return 'draw';
      }
      return null;
  }
}
