import Board from "./assets/scripts/main.js";
import Login from "./assets/scripts/login.js";
import STORE from "./assets/scripts/store.js";
import BoardService from "./assets/scripts/services/boardService.js"
async function init() {
  const login = new Login(".js-content");
  const board = new Board(".js-content");


  const boardService = new BoardService()
  if (sessionStorage.getItem("token")) {
    STORE.boards = await boardService.all()
    board.render()
    return;
  } else {
    login.render();
  }
}

init();