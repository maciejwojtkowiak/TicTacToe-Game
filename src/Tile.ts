export class Tile {
  private color: string;
  private index: number;
  private width = "100px";
  private height = "100px";

  private rootContainer = document.querySelector(".root") as HTMLDivElement;
  constructor(color: string, index: number) {
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
