
import Boards from "../boards.js"
import ClosedBoards from "../closedBoards.js"
import BoardService from "../services/boardService.js"
import STORE from "../store.js"

export default function ClosedBoard(parentSelector,board ) {
    this.parentElement = document.querySelector(parentSelector)
    console.log(this.parentElement)
    this.data = board

    this.toString = function () {
        return `
    <li class="list-boards__item  ${board.color}">
        <p>${board.name}</p>
        <div class="list-boards__actions">
            <a class="js-activate-board-${this.data.id}" href="#">
                <img src="./assets/images/restore.svg"/>
            </a>
            <div>
                <a class="js-delete-board-${this.data.id}" href="#123">
                    <img src="./assets/images/delete.svg"/>
                </a>
            </div>
        </div>
    </li>
    
`}
}

ClosedBoard.prototype.addEventListeners = function () {
        this.listenActivatedClick()
        this.listenDeleteClick()

};


ClosedBoard.prototype.listenActivatedClick = function () {
    const closedButton = this.parentElement.querySelector(`.js-activate-board-${this.data.id}`);
    console.log(closedButton)
    closedButton.addEventListener("click",async (e)=>{
        console.log("asdsa")
        try {
            const boardService = new BoardService()
            
                const rsp= await boardService.activated(this.data.id)
                console.log(rsp)
                STORE.boards = await boardService.all()
                const boards = new Boards();
                boards.render() 
            
        } catch (error) {
            alert(error)
        }
   
    })
}

ClosedBoard.prototype.listenDeleteClick = function () {
    const closedButton = this.parentElement.querySelector(`.js-delete-board-${this.data.id}`);
    console.log(closedButton)
    closedButton.addEventListener("click",async (e)=>{
        console.log("aaaaaaa")
        try {
            const boardService = new BoardService()
            await boardService.delete(this.data.id)
            STORE.boards = await boardService.all()
            const boards = new ClosedBoards();
            boards.render()    
            
        } catch (error) {
            alert(error)
        }
   
    })
}