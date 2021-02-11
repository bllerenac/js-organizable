import Login from "./assets/scripts/login.js";

async function init() {
  const login = new Login(".js-content");

  if (sessionStorage.getItem("token")) {
    return;
  } else {
    login.render();
  }
}

init();