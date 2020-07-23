"use strict";

let startAud = new Audio("carrot/sound/bg.mp3");
let bug_pull = new Audio("carrot/sound/bug_pull.mp3");
let carrot_pull = new Audio("carrot/sound/carrot_pull.mp3");
let game_win = new Audio("carrot/sound/game_win.mp3");
let alert = new Audio("carrot/sound/alert.wav");

export function playCaarot() {
  playSound(carrot_pull);
}
export function playBug() {
  playSound(bug_pull);
}
export function playAlert() {
  playSound(alert);
}
export function playWin() {
  playSound(game_win);
}
export function playBackground() {
  playBackG(startAud);
}
export function stopBackground() {
  stopSound(startAud);
}

function playBackG(sound) {
  sound.play();
}
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
