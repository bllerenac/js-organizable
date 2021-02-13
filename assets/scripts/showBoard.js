import STORE from "./store.js";
import List from "./show_board/lists.js"
import Card from "./show_board/cards.js";

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
   const lists = this.renderList(".show-board__content")
   lists.forEach( (list) => {
     list.renderCards();
   });
};

ShowBoard.prototype.renderList = function (parentSelector) {
  const data = STORE.boardSelected.lists;
  const list__content = document.querySelector(parentSelector);
  const list_render = data.map((list_data) => {
    //console.log(list_data)
    return  new List(parentSelector,list_data);
  });

  list__content.innerHTML = list_render.join("");
  return list_render;
}
