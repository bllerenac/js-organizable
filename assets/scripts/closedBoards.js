import ClosedBoard from "./components/closedBoard.js";
import STORE from "./store.js";

export default function ClosedBoards(parentSelector) {
    if (!ClosedBoards.instance) {
        this.parentSelector = parentSelector;
        this.parentElement = document.querySelector(parentSelector);
        this.toString = function () {
            return `
        <section>
          <h3>Closed Boards</h3>
          <ul class="js-closedBoards-container list-boards"></ul>
        </section>
        `;
        };
        ClosedBoards.instance = this;
    }
    return ClosedBoards.instance;
}


ClosedBoards.prototype.generateClosedBoards = function (parentSelector) {
    const container = this.parentElement.querySelector(parentSelector);
    const closeBoards = STORE.boards.filter(board => board.closed).map((board) => {
        return new ClosedBoard(parentSelector, board);
    });
    console.log(closeBoards)
    container.innerHTML = closeBoards.join("");
    return closeBoards;
};

ClosedBoards.prototype.render = function () {
    this.parentElement.innerHTML = this;
    const boards = this.generateClosedBoards(".js-closedBoards-container")

    boards.forEach(board => {
        board.addEventListeners();
    });
};


