import { apiFetch, BASE_URL } from "./apiFetch.js";

function ListService() {
  if (!ListService.instance) {
    ListService.instance = this;
  }
  return ListService.instance;
}

ListService.prototype.all = (id) => 
  apiFetch(`${BASE_URL}/boards/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    },
  });

export default ListService;