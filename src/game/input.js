export class InputHandler {
  constructor(board, gameLogic, ui) {
      this.board = board;
      this.gameLogic = gameLogic;
      this.ui = ui;

      this.setupEventListeners();
  }

  setupEventListeners() {
      document.getElementById('board').addEventListener('click', this.onCellClick.bind(this));
  }

  // 处理棋盘格子的点击事件
  onCellClick(event) {
      const target = event.target;
      const row = target.getAttribute('data-row');
      const col = target.getAttribute('data-col');

      if (row === null || col === null) return;

      const currentPlayer = this.gameLogic.currentPlayer;

      if (this.gameLogic.isValidMove(Number(row), Number(col), currentPlayer)) {
          this.board.updateBoard(Number(row), Number(col), currentPlayer);
          this.gameLogic.flipPieces(Number(row), Number(col), currentPlayer);
          this.gameLogic.switchPlayer();
          this.ui.renderBoard();
          this.ui.updateScore();
          this.ui.displayCurrentPlayer();

          const winner = this.gameLogic.checkWinner();
          if (winner) {
              this.ui.displayWinner(winner);
          }
      }
  }
}
