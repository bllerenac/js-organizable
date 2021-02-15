import STORE from "./store.js";
import List from "./show_board/lists.js"
import Card from "./show_board/cards.js";
import BoardService from "./services/boardService.js";
import ListService from "./services/list_service.js"
import Boards from "./my_boards.js";
import Board from "./main.js";

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
        <div class="show_board_lists">
          <div class="show-board__content">Aqui pones tu contenio</div>
          <button href="#" class="btn_newList">
                <img src="./assets/images/add_list.png" />
                Add another List
          </button>
          <form class="form_new_list hidden">
            <input name="list_name" placeholder="Enter list title...">
            <div>
              <button type="submit" class="btn_add_card" type="submit">Add List</button>
              <button class="btn_cancel_card"><img src="./assets/images/cancel_card.png"></button>
            </div>
          </form>
        </div>
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
  this.ShowForm();
  this.HiddenForm();
  this.FormList();
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
      console.log("asd")
      const main = Board()
      main.render()
    } catch (error) {
      console.log(error)
    }
  })
}

//Funciones Formulario List//
ShowBoard.prototype.ShowForm = function(){
  const content = document.querySelector(".show-board")
  const form = content.querySelector(".form_new_list")
  const button_show = content.querySelector(".btn_newList")
  button_show.addEventListener("click", (e)=>{
    console.log("show")
    button_show.classList.add("hidden");
    form.classList.remove("hidden");
  })
}
ShowBoard.prototype.HiddenForm = function(){
  const content = document.querySelector(".show-board")
  const form = content.querySelector(".form_new_list")
  const button_hidden = form.querySelector(".btn_cancel_card")
  const button_show = content.querySelector(".btn_newList")
  button_hidden.addEventListener("click", (e)=>{
    form.classList.add("hidden")
    button_show.classList.remove("hidden")
  })
}

ShowBoard.prototype.FormList = function(){
  const board = document.querySelector(".show-board")
  const form = board.querySelector(".form_new_list")
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const listService = new ListService();
    try {
      const create_list = await listService.create(
        STORE.boardSelected.id,
        e.target.list_name.value,
      );
    const board_data = new ListService()
    STORE.boardSelected = await board_data.all(STORE.boardSelected.id)
    const showBoard = new ShowBoard('.js-content');
    showBoard.render();
    } catch (e) {
      alert(e.message);
    }
  })
}
