"use strict";

let time = 10;
let sec = "";
let x;
let first = true;
let random__bug;
let random__carrot;

let startAud = new Audio("carrot/sound/bg.mp3");
let bug_pull = new Audio("carrot/sound/bug_pull.mp3");
let carrot_pull = new Audio("carrot/sound/carrot_pull.mp3");
let game_win = new Audio("carrot/sound/game_win.mp3");
let alert = new Audio("carrot/sound/alert.wav");

const start_btn = document.querySelector(".playbox__start");
const stop_btn = document.querySelector(".playbox__stop");
const popup = document.querySelector(".popup");
const playbox__time = document.querySelector(".playbox__time");
const playbox__counter = document.querySelector(".playbox__counter");
const return__btn = document.querySelector(".return__btn");
const Message = document.querySelector(".Message");
const items = document.querySelector(".items");
const itemsRect = items.getBoundingClientRect();

function addItem(className, id, img__path) {
  const x1 = 0;
  const x2 = itemsRect.width - 50;
  const y1 = 0;
  const y2 = itemsRect.height - 50;
  const item = document.createElement("img");
  item.setAttribute("class", className);
  item.setAttribute("src", img__path);
  item.setAttribute("data-id", id);
  item.style.position = "absolute";
  item.style.left = `${randomNumber(x1, x2)}px`;
  item.style.top = `${randomNumber(y1, y2)}px`;
  items.appendChild(item);
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
start_btn.addEventListener("click", (e) => {
  start_btn.style.display = "none";
  stop_btn.style.display = "inline";
  startAud.play();
  if (first) {
    random__bug = Math.floor(Math.random() * 5) + 5;
    random__carrot = Math.floor(Math.random() * 5) + 5;
    playbox__counter.innerHTML = random__carrot;
    for (var i = 0; i < random__bug; i++) {
      /* bug Generator */
      addItem("bug__img", i, "carrot/img/bug.png");
    }
    for (var i = 0; i < random__carrot; i++) {
      /* Carrot Generator */
      addItem("carrot__img", i, "carrot/img/carrot.png");
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
      alert.play();
      clearInterval(x);
      popup.style.display = "block";
    }
  }, 1000);
});

stop_btn.addEventListener("click", (e) => {
  stop_btn.style.display = "none";
  start_btn.style.display = "inline";
  startAud.pause();
  clearInterval(x);
});

return__btn.addEventListener("click", (e) => {
  time = 10;
  first = true;
  startAud.pause();
  popup.style.display = "none";
  items.innerHTML = ``;
  stop_btn.style.visibility = "visible";
  start_btn.dispatchEvent(new Event("click"));
});

items.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (id) {
    if (e.target.className == "bug__img") {
      bug_pull.play();
      clearInterval(x);
      stop_btn.style.visibility = "hidden";
      popup.style.display = "block";
      Message.innerHTML = `You Lost 😭`;
    } else if (e.target.className == "carrot__img") {
      carrot_pull.play();
      const deleted = document.querySelector(`.carrot__img[data-id="${id}"]`);
      deleted.remove();
      playbox__counter.textContent--;
      if (playbox__counter.textContent === "0") {
        game_win.play();
        clearInterval(x);
        stop_btn.style.visibility = "hidden";
        popup.style.display = "block";
        Message.innerHTML = `You WON 👍`;
      }
    }
  }
});
