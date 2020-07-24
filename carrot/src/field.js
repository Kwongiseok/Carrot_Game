export default class Field {
  "use strict";
  constructor() {
    this.items = document.querySelector(".items");
    this.itemsRect = this.items.getBoundingClientRect();
    this.items.addEventListener("click", this.onClick);
  }

  addItem(className, id, img__path) {
    const x1 = 0;
    const x2 = this.itemsRect.width - 60;
    const y1 = 0;
    const y2 = this.itemsRect.height - 60;
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", img__path);
    item.setAttribute("data-id", id);
    item.style.position = "absolute";
    item.style.left = `${randomNumber(x1, x2)}px`;
    item.style.top = `${randomNumber(y1, y2)}px`;
    this.items.appendChild(item);
  }
  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }
  onItemClick(event) {
    this.onItemClick && this.onItemClick(event);
  }
  onClick = (e) => {
    this.onItemClick(e);
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
