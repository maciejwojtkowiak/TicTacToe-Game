class Board {
  private boardTiles = 9;

  private rootContainer = document.querySelector(".root") as HTMLDivElement;
  private players = ["X", "O"];
  constructor() {
    this.buildTiles();
    this.onTileClick();
  }

  buildTiles() {
    for (let i = 0; i < this.boardTiles; i++) {
      let tile = document.createElement("div");
      tile.dataset.number = i.toString();
      tile.innerText = "hi";
      tile.style.height = "100px";
      tile.style.width = "100px";
      tile.style.backgroundColor = "yellow";
      this.rootContainer.appendChild(tile);
    }
  }

  onTileClick() {
    this.rootContainer.addEventListener("click", (e) => {
      console.log(e.target);
    });
  }
}

const TicTacToeBoard = new Board();
