import STORE from "../store.js"

export default function Card(parentSelector,card_data) {
  if (!Card.instance) {
    this.parentElement = document.querySelector(parentSelector);
    this.data = card_data
    this.toString = function () {
        return `
        <button>
          ${this.data.name}
        </button>
        `;
      };
    }
}