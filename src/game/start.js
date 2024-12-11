import { Board } from "./board.js";
import { InputHandler } from "./input.js";
import { UI } from "./ui.js";
import { GameLogic } from "./logic.js";

const board = new Board();
const gameLogic = new GameLogic(board);
const ui = new UI(board, gameLogic);
const inputHandler = new InputHandler(board, gameLogic, ui);

// ui.renderBoard();