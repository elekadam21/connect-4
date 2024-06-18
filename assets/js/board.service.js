"use strict";

import MessageService from "./message-service.js";
import WinCheckService from "./win-check.js";
import PlayerService, { currentPlayer } from "./player.service.js";

export const emptyField = 0;
export let numOfRows = 6;
export let numOfCols = 7;
export let winningSeqLen = 4;
export let board = [];

function initGame() {
  initBoard();
  initBoardElements();
  initButtons();
}

function initButtons() {
  let settingsButtonEl = document.querySelector(".settings-button");
  settingsButtonEl.addEventListener("click", onButtonClick);

  let restartButtonEl = document.querySelector(".restart-button");
  restartButtonEl.addEventListener("click", onButtonClick);
}

function initBoard() {
  board = [];
  for (let i = 0; i < numOfRows; i++) {
    let row = [];
    for (let j = 0; j < numOfCols; j++) {
      row.push(emptyField);
    }
    board.push(row);
  }
}

function initBoardElements() {
  const boardEl = document.createElement("div");
  boardEl.classList.add("board");
  const boardContainerEl = document.querySelector(".board-container");
  boardContainerEl.appendChild(boardEl);
  createCells(boardEl);
}

function createCells(boardEl) {
  for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
    const rowEl = document.createElement("div");
    rowEl.classList.add("row");
    for (let colIndex = 0; colIndex < numOfCols; colIndex++) {
      createCell(rowEl, rowIndex, colIndex);
    }

    boardEl.appendChild(rowEl);
  }
}

function createCell(rowEl, rowIndex, colIndex) {
  const cellEl = document.createElement("div");
  cellEl.classList.add("cell");
  const cellID = rowIndex + "-" + colIndex;
  cellEl.setAttribute("id", cellID);
  cellEl.addEventListener("click", onCellClick);
  rowEl.appendChild(cellEl);
}

function onCellClick(event) {
  const [cellRowIndex, cellColIndex] = getCellIndices(event.srcElement.id);
  let isFieldEmpty = checkIfFieldEmpty(cellRowIndex, cellColIndex);

  if (!isFieldEmpty) {
    MessageService.displayMessage("Field is not empty");
  } else {
    addMark(cellRowIndex, cellColIndex);
  }
}

function addMark(cellRowIndex, cellColIndex) {
  let emptyRowIndex = findNextEmptyField(cellRowIndex, cellColIndex);

  populateCell(emptyRowIndex, cellColIndex);
  let hasPlayerWon = WinCheckService.checkIfPlayerWon();
  if (hasPlayerWon) {
    stopGame();
  } else {
    PlayerService.changePlayer();
    WinCheckService.checkForDraw();
  }
}

function getCellIndices(cellIDStr) {
  const cellID = cellIDStr.split("-");
  const cellRowIndex = parseInt(cellID[0]);
  const cellColIndex = parseInt(cellID[1]);
  return [cellRowIndex, cellColIndex];
}

function checkIfFieldEmpty(cellRowIndex, cellColIndex) {
  return board[cellRowIndex][cellColIndex] === emptyField;
}

function findNextEmptyField(cellRowIndex, cellColIndex) {
  let rowIndex = cellRowIndex;

  while (rowIndex + 1 < numOfRows) {
    if (checkIfFieldEmpty(rowIndex + 1, cellColIndex)) {
      rowIndex++;
    } else {
      break;
    }
  }
  return rowIndex;
}

function populateCell(cellRowIndex, cellColIndex) {
  board[cellRowIndex][cellColIndex] = currentPlayer.getID();
  const cell = getCellWithIndices(cellRowIndex, cellColIndex);
  cell.classList.add(currentPlayer.getMark());
}

function getCellWithIndices(cellRowIndex, cellColIndex) {
  const ID = cellRowIndex + "-" + cellColIndex;
  const cell = document.getElementById(ID);
  return cell;
}

function stopGame() {
  const cells = document.getElementsByClassName("cell");

  for (let cell of cells) {
    cell.removeEventListener("click", onCellClick);
  }
}

function onButtonClick(event) {
  event.preventDefault();
  handleInputs();
  PlayerService.changePlayerSettings();
  restartGame();
}

function restartGame() {
  let board = document.querySelector(".board");
  board.remove();
  initGame();
  PlayerService.setCurrentPlayerToDefault();
  closeMenu();
}

function handleInputs() {
  let seqNumEl = document.getElementById("seq-num");
  if (!!seqNumEl.value) {
    winningSeqLen = parseInt(seqNumEl.value);
    changeTitle();
  }
  let rowNumEl = document.getElementById("row-num");
  if (!!rowNumEl.value) {
    numOfRows = parseInt(rowNumEl.value);
  }
  let colNumEl = document.getElementById("col-num");
  if (!!colNumEl.value) {
    numOfCols = parseInt(colNumEl.value);
  }
}

function changeTitle() {
  let title = document.getElementById("title");
  title.innerHTML = "Connect " + winningSeqLen;
  document.title = "Connect " + winningSeqLen;
}

function closeMenu() {
  let menuEl = document.querySelector(".checkbox");
  menuEl.checked = false;
}

export default { initGame };
