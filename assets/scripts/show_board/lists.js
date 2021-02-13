import STORE from "../store.js"
//show-board__content
export default function List(parentSelector,list_data) {
  if (!List.instance) {
    this.parentElement = document.querySelector(parentSelector);
    this.data = list_data
    this.toString = function () {
        return `
        <article class="list_content">
          <div class="list_title">
            <h3>${this.data.name}</h2>
            <button class="btn_close_list">
              <img src="./assets/images/close_list.png" />
            </button>
          </div>
          <div class="js_cards">
            card contet
          </div>
          <a href="#" class="btn_newCard">
            <img src="./assets/images/closed.svg" />
            Add another Card
            </a>        
        </article>
        `;
      };
    }
}
  

List.prototype.render = function() {
  this.parentElement.innerHTML = this;
}

