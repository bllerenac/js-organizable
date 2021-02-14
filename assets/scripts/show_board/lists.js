import STORE from "../store.js"
import Card from "./cards.js"
//show-board__content
export default function List(parentSelector,list_data) {
  if (!List.instance) {
    this.parentElement = document.querySelector(parentSelector);
    this.data = list_data
    console.log(this.data)
    this.toString = function () {
        return `
        <article class="list_content list-${this.data.listId}">
          <div class="list_title">
            <h3>${this.data.name}</h2>
            <button class="btn_close_list">
              <img src="./assets/images/close_list.png" />
            </button>
          </div>
          <div class="js_cards">
          
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
  

List.prototype.generateCards = function(parentSelector) {
  const data = this.data.cards;
  const list = document.querySelector( `.list-${this.data.listId}`)
  const card_content =list.querySelector(parentSelector);
  const card_render = data.map((card_data) => {
    //console.log(card_data)
    return new Card(".js_cards",card_data)
  });
  card_content.innerHTML = card_render.join("");
  //console.log(card_render)
  return card_render
}

List.prototype.renderCards = function(){
  const cards = this.generateCards(`.js_cards`);
  cards.forEach( (card) => {
    card.renderLabels();
  });
  //console.log(cards)
  //cards.forEach( (card) =>{ });
}

