import UserService from "./services/userService.js";
import STORE from "./store.js";

export default function Profile(parentSelector) {
  const userProfile = STORE.user;
  const efg = sessionStorage.getItem("id");
  console.log(efg);
  console.log(userProfile);
  if (!Profile.instance) {
    this.parentSelector = parentSelector;
    this.parentElement = document.querySelector(parentSelector);
    this.toString = function () {
      return `
      <form class="js-signup-form register-form">
      <div class="form-control">
          <label>Username</label>
          <input type="text" name="username" value="${userProfile.username}"required>
      </div>
      <div class="form-control">
          <label>Email</label>
          <input type="email" name="email" value="${userProfile.email}" required>
      </div>
      <div class="form-control">
          <label>Password</label>
          <input type="password" name="password" value="${userProfile.password}" required>
      </div>
      <div class="form-control">
          <label>First Name</label>
          <input type="text" name="first_name" value="${userProfile.firstName}" required>
      </div>
      <div class="form-control">
          <label>Last Name</label>
          <input type="text" name="last_name" value="${userProfile.lastName}" required>
      </div>
      <div class="form-control-edit-profile">
        <button class="btn-edit form-control-edit-profile--btn" type="submit">Edit</button>
        <button class="btn-delete form-control-edit-profile--btn" type="submit">Delete</button>
      </div>
  </form>
      `;
    };
    Profile.instance = this;
  }
  return Profile.instance;
}

Profile.prototype.render = function () {
  this.parentElement.innerHTML = this;
  this.edit();
  this.destroy();
};

Profile.prototype.edit = async function () {
  // const form = e.target;
  const editProfile = document.querySelector(".btn-edit");
  console.log(editProfile);
  editProfile.addEventListener("click", async (e) => {
    const { username, email, password, first_name, last_name } = form;
    try {
      const userResponse = await new UserService.update(
        username.value,
        email.value,
        password.value,
        first_name.value,
        last_name.value
      );
      console.log(userService, "data");
      if (userResponse.token) {
        STORE.user = userResponse;
        sessionStorage.setItem("token", userResponse.token);
        this.render();
      }
    } catch (e) {
      alert(e.message);
    }
  });
};

Profile.prototype.destroy = async function () {
  const destroyProfile = document.querySelector(".btn-delete");
  console.log(destroyProfile);
  destroyProfile.addEventListener("clcik", () => {
    const UserService = new UserService();
    UserService.destroy();
  });
};
