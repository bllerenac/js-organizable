import STORE from "../store.js";
import BoardService from "../services/boardService.js"
import Board from "../main.js"

export default function Tooltip(){

};

Tooltip.prototype.render = function () {
  this.show();
  this.color_change();
  this.hidden();
  this.form_submit();
};

Tooltip.prototype.show = function (){
  const button_create = document.querySelector(".btn_new_board")
  button_create.addEventListener("click", (e) => {
    const tooltip = document.querySelector(".tool_new_board")
    tooltip.classList.remove('hidden')
    console.log("show")
  });
};

Tooltip.prototype.hidden = function (){
  const button_cancel = document.querySelector(".tooltip_hidden")
  button_cancel.addEventListener("click", (e) => {
    const tooltip = document.querySelector(".tool_new_board")
    tooltip.classList.add('hidden')
    console.log("hidden")
  });
};

Tooltip.prototype.color_change = function (){
  const tool_colors = document.querySelector(".tool_colors")
  tool_colors.addEventListener("click", (e) =>{
    const colors = tool_colors.querySelectorAll(".tool_colors a");
    const new_board = document.querySelector(".tool_board");
    colors.forEach(color => {
      if(color == e.target){
        new_board.style.backgroundColor = color.textContent;
        return color.textContent;
      }
    })
  })
};

Tooltip.prototype.form_submit = function (){
  const tool_form = document.querySelector(".tool_new_board");
  tool_form.addEventListener("submit", async (e) =>{
    console.log(e.target)
    e.preventDefault();
    const new_board = document.querySelector(".tool_board"); 
    const color_board = String(new_board.style.backgroundColor) || "indianred"
    const name = e.target.board_name.value;
    const closed = false;
    const color = color_board;
    const starred = false;
    try {
      const boardService = new BoardService();
      if(name && color){
        const data = await boardService.create(name,closed,color,starred);
        const board = new Board(".js-content");
        STORE.boards = await boardService.all()
        board.render();
      }
      
    } catch (e) {
      alert(e.message);
    }
   })
}

