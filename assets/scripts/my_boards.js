import SimpleBoard from "./components/simpleBoard.js";
import UserService from "./services/userService.js";
import STORE from "./store.js";

export default function Boards(parentSelector) {
  if (!Boards.instance) {
    this.parentSelector = parentSelector;
    this.parentElement = document.querySelector(parentSelector);
    this.toString = function () {
      return `
        <section>
          <div class="content-list">
            <h3>Your Starred Boards</h3>
            <ul class="js-starredBoards-container list-boards"></ul>
          </div>
          <div class="content-list">
            <h3>My Boards</h3>
            <ul class="js-boards-container list-boards"></ul>
          </div>
        </section>
        `;
    };
    Boards.instance = this;
  }
  return Boards.instance;
}

Boards.prototype.generateBoards = function(parentSelector) {
  const container = this.parentElement.querySelector(parentSelector);
  const boards = STORE.boards.filter(board=> !board.closed && !board.starred).map((board) => {
    return new SimpleBoard(parentSelector, board);
  });
  container.innerHTML = boards.join("");
  return boards;
};

Boards.prototype.generateBoardsStarred = function(parentSelector) {
  const container = this.parentElement.querySelector(parentSelector);
  const boards = STORE.boards.filter(board=> !board.closed && board.starred).map((board) => {
    return new SimpleBoard(parentSelector, board);
  });
  container.innerHTML = boards.join("");
  return boards;
};

Boards.prototype.render = function () {

  this.parentElement.innerHTML = this;
  const boards = this.generateBoards(".js-boards-container")


  boards.forEach(board => {
    board.addEventListeners();
  });

  const starBoards = this.generateBoardsStarred(".js-starredBoards-container")

  starBoards.forEach(board => {
    board.addEventListeners();
  });
};
