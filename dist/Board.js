import { Tile } from "./Tile.js";
var ActivePlayer;
(function (ActivePlayer) {
    ActivePlayer[ActivePlayer["X"] = 0] = "X";
    ActivePlayer[ActivePlayer["O"] = 1] = "O";
})(ActivePlayer || (ActivePlayer = {}));
export class Board {
    constructor() {
        this.boardTiles = 9;
        this.rootContainer = document.querySelector(".root");
        this.active = ActivePlayer.O;
        this.chosenNumbers = { O: [], X: [] };
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
    onTileClick() {
        this.rootContainer.addEventListener("click", (e) => {
            const tile = e.target;
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
    playerClicked(playerAction) {
        playerAction.tile.classList.add(`${this.active === ActivePlayer.X ? "tileX" : "tileO"}`);
        const dataNumber = playerAction.tile.getAttribute("data-number");
        playerAction.chosenNumbersByPlayer.push(dataNumber);
        const playerWon = this.checkWinner(playerAction.chosenNumbersByPlayer);
        if (playerWon)
            this.playerWon(this.active);
    }
    playerWon(activePlayer) {
        const modal = document.querySelector(".modal");
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
        tiles.forEach((tile) => {
            if (tile.classList.contains("tileX"))
                tile.classList.remove("tileX");
            if (tile.classList.contains("tileO"))
                tile.classList.remove("tileO");
            return;
        });
        this.chosenNumbers.O.splice(0, this.chosenNumbers.O.length);
        this.chosenNumbers.X.splice(0, this.chosenNumbers.X.length);
    }
}
new Board();
