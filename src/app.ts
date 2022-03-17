enum ActivePlayer {
  X,
  O,
}

class Board {
  private boardTiles = 9;

  private rootContainer = document.querySelector(".root") as HTMLDivElement;
  private players = ["X", "O"];
  private Active = ActivePlayer.O;

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
    if (this.Active === ActivePlayer.O)
      this.rootContainer.addEventListener("click", (e) => {
        console.log(e.target);
      });
    if (this.Active === ActivePlayer.X) {
      console.log("X");
    }
  }
}

const TicTacToeBoard = new Board();
