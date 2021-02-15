import STORE from "../store.js"
import Card from "./cards.js"
import CardService from "../services/card_service.js"

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
            <img src="./assets/images/add_card.png" />
            Add another Card
          </a>
          <form class="form-create_card hidden">
            <input name="card_name" placeholder="Enter a title for this card...">
            <div>
              <button class="btn_add_card" type="submit">Add Card</button>
              <button class="btn_cancel_card"><img src="./assets/images/cancel_card.png"></button>
            </div>
          </form>        
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
    return new Card(".js_cards",card_data)
  });
  card_content.innerHTML = card_render.join("");
  return card_render
}

List.prototype.renderCards = function(){
  const cards = this.generateCards(`.js_cards`);
  cards.forEach( (card) => {
    card.renderLabels();
    card.popup()
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
  console.log(button_show)
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
  const form = list.querySelector(".form-create_card")
  form.addEventListener("submit", async (e) => {
    e.preventDefault;
    const carService = new CardService();
    try {
      const createCard = await carService.create(
        this.data.listId,
        e.target.card_name.value,
      );
    } catch (e) {
      alert(e.message);
    }
  })
}
