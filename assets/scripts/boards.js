import SimpleBoard from "./components/simpleBoard.js";
import STORE from "./store.js";
 
export default function Boards(parentSelector) {
    if (!Boards.instance) {
      this.parentSelector = parentSelector;
      this.parentElement = document.querySelector(parentSelector);
      this.toString = function () {
        return `
        <section>
          <h3>My Boards</h3>
          <ul class="js-boards-container list-boards"></ul>
        </section>
        `;
      };
      Boards.instance = this;
    }
    return Boards.instance;
  }
  

  Boards.prototype.generateBoards = function (parentSelector) {
    const container = this.parentElement.querySelector(parentSelector);
    console.log(STORE.boards)
    const boards = STORE.boards.filter(board=> !board.closed && !board.starred).map((board) => {
      return new SimpleBoard(parentSelector, board,false);
    });
    container.innerHTML = boards.join("");
    return boards;
  };

  Boards.prototype.render = function () {
    this.parentElement.innerHTML = this;
    if (STORE.boards) {
      
      const boards = this.generateBoards(".js-boards-container")
      
      boards.forEach(board => {
        board.addEventListeners();
      });
    }
  };
  
 
