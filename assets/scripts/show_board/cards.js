import STORE from "../store.js"
import Label from "./card_label.js"

export default function Card(parentSelector,card_data) {
  if (!Card.instance) {
    this.parentElement = document.querySelector(parentSelector);
    this.data = card_data
    this.toString = function () {
        return `
        <button class="btn-card card-${this.data.cardId}">
          <div class="card_labels">
          </div>
          ${this.data.name}
        </button>
        `;
      };
    }
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

Card.prototype.renderLabels = function () {
  const labels = this.generateLabel(".card_labels")
}