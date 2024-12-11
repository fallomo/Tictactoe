export class UI {
  constructor(board, gameLogic) {
      this.board = board;
      this.gameLogic = gameLogic;
      this.board.renderBoard();
      this.updateScore();
  }

  // 更新棋盘显示
  renderBoard() {
      this.board.renderBoard();
  }

  // 更新分数显示
  updateScore() {
      const blackScore = this.board.board.flat().filter(cell => cell === 'B').length;
      const whiteScore = this.board.board.flat().filter(cell => cell === 'W').length;
      document.getElementById('blackScore').textContent = `Black: ${blackScore}`;
      document.getElementById('whiteScore').textContent = `White: ${whiteScore}`;
  }

  // 显示当前玩家
  displayCurrentPlayer() {
      document.getElementById('currentPlayer').textContent = `Current Player: ${this.gameLogic.currentPlayer === 'B' ? 'Black' : 'White'}`;
  }

  // 显示赢家
  displayWinner(winner) {
      let message = '';
      if (winner === 'draw') {
          message = 'The game is a draw!';
      } else {
          message = `${winner === 'B' ? 'Black' : 'White'} wins!`;
      }
      alert(message);
  }
}
