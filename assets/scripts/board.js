import Login from "./login.js";
import SessionsService from "./services/session_service.js"
import STORE from "./store.js";

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
        <section class="container">
            <nav class="container--navbar">
                <a href=" ">My boards</a>
                <a href=" ">Closed boards</a>
                <a href=" "> My Profile</a>
                <button class="js-logout container--navbar__logout">Log out</button>
            </nav>
            <section>
              <article class="container--options">
                  <p>Your Starred Board </p>
              </article>
              <article class="container--options">
                  <p>Your Boards</p>
              </article>
              <button class="btn_new_board">Create a new Board</button>
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
  this.Logout();
};

Board.prototype.Logout = async function (e) {
  const logoutButton = document.querySelector(".js-logout");
  console.log(logoutButton)
  logoutButton.addEventListener("click", (e)=>{
    const sessionsService = new SessionsService();
    sessionsService.logout();
    sessionStorage.removeItem("token");
    const login = new Login(".js-content");
    login.render();
  });
 
  
};

