export class Tile {
    constructor(index) {
        this.width = "100px";
        this.height = "100px";
        this.rootContainer = document.querySelector(".root");
        this.index = index;
        this.buildTile();
    }
    buildTile() {
        const tile = document.createElement("div");
        tile.dataset.number = this.index.toString();
        tile.classList.add("tile");
        tile.style.height = this.width;
        tile.style.width = this.height;
        this.rootContainer.appendChild(tile);
    }
}
