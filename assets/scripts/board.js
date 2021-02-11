import Boards from "./boards.js";
import ClosedBoards from "./closedBoards.js";


export default function Board(parentSelector) {
  if (!Board.instance) {
    this.parentSelector = parentSelector;
    this.parentElement = document.querySelector(parentSelector);
    this.toString = function () {
      return `
      <header>
        <div class="organizable">
            {organiz<span class="organizable__able">able</span>}
        </div>
    </header>
    <main>
        <section class="container">
            <nav class="container--navbar">
                <a class="js-select-myboards" href="#">My boards</a>
                <a class="js-select-closedBoards" href="#">Closed boards</a>
                <a href=" "> My Profile</a>
                <button class="container--navbar__logout">Log out</button>
            </nav>
            <article class="container--options js-container-options">
                <p>Boards</p>
            </article>
        </section>
    </main>
      `;
    };
    Board.instance = this;
  }
  return Board.instance;
}

Board.prototype.render = function () {
  this.parentElement.innerHTML = this;
  this.myBoards()
  this.myBoardsListener()
  this.closedBoardsListener()
};

Board.prototype.myBoards = function () {
  this.parentElement.innerHTML = this;
  const boards = new  Boards('.container--options')
  boards.render()
};

Board.prototype.myBoardsListener = function () {
  const myBoardAction= document.querySelector('.js-select-myboards')
  myBoardAction.addEventListener("click",(e)=>{
      console.log("select boards ")
      e.preventDefault()
      const boards = new Boards()
      boards.render()
    })
};
Board.prototype.closedBoardsListener = function () {
  const myBoardAction= document.querySelector('.js-select-closedBoards')
  myBoardAction.addEventListener("click",(e)=>{
      console.log("slect closed boards")
      e.preventDefault()
      const closedBoards = new ClosedBoards('.container--options')
      closedBoards.render()
  })
};



