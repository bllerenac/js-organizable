import BoardService from "../services/boardService.js";
import CardService from "../services/card_service.js";
import ShowBoard from "../showBoard.js";
import STORE from "../store.js";
import Card from "./cards.js";

export default function Modal(cardData) {
        this.data = cardData
        this.toString = function () {
            console.log(this.data)
            return `
        <div class="modal">
          <div class="modal__header">
                <input class="txt-name js-name" value="${this.data.name}" disabled/>
                <button class="js-close-modal close-modal">X</button>
          </div>

          <div class="modal__content">
            <section>
                <div class="description">
                    <h4>DESCRIPTION</h4>
                    <div class="js-description-content description">
                        <input type="text" class="js-description txt-description"  placeholder = "Agregar descripcion" value="${this.data.desc || ""}" disabled />
                        <button class="btn-edit js-change-edit">Edit</button>

                        <div class="content-actions">
                            <button class="btn-content-action js-change-save">Save</button>
                            <button class="btn-content-close js-change-close">X</button>
                        </div>
                    </div>
                </div>


            </section>

            <section>
                asd
            </section>

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
    // listeners
    this.close()
    this.closeContent()
    this.changeEdit()
    this.saveUpdate()
    this.closeUpdate()
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
        if (closeBtn == e.target) {
            const cModal = document.querySelector(".content-modal")
            cModal.remove()
        }
    })
}

Modal.prototype.saveUpdate = function () {
    const name = document.querySelector(".js-name")
    const description = document.querySelector(".js-description")
    const saveBtn = document.querySelector(".js-change-save")
    const cardService = new CardService()
    saveBtn.addEventListener("click", async (e) => {
        console.log(name.value,description.value)
        console.log(STORE.boardSelected.lists)
        let {listId} =STORE.boardSelected.lists.find(list=>list.cards.find(card=>card.cardId === this.data.cardId))
    
        await cardService.update(listId,this.data.cardId,name.value,description.value)
        const cModal = document.querySelector(".content-modal")
        cModal.remove()
        const boardService = new BoardService()
        const boardId = STORE.boardSelected.id 
             
        STORE.boardSelected = await boardService.show(boardId)

        const show = ShowBoard("js-content")
        show.render()

        // Refactorizar
       
    })
}

Modal.prototype.closeUpdate = function () {
    const name = document.querySelector(".js-name")
    const description = document.querySelector(".js-description")
    const btnEdit = document.querySelector(".js-change-edit")

    const closeBtn = document.querySelector(".js-change-close")
    closeBtn.addEventListener("click", (e) => {
        const contentDescription = document.querySelector(".js-description-content")
        const contentActions = document.querySelector(".content-actions")

        contentDescription.classList.remove("description-active")
        // TODO:Change name
        name.classList.remove("txt-active2")
        name.disabled = true

        description.classList.remove("txt-active")
        description.disabled = true
        btnEdit.style.display="block"


        contentActions.style.display = "none"
    })
}


Modal.prototype.changeEdit = function () {
    const name = document.querySelector(".js-name")
    const description = document.querySelector(".js-description")
    const btnEdit = document.querySelector(".js-change-edit")

    btnEdit.addEventListener("click", (e) => {
        const contentDescription = document.querySelector(".js-description-content")
        const contentActions = document.querySelector(".content-actions")

        contentDescription.classList.add("description-active")
        // TODO:Change name
        name.classList.add("txt-active2")
        name.disabled = false

        description.classList.add("txt-active")
        description.disabled = false
        btnEdit.style.display="none"


        contentActions.style.display = "block"
        
        
    })
}