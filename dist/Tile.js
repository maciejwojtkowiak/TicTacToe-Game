"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
class Tile {
    constructor(color, index) {
        this.width = "100px";
        this.height = "100px";
        this.rootContainer = document.querySelector(".root");
        this.color = color;
        this.index = index;
        this.buildTile();
    }
    buildTile() {
        const tile = document.createElement("div");
        tile.dataset.number = this.index.toString();
        tile.classList.add("tile");
        tile.innerText = "hi";
        tile.style.height = this.width;
        tile.style.width = this.height;
        tile.style.backgroundColor = this.color;
        this.rootContainer.appendChild(tile);
    }
}
exports.Tile = Tile;
