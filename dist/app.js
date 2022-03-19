"use strict";
var ActivePlayer;
(function (ActivePlayer) {
    ActivePlayer[ActivePlayer["X"] = 0] = "X";
    ActivePlayer[ActivePlayer["O"] = 1] = "O";
})(ActivePlayer || (ActivePlayer = {}));
class Board {
    constructor() {
        this.boardTiles = 9;
        this.rootContainer = document.querySelector(".root");
        this.active = false;
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
    playerClicked(playerAction) {
        playerAction.tile.style.backgroundColor = playerAction.color;
        const dataNumber = playerAction.tile.getAttribute("data-number");
        playerAction.chosenNumbersByPlayer.push(dataNumber);
        if (this.checkWinner(playerAction.chosenNumbersByPlayer)) {
            console.log("won");
            this.changePlayer();
        }
    }
}
const TicTacToeBoard = new Board();
