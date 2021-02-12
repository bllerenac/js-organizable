export default function Tooltip(){
  if(!Tooltip.instance) {
    Tooltip.instance = this;
  }
  return Tooltip.instance;
};

Tooltip.prototype.render = function () {
  this.show();
  this.color_change();
  this.hidden();
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
        new_board.style.backgroundColor = color.textContent
        
      }
    })
  })
};


