"use strict";

import Player from "./player.class.js";
import MessageService from "./message-service.js";
import { options } from "./mark-options.js";

let players = [];
export let currentPlayer = 0;

function initDefaultPlayers() {
  const playerOne = new Player("Player 1", 1, "red");
  const playerTwo = new Player("Player 2", 2, "yellow");
  players.push(playerOne);
  players.push(playerTwo);
  setCurrentPlayerToDefault();
  initPlayerSettings();
  MessageService.displayMessage(currentPlayer.getName() + "'s turn!");
}

function setCurrentPlayerToDefault() {
  currentPlayer = players[0];
  MessageService.displayMessage(currentPlayer.getName() + "'s turn!");
}

function changePlayer() {
  const currentPlayerIndex = players.indexOf(currentPlayer);
  if (currentPlayerIndex + 1 < players.length) {
    currentPlayer = players[currentPlayerIndex + 1];
  } else {
    currentPlayer = players[0];
  }
  MessageService.displayMessage(currentPlayer.getName() + "'s turn!");
}

function initPlayerSettings() {
  let playerSettingsEl = document.querySelector(".player-settings");
  for (let i = 0; i < players.length; i++) {
    initPlayerDiv(players[i].getID(), playerSettingsEl);
  }
  createAddNewPlayerbutton(playerSettingsEl);
}

function initPlayerDiv(index, playerSettingsEl) {
  let playerEl = document.createElement("div");
  playerEl.classList.add("player");
  playerEl.setAttribute("id", index);

  let nameInputEl = document.createElement("input");
  nameInputEl.type = "text";
  nameInputEl.placeholder = "Player Name";
  nameInputEl.classList.add("name-input");

  let colorSelectEl = document.createElement("select");
  options.forEach((option) => {
    addPlayerOption(option, colorSelectEl);
  });

  colorSelectEl.value = options[index - 1];

  playerEl.appendChild(nameInputEl);
  playerEl.appendChild(colorSelectEl);

  playerSettingsEl.appendChild(playerEl);
}

function addPlayerOption(option, colorSelectEl) {
  let optionEl = document.createElement("option");
  optionEl.value = option;
  optionEl.innerHTML = option;

  colorSelectEl.appendChild(optionEl);
}

function createAddNewPlayerbutton(playerSettingsEl) {
  let addNewPlayerButton = document.createElement("button");
  addNewPlayerButton.innerHTML = "Add New Player";
  addNewPlayerButton.classList.add("new-player-button");
  addNewPlayerButton.classList.add("button");
  addNewPlayerButton.addEventListener("click", onAddNewPlayer);
  playerSettingsEl.appendChild(addNewPlayerButton);
}

function deleteAddNewPlayerbutton() {
  let button = document.querySelector(".new-player-button");
  button.remove();
}

function changePlayerSettings() {
  const playerEls = document.getElementsByClassName("player");

  for (let playerEl of playerEls) {
    let player = findPlayerByID(playerEl.id);

    if (!!player) {
      if (!!playerEl.children[0].value) {
        player.setName(playerEl.children[0].value);
      }

      player.setMark(playerEl.children[1].value);
    } else {
      createNewPlayer(playerEl);
    }
  }
}

function createNewPlayer(playerEl) {
  let newPlayerName = "Player";
  if (!!playerEl.children[0].value) {
    newPlayerName = playerEl.children[0].value;
  }
  let newPlayerId = parseInt(playerEl.id);
  let newPlayerMark = playerEl.children[1].value;
  let newPlayer = new Player(newPlayerName, newPlayerId, newPlayerMark);
  players.push(newPlayer);
}

function findPlayerByID(id) {
  return players.filter((player) => {
    return player.id === parseInt(id);
  })[0];
}

function onAddNewPlayer(event) {
  event.preventDefault();

  let playerSettingsEl = document.querySelector(".player-settings");
  const playerEls = document.getElementsByClassName("player");
  initPlayerDiv(playerEls.length + 1, playerSettingsEl);

  deleteAddNewPlayerbutton();
  createAddNewPlayerbutton(playerSettingsEl);
}

export default {
  initDefaultPlayers,
  changePlayer,
  changePlayerSettings,
  setCurrentPlayerToDefault,
};
