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


  CardService.prototype.update = (idList,idCard ,name,desc) =>
  apiFetch(`${BASE_URL}/lists/${idList}/cards/${idCard}`,{
    method: "PATCH",
    headers: {
      Authorization: `Token token=${sessionStorage.getItem('token')}`,
      "Content-Type": "application/json",
    }, body: JSON.stringify({name, desc}),
  })
  export default CardService;