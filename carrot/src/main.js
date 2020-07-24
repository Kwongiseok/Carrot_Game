"use strict";
import popup from "./popup.js";
// import field from "./field.js";
// import * as sound from "./sound.js";
import GameBuilder from "./game.js";

const gamePlay = new GameBuilder()
  .bugNum(Math.floor(Math.random() * 5) + 5)
  .carrotNum(Math.floor(Math.random() * 5) + 5)
  .build();
