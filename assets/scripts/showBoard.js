import STORE from "./store.js";
import List from "./show_board/lists.js"
import Card from "./show_board/cards.js";
import BoardService from "./services/boardService.js";
import Boards from "./my_boards.js";

export default function ShowBoard(parentSelector) {
  if (!ShowBoard.instance) {
    this.parentSelector = parentSelector;
    this.parentElement = document.querySelector(parentSelector);

    this.toString = function () {
      let { name, color, starred } = STORE.boardSelected
      return `
      <section class="show-board ${color}">
      <div class="show-board__header">
        <h3>${name}</h3>

        <button class="js-star-board btn-header-show">
          ${starred ? `<img src="./assets/images/starselect.svg" />` : `<img src="./assets/images/star.svg" />`}  
        
        </button>
        <button class="js-closed-board btn-header-show">
          <img src="./assets/images/closed.svg" />
        </button>
      </div>
      <div class="show-board__content">Aqui pones tu contenio</div>
    </section>
        `;
    };
    ShowBoard.instance = this;
  }
  return ShowBoard.instance;
};

ShowBoard.prototype.render = function () {
  this.parentElement.innerHTML = this;
  const lists = this.renderList(".show-board__content")
  lists.forEach((list) => {
    list.addEventListeners();
    list.renderCards();
  });
  this.listenStarClick();
  this.listenClosedClick();
};

ShowBoard.prototype.renderList = function (parentSelector) {
  const data = STORE.boardSelected.lists;
  const list__content = document.querySelector(parentSelector);
  const list_render = data.map((list_data) => {
    return new List(parentSelector, list_data);
  });

  list__content.innerHTML = list_render.join("");
  return list_render;
}
ShowBoard.prototype.listenStarClick = function () {
  const starButton = this.parentElement.querySelector('.js-star-board');
  starButton.addEventListener("click", async (e) => {
    try {
      const boardService = new BoardService()
      let storeBoard = STORE.boardSelected
      const rsp = await boardService.starred(storeBoard.id, !storeBoard.starred)
      STORE.boardSelected = rsp
      this.render()
    } catch (error) {
      console.log(error)
    }
  })
}

ShowBoard.prototype.listenClosedClick = function () {
  const closedButton = this.parentElement.querySelector(`.js-closed-board`);
  closedButton.addEventListener("click", async (e) => {
    try {
      const boardService = new BoardService()
      let storeBoard = STORE.boardSelected
      const rsp = await boardService.closed(storeBoard.id)
      STORE.boardSelected = rsp
      this.render()
    } catch (error) {
      console.log(error)
    }
  })
}
