"use strict";
import popup from "./popup.js";
import field from "./field.js";
import * as sound from "./sound.js";

const gameFinishBanner = new popup();
gameFinishBanner.setClickListener(() => {
  startGame();
});

let time = 10;
let sec = "";
let x;
let first = true;
let random__bug;
let random__carrot;
const start_btn = document.querySelector(".playbox__start");
const stop_btn = document.querySelector(".playbox__stop");
const playbox__time = document.querySelector(".playbox__time");
const playbox__counter = document.querySelector(".playbox__counter");
const fieldMap = new field(random__carrot, random__bug);

start_btn.addEventListener("click", (e) => {
  start_btn.style.display = "none";
  stop_btn.style.display = "inline";
  sound.playBackground();
  if (first) {
    random__bug = Math.floor(Math.random() * 5) + 5;
    random__carrot = Math.floor(Math.random() * 5) + 5;
    playbox__counter.innerHTML = random__carrot;
    for (var i = 0; i < random__bug; i++) {
      /* bug Generator */
      fieldMap.addItem("bug__img", i, "carrot/img/bug.png");
    }
    for (var i = 0; i < random__carrot; i++) {
      /* Carrot Generator */
      fieldMap.addItem("carrot__img", i, "carrot/img/carrot.png");
    }
  }
  first = false;
  sec = time % 60;
  if (time > 0) {
    playbox__time.innerHTML = "00:" + sec;
    time--;
  }
  x = setInterval(function () {
    sec = time % 60;
    playbox__time.innerHTML = "00:" + sec;
    time--;
    if (time < 0) {
      sound.playAlert();
      clearInterval(x);
      gameFinishBanner.showWithText("You Lost 😭");
    }
  }, 1000);
});

stop_btn.addEventListener("click", (e) => {
  stop_btn.style.display = "none";
  start_btn.style.display = "inline";
  sound.stopBackground();
  clearInterval(x);
});

fieldMap.items.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (id) {
    if (e.target.className == "bug__img") {
      sound.playBug();
      clearInterval(x);
      stop_btn.style.visibility = "hidden";
      gameFinishBanner.showWithText("You Lost 😭");
    } else if (e.target.className == "carrot__img") {
      sound.playCaarot();
      const deleted = document.querySelector(`.carrot__img[data-id="${id}"]`);
      deleted.remove();
      playbox__counter.textContent--;
      if (playbox__counter.textContent === "0") {
        sound.playWin();
        clearInterval(x);
        stop_btn.style.visibility = "hidden";
        gameFinishBanner.showWithText("You WON 👍");
      }
    }
  }
});

function startGame() {
  time = 10;
  first = true;
  fieldMap.items.innerHTML = ``;
  stop_btn.style.visibility = "visible";
  start_btn.dispatchEvent(new Event("click"));
}
