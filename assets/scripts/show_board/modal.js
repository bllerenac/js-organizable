import STORE from "../store.js"
import Label from "./card_label.js"

export default function Modal(cardData) {

    this.data = cardData
    this.toString = function () {
        console.log(this.data)
        return `
        <div class="modal">
          <div class="modal__header">
                <p>${this.data.name}</p>
                <button class="js-close-modal close-modal">X</button>
          </div>
        </div>
        `;
    };
}


Modal.prototype.render = function () {
    let contentModal = document.createElement("DIV")
    contentModal.classList.add("content-modal")
    contentModal.innerHTML = this
    document.body.appendChild(contentModal)
    this.close()
    this.closeContent()
}


Modal.prototype.close = function () {
    const closeBtn = document.querySelector(".js-close-modal")
    closeBtn.addEventListener("click", (e) => {
        const cModal = document.querySelector(".content-modal")
        cModal.remove()

    })
}

Modal.prototype.closeContent = function () {
    const closeBtn = document.querySelector(".content-modal")
    closeBtn.addEventListener("click", (e) => {
        console.log(e.target)
        if (closeBtn == e.target) {
            const cModal = document.querySelector(".content-modal")
            cModal.remove()

        }

    })
}
