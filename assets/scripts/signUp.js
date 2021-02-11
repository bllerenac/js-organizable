import SessionsService from "./services/session_service.js";
import UserService from "./services/userService.js"
// import STORE from "./store.js";

export default function SignUp(parentSelector) {
  if (!SignUp.instance) {
    this.parentSelector = parentSelector;
    this.parentElement = document.querySelector(parentSelector);
    this.toString = function () {
      return `
        <form class="js-signup-form register-form">
            <div class="form-control">
                <label>Username</label>
                <input type="text" name="username">
            </div>
            <div class="form-control">
                <label>Password</label>
                <input type="password" name="password">
            </div>
            <div class="form-control">
                <label>Email</label>
                <input type="email" name="email">
            </div>
            <div class="form-control">
                <label>First Name</label>
                <input type="text" name="first_name">
            </div>
            <div class="form-control">
                <label>Last Name</label>
                <input type="text" name="last_name">
            </div>
            <div class="form-control">
                <button class="btn btn--primary register-form__button" type="submit">Create</button>
            </div>
            <a class="link" href="#signup">or login with existing user</a>
        </form>
      `;
    };
    SignUp.instance = this;
  }
  return SignUp.instance;
}

SignUp.prototype.render = function () {
  this.parentElement.innerHTML = this;
  this.addFormSubmitListener();
};

SignUp.prototype.addFormSubmitListener = function () {
  const form = this.parentElement.querySelector(".js-signup-form");
  if (form) {
    form.addEventListener("submit", this.submitForm);
  }
};

SignUp.prototype.submitForm = async function (e) {
  e.preventDefault();
  const form = e.target;
  const { username, password ,email,first_name,last_name} = form;
  try {
    const userService = new UserService();
    const data = await userService.register(username,email,first_name,last_name,password);
    // STORE.user = data;
    // sessionStorage.setItem("token", data.token);
    // if (data.token) {
    //   const board = new Board();
    //   board.render();
    // }
  } catch (e) {
    alert(e.message);
  }
}; 