
import Boards from "../boards.js"
import ClosedBoards from "../closedBoards.js"
import BoardService from "../services/boardService.js"
import STORE from "../store.js"

export default function SimpleBoard(parentSelector, board) {
    console.log(parentSelector)
    console.log(document)
    console.log( document.querySelector(".js-boards-container"))
    this.parentElement = document.querySelector(parentSelector)
    console.log(this.parentElement)
    this.data = board

    this.toString = function () {
        return `
    <li class="list-boards__item ${board.color}" >
        <p>${board.name}</p>
        <div class="list-boards__actions">
            <a class="js-closed-board-${this.data.id}" href="#delete">
                <img src="./assets/images/closed.svg"/>
            </a>
            <a class="js-star-board-${this.data.id}" href="#">
                <img src="./assets/images/star.svg"/>
            </a>
        </div>
    </li>
`}
}

SimpleBoard.prototype.addEventListeners = function () {
    this.listenClosedClick();
    this.listenStarClick()
};

// Poner nombre mas apropiado a boton po favo :')

SimpleBoard.prototype.listenClosedClick = function () {
    const closedButton = this.parentElement.querySelector(`.js-closed-board-${this.data.id}`);
    closedButton.addEventListener("click", async (e) => {
        try {
            const boardService = new BoardService()

            const rsp = await boardService.closed(this.data.id)
            STORE.boards = await boardService.all()
            const boards = new Boards();
            boards.render()

        } catch (error) {
            alert(error)
        }

    }) 
}

SimpleBoard.prototype.listenStarClick = function () {
    const starButton = this.parentElement.querySelector(`.js-star-board-${this.data.id}`);
    starButton.addEventListener("click", async (e) => {
        try {
            console.log("Listen Star click")
            
            const boardService = new BoardService()
            let status = this.data.starred
            const rsp = await boardService.starred(this.data.id,!status)
            STORE.boards = await boardService.all()
            const boards = new Boards();
            boards.render()

        } catch (error) {
            alert(error)
        }

    })
}
