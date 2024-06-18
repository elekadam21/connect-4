"use strict";

import MessageService from "./message-service.js";
import { currentPlayer } from "./player.service.js";
import {
  numOfRows,
  numOfCols,
  board,
  winningSeqLen,
  emptyField,
} from "./board.service.js";

function checkIfPlayerWon() {
  return (
    checkIfPlayerWonHorizontally() ||
    checkIfPlayerWonVertically() ||
    checkIfPlayerWonAscDiagonally() ||
    checkIfPlayerWonDescDiagonally()
  );
}

function checkForDraw() {
  if (board[0].filter((cell) => cell === emptyField).length === 0) {
    MessageService.displayMessage("Draw");
    stopGame();
  }
}

function checkIfPlayerWonHorizontally() {
  for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
    for (
      let colIndex = 0;
      colIndex < numOfCols - (winningSeqLen - 1);
      colIndex++
    ) {
      let sequence = [];
      let cells = [];
      for (let i = 0; i < winningSeqLen; i++) {
        sequence.push(board[rowIndex][colIndex + i] === currentPlayer.getID());
        cells.push(
          document.getElementById(rowIndex + "-" + parseInt(colIndex + i))
        );
      }
      let playerHasWon = sequenceChecker(sequence);
      if (playerHasWon) {
        MessageService.displayMessage(
          currentPlayer.getName() + " won horizontally"
        );
        highlightWinningCells(cells);
        return true;
      }
    }
  }
  return false;
}

function checkIfPlayerWonVertically() {
  for (
    let rowIndex = 0;
    rowIndex < numOfRows - (winningSeqLen - 1);
    rowIndex++
  ) {
    for (let colIndex = 0; colIndex < numOfCols; colIndex++) {
      let sequence = [];
      let cells = [];
      for (let i = 0; i < winningSeqLen; i++) {
        sequence.push(board[rowIndex + i][colIndex] === currentPlayer.getID());
        cells.push(
          document.getElementById(parseInt(rowIndex + i) + "-" + colIndex)
        );
      }
      let playerHasWon = sequenceChecker(sequence);
      if (playerHasWon) {
        MessageService.displayMessage(
          currentPlayer.getName() + " won vertically"
        );
        highlightWinningCells(cells);
        return true;
      }
    }
  }
  return false;
}

function checkIfPlayerWonAscDiagonally() {
  for (let rowIndex = winningSeqLen - 1; rowIndex < numOfRows; rowIndex++) {
    for (
      let colIndex = 0;
      colIndex < numOfCols - (winningSeqLen - 1);
      colIndex++
    ) {
      let sequence = [];
      let cells = [];
      for (let i = 0; i < winningSeqLen; i++) {
        sequence.push(
          board[rowIndex - i][colIndex + i] === currentPlayer.getID()
        );
        cells.push(
          document.getElementById(
            parseInt(rowIndex - i) + "-" + parseInt(colIndex + i)
          )
        );
      }
      let playerHasWon = sequenceChecker(sequence);
      if (playerHasWon) {
        MessageService.displayMessage(
          currentPlayer.getName() + " won ascending diagonally"
        );
        highlightWinningCells(cells);
        return true;
      }
    }
  }
  return false;
}

function checkIfPlayerWonDescDiagonally() {
  for (let rowIndex = winningSeqLen - 1; rowIndex < numOfRows; rowIndex++) {
    for (let colIndex = winningSeqLen - 1; colIndex < numOfCols; colIndex++) {
      let sequence = [];
      let cells = [];
      for (let i = 0; i < winningSeqLen; i++) {
        sequence.push(
          board[rowIndex - i][colIndex - i] === currentPlayer.getID()
        );
        cells.push(
          document.getElementById(
            parseInt(rowIndex - i) + "-" + parseInt(colIndex - i)
          )
        );
      }
      let playerHasWon = sequenceChecker(sequence);
      if (playerHasWon) {
        MessageService.displayMessage(
          currentPlayer.getName() + " won descending diagonally"
        );
        highlightWinningCells(cells);
        return true;
      }
    }
  }
  return false;
}

function highlightWinningCells(cells) {
  console.log(cells);
  cells.forEach((cell) => {
    cell.classList.add("won");
  });
}

function sequenceChecker(sequence) {
  return sequence.every(Boolean);
}

export default { checkIfPlayerWon, checkForDraw };
