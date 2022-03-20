import { Tile } from "./Tile.js";
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
  private active: ActivePlayer = ActivePlayer.O;
  chosenNumbers: ChosenNumbers = { O: [], X: [] };
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
      new Tile("yellow", i);
    }
  }

  startingPlayer() {
    const playerNumber = Math.round(Math.random());
    if (playerNumber === 0) this.active = ActivePlayer.O;
    if (playerNumber === 1) this.active = ActivePlayer.X;
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
        if (this.active === ActivePlayer.O) {
          this.playerClicked({
            tile: tile,
            color: "green",
            chosenNumbersByPlayer: this.chosenNumbers.O,
          });
        }
        if (this.active === ActivePlayer.X) {
          this.playerClicked({
            tile: tile,
            color: "blue",
            chosenNumbersByPlayer: this.chosenNumbers.X,
          });
        }
      }
      this.changePlayer();
    });
  }

  changePlayer() {
    this.active =
      this.active === ActivePlayer.X ? ActivePlayer.O : ActivePlayer.X;
  }

  playerClicked(playerAction: PlayerAction) {
    playerAction.tile.style.backgroundColor = playerAction.color;

    const dataNumber = playerAction.tile.getAttribute("data-number");
    playerAction.chosenNumbersByPlayer.push(dataNumber!);
    const playerWon = this.checkWinner(playerAction.chosenNumbersByPlayer);
    if (playerWon) console.log("won");
  }
}

const TicTacToeBoard = new Board();
