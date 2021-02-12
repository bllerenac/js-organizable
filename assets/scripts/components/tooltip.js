export default function Tooltip(){
  if(!Tooltip.instance) {
    Tooltip.instance = this;
  }
  return Tooltip.instance;
};

Tooltip.prototype.render = function () {
  this.show();
};

Tooltip.prototype.show = function (){
  const button_create = document.querySelector(".btn_new_board")
  button_create.addEventListener("click", (e) => {
    const tooltip = document.querySelector(".tool_new_board")
    tooltip.classList.remove('hidden')
    console.log("show")
  });
};