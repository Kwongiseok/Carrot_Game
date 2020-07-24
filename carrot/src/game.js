"use strict";

import Field from "./field.js";
import * as sound from "./sound.js";
import popup from "./popup.js";

export default class GameBuilder {
  bugNum(num) {
    this.random__bug = num;
    return this;
  }
  carrotNum(num) {
    this.random__carrot = num;
    return this;
  }
  build() {
    return new game(this.random__bug, this.random__carrot);
  }
}

class game {
  constructor(random__bug, random__carrot) {
    this.time = 3;
    this.sec = "";
    this.x = "";
    this.first = true;
    this.random__bug = random__bug;
    this.random__carrot = random__carrot;
    this.start__btn = document.querySelector(".playbox__start");
    this.stop__btn = document.querySelector(".playbox__stop");
    this.playbox__time = document.querySelector(".playbox__time");
    this.playbox__counter = document.querySelector(".playbox__counter");
    this.fieldMap = new Field();
    this.gameFinishBanner = new popup();
    this.gameFinishBanner.setClickListener(() => {
      this.startGame();
    });
    this.start__btn.addEventListener("click", () => {
      this.start_btn();
    });
    this.stop__btn.addEventListener("click", () => {
      this.stop_btn();
    });
    this.fieldMap.setClickListener(this.addItemTofield);
  }

  updateTimerText(text) {
    this.playbox__time.innerText = text;
  }

  timer() {
    this.x = setInterval(() => {
      this.sec = this.time % 60;
      this.updateTimerText(`00:${this.sec}`);
      this.time--;
      if (this.time < 0) {
        sound.playAlert();
        clearInterval(this.x);
        this.stop__btn.style.visibility = "hidden";
        this.gameFinishBanner.showWithText("You Lost 😭");
      }
    }, 1000);
  }

  start_btn() {
    this.start__btn.style.display = "none";
    this.stop__btn.style.display = "inline";
    sound.playBackground();
    if (this.first) {
      this.playbox__counter.innerHTML = this.random__carrot;
      for (let i = 0; i < this.random__bug; i++) {
        /* bug Generator */
        this.fieldMap.addItem("bug__img", i, "carrot/img/bug.png");
      }
      for (let i = 0; i < this.random__carrot; i++) {
        /* Carrot Generator */
        this.fieldMap.addItem("carrot__img", i, "carrot/img/carrot.png");
      }
    }
    this.first = false;
    this.sec = this.time % 60;
    if (this.time > 0) {
      this.playbox__time.innerHTML = "00:" + this.sec;
      this.time--;
    }
    this.timer();
  }
  stop_btn() {
    this.stop__btn.style.display = "none";
    this.start__btn.style.display = "inline";
    sound.stopBackground();
    clearInterval(this.x);
  }

  addItemTofield = (e) => {
    const id = e.target.dataset.id;
    if (id) {
      if (e.target.className == "bug__img") {
        sound.playBug();
        clearInterval(this.x);
        this.stop__btn.style.visibility = "hidden";
        this.gameFinishBanner.showWithText("You Lost 😭");
      } else if (e.target.className == "carrot__img") {
        sound.playCaarot();
        const deleted = document.querySelector(`.carrot__img[data-id="${id}"]`);
        deleted.remove();
        this.playbox__counter.textContent--;
        if (this.playbox__counter.textContent === "0") {
          sound.playWin();
          clearInterval(this.x);
          this.stop__btn.style.visibility = "hidden";
          this.gameFinishBanner.showWithText("You WON 👍");
        }
      }
    }
  };

  startGame() {
    this.time = 10;
    this.first = true;
    this.fieldMap.items.innerHTML = ``;
    this.stop__btn.style.visibility = "visible";
    this.start__btn.dispatchEvent(new Event("click"));
  }
}
