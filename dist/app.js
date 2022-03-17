"use strict";
class Board {
    constructor() {
        this.BoardTiles = 9;
        this.RootContainer = document.querySelector(".root");
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
