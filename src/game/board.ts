 export class Board {
  constructor(size = 8) {
      this.size = size;
      this.board = this.initBoard();
  }

  // 初始化棋盘
  initBoard() {
      const board = Array.from({ length: this.size }, () => Array(this.size).fill(null));
      board[3][3] = 'B';
      board[3][4] = 'W';
      board[4][3] = 'W';
      board[4][4] = 'B';
      return board;
  }

  // 渲染棋盘
  renderBoard() {
      let boardHTML = '';
      for (let row = 0; row < this.size; row++) {
          for (let col = 0; col < this.size; col++) {
              const cell = this.board[row][col];
              boardHTML += `<div class="cell" data-row="${row}" data-col="${col}">
                  ${cell ? `<span class="${cell}">${cell}</span>` : ''}
              </div>`;
          }
      }
      document.getElementById('board').innerHTML = boardHTML;
  }

  // 获取指定位置的棋子
  getCell(row, col) {
      return this.board[row][col];
  }

  // 更新棋盘某位置
  updateBoard(row, col, color) {
      this.board[row][col] = color;
  }
}
