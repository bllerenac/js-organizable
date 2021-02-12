import Board from "./assets/scripts/board.js";
import Login from "./assets/scripts/login.js";
import STORE from "./assets/scripts/store.js";
import BoardService from "./assets/scripts/services/boardService.js";
import UserService from "./assets/scripts/services/userService.js";

async function init() {
  const login = new Login(".js-content");
  const board = new Board(".js-content");

  const boardService = new BoardService();
  const userService = new UserService();
  if (sessionStorage.getItem("token")) {
    const idUser = sessionStorage.getItem("id");
    STORE.user = await userService.getUser(idUser);
    STORE.boards = await boardService.all();
    board.render();
    return;
  } else {
    login.render();
  }
}

init();
