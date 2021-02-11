import SessionsService from "./services/session_service.js";
import STORE from "./store.js";

export default function Login(parentSelector) {
  if (!Login.instance) {
    this.parentSelector = parentSelector;
    this.parentElement = document.querySelector(parentSelector);
    this.toString = function () {
      return `
      <section>
        <h2>Login</h2>
        <form class="js-login-form login-form">
          <div>
          <label>Username</label>
          <input type="text" name="username">
          </div>
          <div>
          <label>Password</label>
          <input type="password" name="password">
          </div>
          <div>
          <button type="submit">Submit</button>
          </div>
          <a href="#signup">Sign Up</a>
        </form>
      </section>
      `;
    };
    Login.instance = this;
  }
  return Login.instance;
}

Login.prototype.render = function () {
  this.parentElement.innerHTML = this;
  this.addFormSubmitListener();
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
  try {
    const sessionsService = new SessionsService();
    const data = await sessionsService.login(username.value, password.value);
    STORE.user = data;
    sessionStorage.setItem("token", data.token);
    if (data.token) {
      const board = new Board();
      board.render();
    }
  } catch (e) {
    alert(e.message);
  }
};