import STORE from "../store.js"
import Label from "./card_label.js"
import Modal from "./modal.js";
import CardService from "../services/card_service.js"

export default function Card(parentSelector, card_data, listId) {
  if (!Card.instance) {
    this.parentElement = document.querySelector(parentSelector);
    this.data = card_data
    this.list_id = listId
    this.toString = function () {
        return `
        <button class="btn-card card-${this.data.cardId}" draggable="true">
          <div class="card_labels">
          </div>
          <a class="popup-${this.data.cardId}">${this.data.name}</a>
        </button>
        `;
      };
    }
}

Card.prototype.addEventListeners = function () {
  this.renderLabels();
  //this.DragEvents();
  this.popup();
}

Card.prototype.generateLabel = function (parentSelector) {
  const data = this.data.labels;
  const card = document.querySelector(`.card-${this.data.cardId}`)
  const label_content = card.querySelector(parentSelector)
  const label_render = data.map((label_data) => {
    return new Label(".card_labels",label_data)
  });
  label_content.innerHTML = label_render.join("");
  return label_render
}

Card.prototype.popup = function () {
  const card = document.querySelector(`.popup-${this.data.cardId}`)
  card.addEventListener("click",()=>{
    const modal = new Modal(this.data)
    modal.render()
  })
}

Card.prototype.renderLabels = function () {
  const labels = this.generateLabel(".card_labels")
}

Card.prototype.Card_Data = async function (list_id,card_id) {
  let show_card_data;
  const cardService = new CardService();
  try {
    show_card_data = await cardService.Card_data(list_id,card_id);
  } catch (e) {
    alert(e.message)
  }
  return show_card_data;
}

Card.prototype.Test = async function () {
  const card_data = await this.Card_Data(this.list_id,this.data.cardId);
  console.log(card_data);
}

Card.prototype.DragEvents = async function () {
  const cardElement = document.querySelector(`.card-${this.data.cardId}`);
  const cardData = await this.Card_Data(this.list_id,this.data.cardId);
  //console.log(STORE.boardSelected.lists)
  cardElement.addEventListener("dragstart", (e) =>{
    e.target.classlist.add("dragging");
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        cardID: cardData.cardId,
        listID: cardData.listId,
      })
    );
  });

  cardElement.addEventListener("dragend", (e) =>{
    console.log(cardElement)
    e.target.classlist.remove("dragging")
  });

  cardElement.addEventListener("dragenter", (e) =>{
    e.target.classlist.add("dashed");
  });

  cardElement.addEventListener("dragleave", (e) =>{
    e.target.classlist.remove("dashed");
  });

  cardElement.addEventListener("dragover", (e)=>{
    e.preventDefault();
  });

  cardElement.addEventListener("drop", async (e) => {
    const cardService = new CardService();
    const selectedList = STORE.boardSelected.lists.find(
      (list) => list.ListId === this.list_id
    );
    let reordenedCards = [...selectedList.cards];
    const draggable = JSON.parse(e.dataTransfer.getData("text"));
    const dropabbleId = this.data.cardId;
    let dropIdx , dragIdx;

    if (selectedList.listId !== draggable.listID){
      dropIdx = reordenedCards.findIndex((card) => card.cardId === dropabbleId);
      dragIdx = dropIdx + 1;
    }else {
      dragIdx = reordenedCards.findIndex((card) => card.cardId === draggable.cardId);
      dropIdx = reordenedCards.findIndex((card) => card.cardId === dropabbleId);
    }

    try{
      const updateDrag = await cardService.update(
        draggable.listId,
        draggable.cardId,
        selectedList.listId,
        dropIdx +1
      );
      const updateDrop = await cardService.update(
        selectedList.listId,
        dropabbleId,
        selectedList.listId,
        dragIdx +1
      );

      if (selectedList.listId !== draggable.listId){
        reordenedCards = [updateDrag, ...reordenedCards];
      }else{
        reordenedCards[dropIdx] = updateDrag;
        reordenedCards[dragIdx] = updateDrop;
      }

      STORE.boardSelected.lists = STORE.boardSelected.lists.map((list) => {
        if(
          list.listId === draggable.listId &&
          draggable.listId !== selectedList.listId
        ){
          return {
            ...list,
            cards: list.cards.filter(
              (card) => card.cardId !== draggable.cardId
            ),
          };
        }

        if(list.listId === selectedList.listId) {
          return {...list, cards: reordenedCards};
        }

        return list;

      });
    }catch (e){
      alert(e.message);
    }

  });

};