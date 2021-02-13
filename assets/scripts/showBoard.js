import STORE from "./store.js";
import List from "./show_board/lists.js"

export default function ShowBoard(parentSelector){
  if (!ShowBoard.instance) {
    this.parentSelector = parentSelector;
    this.parentElement = document.querySelector(parentSelector);
    let {name,color} = STORE.boardSelected
    this.toString = function () {
      return `
      <section class="show-board ${color}">
      <div class="show-board__header">
        <h3>${name}</h3>

        <button class="btn-header-show">
          <img src="./assets/images/star.svg" />
        </button>
        <button class="btn-header-show">
          <img src="./assets/images/closed.svg" />
        </button>
      </div>

      <div class="show-board__content">
        Aqui pones tu contenio
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
   this.renderList();
};

ShowBoard.prototype.renderList = function () {
  const data = STORE.boardSelected.lists;
  const board__content = document.querySelector(".show-board__content");
  const list_render = data.map((list_data) => {
    console.log(list_data)
    return new List(".show-board__content",list_data);
  });

  return board__content.innerHTML = list_render.join("") 
}
