import { apiFetch, BASE_URL } from "./apiFetch.js";

function UserService() {
  if (!UserService.instance) {
    UserService.instance = this;
  }
  return UserService.instance;
  }

UserService.prototype.register = (username, email,first_name,last_name,password) =>
  apiFetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email,first_name, last_name,password}),
  });


export default UserService; 