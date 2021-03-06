import SessionsService from "./services/session_service.js";
import Board from "./main.js"
import SignUp from "./signUp.js";
import STORE from "./store.js";
import BoardService from "./services/boardService.js";

export default function Login(parentSelector) {
  if (!Login.instance) {
    this.parentSelector = parentSelector;
    this.parentElement = document.querySelector(parentSelector);
    this.toString = function () {
      return `
        <form class="js-login-form register-form">
          <div class="form-control">
          <label>Username</label>
          <input type="text" name="username"required>
          </div>
          <div class="form-control">
          <label>Password</label>
          <input type="password" name="password">
          </div>
          <div class="form-control">
          <button type="submit" class="btn btn--primary register-form__button">Submit</button>
          </div class="form-control">
          <a class="js-signup-action link" href="#signup">Sign Up</a>
        </form>
      `;
    };
    Login.instance = this;
  }
  return Login.instance;
}

Login.prototype.render = function () {
  this.parentElement.innerHTML = this;
  this.addFormSubmitListener();
  this.signUpListener()
};

Login.prototype.addFormSubmitListener = function () {
  const form = this.parentElement.querySelector(".js-login-form");
  if (form) {
    form.addEventListener("submit", this.submitForm);
  }
};

Login.prototype.submitForm = async function (e) {
  e.preventDefault();
  const form = e.target;
  const { username, password } = form;
  console.log("log in")
  const boardService = new BoardService()
  try {
    const sessionsService = new SessionsService();
    const data = await sessionsService.login(username.value, password.value);
    STORE.user = data;
    sessionStorage.setItem("token", data.token);
    STORE.boards = await boardService.all()
    if (data.token) {
      const board = new Board(".js-content");
      board.render();
    }
  } catch (e) {
    if(e.message == "[object Object]"){
      alert("Usuario Incorrecto")
    }
  }
};

Login.prototype.signUpListener = async function (e) {
  const signUpSelector = this.parentElement.querySelector(".js-signup-action");
  signUpSelector.addEventListener("click",(e)=>{
    const signUp = new SignUp('.js-content');
    signUp.render();
  });
};