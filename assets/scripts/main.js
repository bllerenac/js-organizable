import Boards from "./my_boards.js";
import ClosedBoards from "./closedBoards.js";
import Login from "./login.js";
import SessionsService from "./services/session_service.js"
import Tooltip from "./components/tooltip.js";
import STORE from "./store.js";


export default function Board(parentSelector) {
  if (!Board.instance) {
    this.parentSelector = parentSelector;
    this.parentElement = document.querySelector(parentSelector);
    this.toString = function () {
      return `

        <section class="container">
            <nav class="container--navbar">
                <a class="js-select-myboards" href="#">My boards</a>
                <a class="js-select-closedBoards" href="#">Closed boards</a>
                <a href=" "> My Profile</a>
                <button class="js-logout container--navbar__logout">Log out</button>
            </nav>
            <section>
              <article class="container--options js-container-options">
                  <p>Your Boards</p>
              </article>
              <button class="btn_new_board">Create a new Board</button>
              <form class="tool_new_board hidden">
                <div class="container_tool_board_colors">
                  <div class="tool_board">
                    <input name="board_name" type="text" placeholder="Board title"></input>
                    <button class="tooltip_hidden">X</button>
                  </div>
                  <div class="tool_colors">
                    <a href="#" class="IndianRed">IndianRed</a>
                    <a href="#" class="MediumSlateBlue">MediumSlateBlue</a>
                    <a href="#" class="YellowGreen">YellowGreen</a>
                    <a href="#" class="LightBlue">LightBlue</a>
                    <a href="#" class="Chocolate">Chocolate</a>
                    <a href="#" class="SteelBlue">SteelBlue</a>
                    <a href="#" class="MediumAquamarine">MediumAquamarine</a>
                    <a href="#" class="Coral">Coral</a>
                    <a href="#" class="GreenYellow">GreenYellow</a>
                  </div>
                </div>
                <button class="tool_submit" type="submit">Create Board</button>
              </form>
            </section>
        </section>
      `;
    };
    Board.instance = this;
  }
  return Board.instance;
}

Board.prototype.render = function () {
  this.parentElement.innerHTML = this;
  this.myBoards();
  this.myBoardsListener();
  this.closedBoardsListener();
  this.Logout();
  this.Tooltip();
};

Board.prototype.myBoards = function () {
  this.parentElement.innerHTML = this;
  const boards = new Boards('.js-container-options')
  boards.render()
};

Board.prototype.myBoardsListener = function () {
  const myBoardAction= document.querySelector('.js-select-myboards')
  myBoardAction.addEventListener("click",(e)=>{
      e.preventDefault()
      const boards = new Boards()
      boards.render()
    })
};

Board.prototype.Logout = async function (e) {
  const logoutButton = document.querySelector(".js-logout");
  logoutButton.addEventListener("click", (e) => {
    const sessionsService = new SessionsService();
    sessionsService.logout();
    sessionStorage.removeItem("token");
    const login = new Login(".js-content");
    login.render();
  });
};

Board.prototype.closedBoardsListener = function () {
  const myBoardAction= document.querySelector('.js-select-closedBoards')
  myBoardAction.addEventListener("click",(e)=>{
      e.preventDefault()
      const closedBoards = new ClosedBoards('.container--options')
      closedBoards.render()
  })
};

Board.prototype.Tooltip = function(){
  const tooltip = new Tooltip();
  return tooltip.render();
};


