"use strict";

export default class popup {
  constructor() {
    this.popUp = document.querySelector(".popup");
    this.popUpMessage = document.querySelector(".Message");
    this.return__btn = document.querySelector(".return__btn");
    this.return__btn.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }
  showWithText(text) {
    this.popUpMessage.innerText = text;
    this.popUp.style.display = "block";
  }
  hide() {
    this.popUp.style.display = "none";
  }
}
