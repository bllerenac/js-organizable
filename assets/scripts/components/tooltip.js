export default function Tooltip(){
  if(!Tooltip.instance) {
    Tooltip.instance = this;
  }
  return Tooltip.instance;
};

Tooltip.prototype.render = function () {
  this.show();
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

