import { apiFetch, BASE_URL } from "./apiFetch.js";

function UserService() {
  if (!UserService.instance) {
    UserService.instance = this;
  }
  return UserService.instance;
  }

export default UserService; 