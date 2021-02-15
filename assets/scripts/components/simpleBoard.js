
import Boards from "../my_boards.js"
import ClosedBoards from "../closedBoards.js"
import BoardService from "../services/boardService.js"
import STORE from "../store.js"
import ShowBoard from "../showBoard.js"
import ListService from "../services/list_service.js"

export default function SimpleBoard(parentSelector, board) {

    this.parentElement = document.querySelector(parentSelector)
    this.data = board
    this.toString = function () {
        return `
    <li class="list-boards__item ${board.color}" >
        <a class="js-show-board-${this.data.id} a-show">${board.name}</a>
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
    this.showBoard()
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
            const boardService = new BoardService()
            let status = this.data.starred
            const rsp = await boardService.starred(this.data.id, !status)
            STORE.boards = await boardService.all()
            const boards = new Boards();
            boards.render()

        } catch (error) {
            alert(error)
        }

    })
}

SimpleBoard.prototype.showBoard = function () {
    const starButton = this.parentElement.querySelector(`.js-show-board-${this.data.id}`);
    starButton.addEventListener("click", async (e) => {
        try {
            console.log("Click show board")
            const board_data = new ListService()
            STORE.boardSelected = await board_data.all(this.data.id)
            console.log(STORE.boardSelected.id)
            const showBoard = new ShowBoard('.js-content');
            showBoard.render()
        } catch (error) {
            console.log(error)
        }

    })
}

