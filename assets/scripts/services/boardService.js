import { apiFetch, BASE_URL } from "./apiFetch.js";

function BoardService() {
  if (!BoardService.instance) {
    BoardService.instance = this;
  }
  return BoardService.instance;
}

BoardService.prototype.all = () =>

  apiFetch(`${BASE_URL}/boards`, {
    method: "GET",
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    },
  });

BoardService.prototype.closed = (id) =>

  apiFetch(`${BASE_URL}/boards/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`,
      "Content-Type": "application/json",
    }, body: JSON.stringify({ 'closed': true }),
  });
BoardService.prototype.activated = (id) =>

  apiFetch(`${BASE_URL}/boards/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`,
      "Content-Type": "application/json",
    }, body: JSON.stringify({ 'closed': false }),
  });
BoardService.prototype.starred = (id,status) =>

  apiFetch(`${BASE_URL}/boards/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`,
      "Content-Type": "application/json",
    }, body: JSON.stringify({ 'starred': status }),
});

BoardService.prototype.delete = (id) =>

  apiFetch(`${BASE_URL}/boards/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`,
    },
  });

BoardService.prototype.create = (name, closed, color, starred) =>
  apiFetch(`${BASE_URL}/boards`, {
    method: "POST" ,
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`,
      "Content-Type": "application/json",
    }, body: JSON.stringify({ name, closed, color, starred}),
  });

export default BoardService;