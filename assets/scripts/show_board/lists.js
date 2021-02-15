import STORE from "../store.js"
import Card from "./cards.js"
import CardService from "../services/card_service.js"
import ListService from "../services/list_service.js"
import ShowBoard from "../showBoard.js"

export default function List(parentSelector,list_data) {
  if (!List.instance) {
    this.parentElement = document.querySelector(parentSelector);
    this.data = list_data
    this.toString = function () {
        return `
        <section class="list_content list-${this.data.listId}">
          <div class="list_title">
            <h3>${this.data.name}</h2>
            <button class="btn_close_list">
              <img src="./assets/images/close_list.png" />
            </button>
          </div>
          <div class="js_cards">
          
          </div>
          <a href="#" class="btn_newCard">
            <img src="./assets/images/add_card.png" />
            Add another Card
          </a>
          <form class="form-create_card hidden form-${this.data.listId}">
            <input name="card_name" placeholder="Enter a title for this card...">
            <div>
              <button class="btn_add_card" type="submit">Add Card</button>
              <button class="btn_cancel_card"><img src="./assets/images/cancel_card.png"></button>
            </div>
          </form>        
        </section>
        `;
      };
    }
}
  

List.prototype.generateCards = function(parentSelector) {
  const data = this.data.cards;
  const list = document.querySelector( `.list-${this.data.listId}`)
  const card_content =list.querySelector(parentSelector);
  const card_render = data.map((card_data) => {
    return new Card(".js_cards",card_data)
  });
  card_content.innerHTML = card_render.join("");
  return card_render
}

List.prototype.renderCards = function(){
  const cards = this.generateCards(`.js_cards`);
  cards.forEach( (card) => {
    card.renderLabels();
    card.popup();
  });
}

List.prototype.addEventListeners = function(){
  this.showAddcard();
  this.hiddenAddcard();
  this.FormCard();
}

List.prototype.showAddcard = function(){
  const list = document.querySelector(`.list-${this.data.listId}`);
  const form = list.querySelector(".form-create_card")
  const button_show = list.querySelector(".btn_newCard");
  button_show.addEventListener("click", (e) =>{
    button_show.classList.add("hidden");
    form.classList.remove("hidden");
  })
}

List.prototype.hiddenAddcard = function(){
  const list = document.querySelector(`.list-${this.data.listId}`);
  const form = list.querySelector(".form-create_card")
  const button_show = list.querySelector(".btn_newCard");
  const button_cancel = list.querySelector(".btn_cancel_card");
  button_cancel.addEventListener("click", (e) =>{
    form.classList.add("hidden");
    button_show.classList.remove("hidden");
  })
}

List.prototype.FormCard = function(){
  const list = document.querySelector(`.list-${this.data.listId}`);
  const form = list.querySelector(`.form-${this.data.listId}`)
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const carService = new CardService();
    try {
      const createCard = await carService.create(
        this.data.listId,
        e.target.card_name.value,
      );
    const board_data = new ListService()
    STORE.boardSelected = await board_data.all(STORE.boardSelected.id)
    const showBoard = new ShowBoard('.js-content');
    showBoard.render()
    } catch (e) {
      alert(e.message);
    }
  })
}
