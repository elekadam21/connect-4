"use strict";

import BoardService from "./board.service.js";
import PlayerService from "./player.service.js";

main();

function main() {
  BoardService.initGame();
  PlayerService.initDefaultPlayers();
}
