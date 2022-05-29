import { Tile } from "./Tile.js";
import { ActivePlayer } from "./Types.js";
export class Board {
    constructor() {
        this.boardTiles = 9;
        this.rootContainer = document.querySelector(".root");
        this.active = ActivePlayer.O;
        this.chosenNumbers = { O: [], X: [], total: [] };
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
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
        if (playerNumber === 0)
            this.active = ActivePlayer.O;
        if (playerNumber === 1)
            this.active = ActivePlayer.X;
    }
    checkWinner(playerNumbers) {
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
        this.rootContainer.addEventListener("click", (e) => {
            const tile = e.target;
            if (tile.classList.contains("tile")) {
                if (ActivePlayer.O) {
                    this.playerClicked({
                        tile: tile,
                        chosenNumbersByPlayer: this.chosenNumbers.O,
                    });
                }
                if (ActivePlayer.X) {
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
        this.active = ActivePlayer.X ? ActivePlayer.O : ActivePlayer.X;
    }
    playerClicked(playerAction) {
        const tileHasBeenChosen = this.chosenNumbers.total.find((numberOfTile) => numberOfTile === playerAction.tile.dataset.number);
        if (tileHasBeenChosen)
            return;
        this.changeHeaderContent();
        playerAction.tile.classList.add(`${ActivePlayer.X ? "cross" : "circle"}`);
        const dataNumber = playerAction.tile.getAttribute("data-number");
        playerAction.chosenNumbersByPlayer.push(dataNumber);
        this.chosenNumbers.total.push(dataNumber);
        const playerWon = this.checkWinner(playerAction.chosenNumbersByPlayer);
        const isDraw = !playerWon && this.checkDraw();
        if (playerWon || isDraw)
            this.showModal(isDraw);
    }
    showModal(isDraw) {
        const modal = document.querySelector(".modal");
        const modalMessage = document.querySelector(".modal-message");
        const restartButton = document.querySelector(".restart-button");
        const message = document.createElement("p");
        modalMessage.appendChild(message);
        modal.classList.remove("hidden");
        if (!isDraw) {
            message.innerText = `${ActivePlayer.O ? "X" : "O"} player has won`;
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
            if (tile.classList.contains("cross"))
                tile.classList.remove("cross");
            if (tile.classList.contains("circle"))
                tile.classList.remove("circle");
            return;
        });
        this.chosenNumbers.O.splice(0, this.chosenNumbers.O.length);
        this.chosenNumbers.X.splice(0, this.chosenNumbers.X.length);
        this.chosenNumbers.total.splice(0, this.chosenNumbers.total.length);
    }
    changeHeaderContent() {
        const header = document.querySelector(".header");
        header.innerText = `It is ${ActivePlayer.O ? "X" : "O"} player turn!`;
    }
}
new Board();
