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

  chosenNumbersByPlayer: string[];
}

export class Board {
  private boardTiles = 9;
  private rootContainer = document.querySelector(".root") as HTMLDivElement;
  private active: ActivePlayer = ActivePlayer.O;
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
    for (let index = 0; index < this.boardTiles; index++) {
      new Tile(index);
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
            chosenNumbersByPlayer: this.chosenNumbers.O,
          });
        }
        if (this.active === ActivePlayer.X) {
          this.playerClicked({
            tile: tile,
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
    console.log(this.active);
  }

  playerClicked(playerAction: PlayerAction) {
    playerAction.tile.classList.add(
      `${this.active === ActivePlayer.X ? "tileX" : "tileO"}`
    );

    const dataNumber = playerAction.tile.getAttribute("data-number");
    playerAction.chosenNumbersByPlayer.push(dataNumber!);
    const playerWon = this.checkWinner(playerAction.chosenNumbersByPlayer);
    if (playerWon) this.playerWon(this.active);
  }

  playerWon(activePlayer: ActivePlayer) {
    const modal = document.querySelector(".modal") as HTMLDivElement;
    modal.classList.add("modal-container");
    modal.innerText =
      activePlayer === ActivePlayer.O ? "O Player won" : "X Player won ";

    modal.addEventListener("click", () => {
      modal.classList.remove("modal-container");
      this.resetGame();
    });
  }

  resetGame() {
    const tiles = document.querySelectorAll(".tile");
    console.log(tiles);
  }
}

new Board();
