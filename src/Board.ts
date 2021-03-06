import { Tile } from "./Tile.js";
import { ActivePlayer } from "./Types.js";
import { ChosenNumbers } from "./Types.js";
import { PlayerAction } from "./Types.js";

export class Board {
  private boardTiles = 9;
  private rootContainer = document.querySelector(".root") as HTMLDivElement;
  protected active: ActivePlayer = ActivePlayer.O;
  private chosenNumbers: ChosenNumbers = { O: [], X: [], total: [] };
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
    this.changeHeaderContent();
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

  checkDraw() {
    return this.chosenNumbers.total.length === this.boardTiles;
  }
  onTileClick() {
    this.rootContainer.addEventListener("click", (e: Event) => {
      const tile = e.target as HTMLDivElement;
      console.log(tile.classList.contains("cross" || "circle"));
      if (
        tile.classList.contains("tile") &&
        !tile.classList.contains("cross") &&
        !tile.classList.contains("circle")
      ) {
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
        this.changePlayer();
      }
    });
  }

  changePlayer() {
    this.active =
      this.active === ActivePlayer.X ? ActivePlayer.O : ActivePlayer.X;
  }

  playerClicked(playerAction: PlayerAction) {
    this.changeHeaderContent();

    playerAction.tile.classList.add(
      `${this.active === ActivePlayer.X ? "cross" : "circle"}`
    );

    const dataNumber = playerAction.tile.getAttribute("data-number");
    playerAction.chosenNumbersByPlayer.push(dataNumber!);
    this.chosenNumbers.total.push(dataNumber!);

    const playerWon = this.checkWinner(playerAction.chosenNumbersByPlayer);
    const isDraw = !playerWon && this.checkDraw();
    if (playerWon || isDraw) this.showModal(isDraw);
  }

  showModal(isDraw: boolean) {
    const modal = document.querySelector(".modal") as HTMLDivElement;

    const restartButton = document.querySelector(
      ".restart-button"
    ) as HTMLButtonElement;

    const message = document.querySelector(".message") as HTMLHeadingElement;

    modal.classList.remove("hidden");
    if (!isDraw) {
      message.innerText = `${this.active === 0 ? "X" : "O"} player has won`;
    }

    if (isDraw) {
      message.innerText = "Draw";
    }

    restartButton.addEventListener("click", () => {
      modal.classList.add("hidden");
      message.innerText = "";
      this.resetGame();
    });
  }

  resetGame() {
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach((tile) => {
      if (tile.classList.contains("cross")) tile.classList.remove("cross");
      if (tile.classList.contains("circle")) tile.classList.remove("circle");
      return;
    });

    this.chosenNumbers.O.splice(0, this.chosenNumbers.O.length);
    this.chosenNumbers.X.splice(0, this.chosenNumbers.X.length);
    this.chosenNumbers.total.splice(0, this.chosenNumbers.total.length);
  }

  changeHeaderContent() {
    const header = document.querySelector(".header") as HTMLHeadingElement;
    header.innerText = `It is ${this.active === 1 ? "X" : "O"} player turn!`;
  }
}

new Board();
