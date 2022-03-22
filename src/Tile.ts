export class Tile {
  private index: number;
  private width = "100px";
  private height = "100px";

  private rootContainer = document.querySelector(".root") as HTMLDivElement;
  constructor(index: number) {
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

    this.rootContainer.appendChild(tile);
  }
}
