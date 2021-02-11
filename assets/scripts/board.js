

export default function Board(parentSelector) {
  if (!Board.instance) {
    this.parentSelector = parentSelector;
    this.parentElement = document.querySelector(parentSelector);
    this.toString = function () {
      return `
      <header>
        <div class="organizable">
            {organiz<span class="organizable__able">able</span>}
        </div>
    </header>
    <main>
        <section class="container">
            <nav class="container--navbar">
                <a href=" ">My boards</a>
                <a href=" ">Closed boards</a>
                <a href=" "> My Profile</a>
                <button class="container--navbar__logout">Log out</button>
            </nav>
            <article class="container--options">
                <p>Boards</p>
            </article>
        </section>
    </main>
      `;
    };
    Board.instance = this;
  }
  return Board.instance;
}

Board.prototype.render = function () {
  this.parentElement.innerHTML = this;

};

