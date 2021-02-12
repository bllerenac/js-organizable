import Board from "./assets/scripts/board.js";
import Login from "./assets/scripts/login.js";

async function init() {
  const login = new Login(".js-content");
  const board = new Board(".js-content");

  if (sessionStorage.getItem("token")) {
    board.render();
    return;
  } else {
    login.render();
  }
}

init();
