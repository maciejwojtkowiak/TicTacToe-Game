class Board {
  private BoardTiles = 9;
  private RootContainer = document.querySelector(".root") as HTMLDivElement;
  constructor() {
    this.buildTiles();
  }

  buildTiles() {
    for (let i = 0; i < this.BoardTiles; i++) {
      let tile = document.createElement("div");
      tile.innerText = "hi";
      tile.style.height = "100px";
      tile.style.width = "100px";
      tile.style.backgroundColor = "yellow";
      this.RootContainer.appendChild(tile);
    }
  }
}

const TicTacToeBoard = new Board();
