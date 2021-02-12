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


UserService.prototype.update = (id, username, email,first_name,last_name,password) =>

  apiFetch(`${BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token toke=${sessionStorage.getItem("token")}`
    },
    body: JSON.stringify({ username, email,first_name, last_name, password}),
  });

UserService.prototype.destroy = (id) =>

  apiFetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token toke=${sessionStorage.getItem("token")}`
    },
  });

export default UserService; 