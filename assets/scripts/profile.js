export default function Profile(parentSelector) {
  if (!Profile.instance) {
    this.parentSelector = parentSelector;
    this.parentElement = document.querySelector(parentSelector);
    this.toString = function () {
      return `
      <form class="js-signup-form register-form">
      <div class="form-control">
          <label>Username</label>
          <input type="text" name="username" required>
      </div>
      <div class="form-control">
          <label>Password</label>
          <input type="password" name="password" required>
      </div>
      <div class="form-control">
          <label>Email</label>
          <input type="email" name="email" required>
      </div>
      <div class="form-control">
          <label>First Name</label>
          <input type="text" name="first_name" required>
      </div>
      <div class="form-control">
          <label>Last Name</label>
          <input type="text" name="last_name" required>
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
  this.destroy();
  // this.Logout();
};

Profile.prototype.destroy = function () {
  const destroyProfile = document.querySelector('btn-delete');
  console.log(destroyProfile);
}