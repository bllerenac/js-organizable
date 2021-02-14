import STORE from "../store.js"

export default function Label(parentSelector,label_data) {
  if (!Label.instance) {
    this.parentElement = document.querySelector(parentSelector);
    this.data = label_data
    this.toString = function () {
        return `
          <div class="label label-${this.data.labelId}" style="background-color:${this.data.color};">
          </div>
        `;
      };
    }
}