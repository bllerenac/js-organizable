
import Boards from "../boards.js"
import ClosedBoards from "../closedBoards.js"
import BoardService from "../services/boardService.js"
import STORE from "../store.js"

export default function SimpleBoard(parentSelector, board) {
    this.parentElement = document.querySelector(parentSelector)
    console.log(this.parentElement)
    this.data = board

    this.toString = function () {
        return `
    <li class="list-boards__item" style="background-color:${board.color || "white"}">
        <p>${board.name}</p>
        <div class="list-boards__actions">
       <a class="js-closed-board-${this.data.id}" href="#delete">closed</a>
        
       
        </div>
    </li>
    
`}
}

SimpleBoard.prototype.addEventListeners = function () {
    this.listenClosedClick();

};

// Poner nombre mas apropiado a boton po favo :')

SimpleBoard.prototype.listenClosedClick = function () {
    const closedButton = this.parentElement.querySelector(`.js-closed-board-${this.data.id}`);
    closedButton ? closedButton.addEventListener("click", async (e) => {
        try {
            const boardService = new BoardService()

            const rsp = await boardService.closed(this.data.id)
            STORE.boards = await boardService.all()
            const boards = new Boards();
            boards.render()

        } catch (error) {
            alert(error)
        }

    }) : null
}



