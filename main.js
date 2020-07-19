"use strict";

let time = 10;
let sec = "";
let x;
let first = true;
let random__bug;
let random__carrot;

const start_btn = document.querySelector(".playbox__start");
const stop_btn = document.querySelector(".playbox__stop");
const lost = document.querySelector(".lost");
const win = document.querySelector(".win");
const playbox__time = document.querySelector(".playbox__time");
const playbox__counter = document.querySelector(".playbox__counter");
const lost__return = document.querySelector(".lost__return");
const win__return = document.querySelector(".win__return");
const bugs = document.querySelector(".bugs");
const carrots = document.querySelector(".carrots");

start_btn.addEventListener("click", (e) => {
  start_btn.style.display = "none";
  stop_btn.style.display = "inline";
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

      bug__tmp.style.left = Math.floor(Math.random() * 300) + "px";
      bugs.appendChild(bug__tmp);
    }
    for (var i = 0; i < random__carrot; i++) {
      /* Carrot Generator */
      const carrot__tmp = document.createElement("img");
      carrot__tmp.setAttribute("class", "carrot__img");
      carrot__tmp.setAttribute("src", "carrot/img/carrot.png");
      carrot__tmp.setAttribute("data-id", i);

      carrot__tmp.style.left = Math.floor(Math.random() * 300) + "px";
      carrots.appendChild(carrot__tmp);
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
      clearInterval(x);
      lost.style.display = "block";
    }
  }, 1000);
});

stop_btn.addEventListener("click", (e) => {
  stop_btn.style.display = "none";
  start_btn.style.display = "inline";
  clearInterval(x);
});

lost__return.addEventListener("click", (e) => {
  time = 10;
  first = true;
  lost.style.display = "none";
  win.style.display = "none";
  bugs.innerHTML = ``;
  carrots.innerHTML = ``;
  stop_btn.style.visibility = "visible";
  start_btn.dispatchEvent(new Event("click"));
});

win__return.addEventListener("click", (e) => {
  time = 10;
  first = true;
  lost.style.display = "none";
  win.style.display = "none";
  bugs.innerHTML = ``;
  carrots.innerHTML = ``;
  stop_btn.style.visibility = "visible";
  start_btn.dispatchEvent(new Event("click"));
});

bugs.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (id) {
    clearInterval(x);
    stop_btn.style.visibility = "hidden";
    lost.style.display = "block";
  }
});

carrots.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (id) {
    const deleted = document.querySelector(`.carrot__img[data-id="${id}"]`);
    deleted.remove();
    playbox__counter.textContent--;
    if (playbox__counter.textContent === "0") {
      clearInterval(x);
      stop_btn.style.visibility = "hidden";
      win.style.display = "block";
    }
  }
});
