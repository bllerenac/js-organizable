import STORE from "./store.js";

export default class ShowBoard{

  constructor(parentSelector){
    this.parentSelector = parentSelector;
  }

  toString(){
    let {name,color} = STORE.boardSelected
    return `
      <section class="show-board ${color}">
        <div class="show-board__header">
          <h3>${name}</h3>

          <button class="btn-header-show">
            <img src="./assets/images/star.svg" />
          </button>
          <button class="btn-header-show">
            <img src="./assets/images/closed.svg" />
          </button>
        </div>

        <div class="show-board__content">
          Aqui pones tu contenio
        </div>
      </section>
      `;
  }

  render(){
    document.querySelector(this.parentSelector).innerHTML = this.toString()
  }

}
