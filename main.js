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
const lost = document.querySelector(".lost");
const win = document.querySelector(".win");
const playbox__time = document.querySelector(".playbox__time");
const playbox__counter = document.querySelector(".playbox__counter");
const lost__return = document.querySelector(".lost__return");
const win__return = document.querySelector(".win__return");
const items = document.querySelector(".items");
const itemsRect = items.getBoundingClientRect();

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
      const bug__tmp = document.createElement("img");
      bug__tmp.setAttribute("class", "bug__img");
      bug__tmp.setAttribute("src", "carrot/img/bug.png");
      bug__tmp.setAttribute("data-id", i);
      bug__tmp.style.top = Math.floor(Math.random() * 160) + 200 + "px";
      bug__tmp.style.left = Math.floor(Math.random() * 520) + 300 + "px";

      items.appendChild(bug__tmp);
    }
    for (var i = 0; i < random__carrot; i++) {
      /* Carrot Generator */
      const carrot__tmp = document.createElement("img");
      carrot__tmp.setAttribute("class", "carrot__img");
      carrot__tmp.setAttribute("src", "carrot/img/carrot.png");
      carrot__tmp.setAttribute("data-id", i);
      carrot__tmp.style.top = Math.floor(Math.random() * 160) + 200 + "px";
      carrot__tmp.style.left = Math.floor(Math.random() * 520) + 300 + "px";
      items.appendChild(carrot__tmp);
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
      lost.style.display = "block";
    }
  }, 1000);
});

stop_btn.addEventListener("click", (e) => {
  stop_btn.style.display = "none";
  start_btn.style.display = "inline";
  startAud.pause();
  clearInterval(x);
});

lost__return.addEventListener("click", (e) => {
  time = 10;
  first = true;
  startAud.pause();
  lost.style.display = "none";
  win.style.display = "none";
  items.innerHTML = ``;
  stop_btn.style.visibility = "visible";
  start_btn.dispatchEvent(new Event("click"));
});

win__return.addEventListener("click", (e) => {
  time = 10;
  first = true;
  lost.style.display = "none";
  win.style.display = "none";
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
      lost.style.display = "block";
    } else if (e.target.className == "carrot__img") {
      carrot_pull.play();
      const deleted = document.querySelector(`.carrot__img[data-id="${id}"]`);
      deleted.remove();
      playbox__counter.textContent--;
      if (playbox__counter.textContent === "0") {
        game_win.play();
        clearInterval(x);
        stop_btn.style.visibility = "hidden";
        win.style.display = "block";
      }
    }
  }
});
