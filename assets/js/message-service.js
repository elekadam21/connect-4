"use strict";

function displayMessage(message) {
  let messageEl = document.querySelector(".message");
  console.log(message);
  messageEl.innerHTML = message;
}

export default { displayMessage };
