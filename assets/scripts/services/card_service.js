import { apiFetch, BASE_URL } from "./apiFetch.js";

function CardService() {
  if (!CardService.instance) {
    CardService.instance = this;
  }
  return CardService.instance;
}

CardService.prototype.create = (id, name) =>
  apiFetch(`${BASE_URL}/lists/${id}/cards`,{
    method: "POST",
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`,
      "Content-Type": "application/json",
    }, body: JSON.stringify({name, "desc": "This description is optional","closed": false}),
  })

CardService.prototype.Card_data = (list_id,card_id) =>
  apiFetch(`${BASE_URL}/lists/${list_id}/cards/${card_id}`,{
    method: "GET",
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`
    }
  })

CardService.prototype.UpdateList = (actual_list_id, card_id, list_id, pos, name ) =>
  apiFetch(`${BASE_URL}/lists/${actual_list_id}/cards/${card_id}`,{
    method: "PATCH",
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`,
      "Content-Type": "application/json",
    }, body: JSON.stringify({ list_id, pos, name})
  })

  export default CardService;