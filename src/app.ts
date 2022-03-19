enum ActivePlayer {
  X,
  O,
}

interface ChosenNumbers {
  O: string[];
  X: string[];
}

interface PlayerAction {
  tile: HTMLDivElement;
  color: string;
  chosenNumbersByPlayer: string[];
}

class Board {
  private boardTiles = 9;
  private rootContainer = document.querySelector(".root") as HTMLDivElement;
  active = false;
  private chosenNumbers: ChosenNumbers = { O: [], X: [] };
  private winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  constructor() {
    this.buildTiles();
    this.onTileClick();
  }

  buildTiles() {
    for (let i = 0; i < this.boardTiles; i++) {
      let tile = document.createElement("div");
      tile.dataset.number = i.toString();
      tile.classList.add("tile");
      tile.innerText = "hi";
      tile.style.height = "100px";
      tile.style.width = "100px";
      tile.style.backgroundColor = "yellow";
      this.rootContainer.appendChild(tile);
    }
  }

  checkWinner(playerNumbers: string[]) {
    return this.winningConditions.some((condition) => {
      return condition.every((element) => {
        return playerNumbers.includes(element.toString());
      });
    });
  }
  onTileClick() {
    this.rootContainer.addEventListener("click", (e: Event) => {
      const tile = e.target as HTMLDivElement;
      if (tile.classList.contains("tile")) {
        if (this.active) {
          this.playerClicked({
            tile: tile,
            color: "green",
            chosenNumbersByPlayer: this.chosenNumbers.X,
          });
        }
        if (!this.active) {
          this.playerClicked({
            tile: tile,
            color: "blue",
            chosenNumbersByPlayer: this.chosenNumbers.O,
          });
        }
      }
    });
  }

  changePlayer() {
    this.active = true;
  }

  playerClicked(playerAction: PlayerAction) {
    playerAction.tile.style.backgroundColor = playerAction.color;

    const dataNumber = playerAction.tile.getAttribute("data-number");
    playerAction.chosenNumbersByPlayer.push(dataNumber!);

    if (this.checkWinner(playerAction.chosenNumbersByPlayer)) {
      console.log("won");
      this.changePlayer();
    }
  }
}

const TicTacToeBoard = new Board();
