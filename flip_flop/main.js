"use strict";

/* const game = {
  timerIntervalId: 0,
  initialCards: 8,
  clicks: 0,
  colors: [],
  backgroundColor: "#b3afaf",
  timeTrigger: document.getElementById("timer"),
  seconds: document.getElementById("seconds"),
  minutes: document.getElementById("minutes"),
  pickedColors: {}
};
*/

let timerIntervalId;
let initialCards = 8;
let level = 1;
let clicks = 0;
let colors = [];
const backgroundColor = "#b3afaf";
let timeTrigger = document.getElementById("timer");
let seconds = document.getElementById("seconds");
let minutes = document.getElementById("minutes");

timeTrigger.addEventListener("click", startTimer);
document.getElementById("reset").addEventListener("click", resetGame);
document.getElementById("click-count").innerText = clicks;

colorGenerator();
cardsGenerator();

function colorGenerator() {
  colors = [];
  let color;
  while (colors.length < (initialCards * level)/2) {
    do {
        color = "#" + ("000000" + (Math.floor((Math.random()*1000000)+1)).toString(16)).slice(-6);
    } while (colors.indexOf(color) >= 0 && color !== backgroundColor) { //&& color !== "undefined"
    colors.push(color);
    }
  }
}

function cardsGenerator() {
  let pickedColors = {};
  let pickedColor = 0;
  
  for(let i = 0; i < (initialCards * level); i++) {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    do {
      pickedColor = colors[Math.floor(Math.random()*colors.length)];
    } while(pickedColors[pickedColor] === 2);
    if(!pickedColors[pickedColor]) {
      pickedColors[pickedColor] = 1;
    } else {
      pickedColors[pickedColor] = 2;
    }
    // pickedColors[pickedColor] = pickedColors[pickedColor] ? 2 : 1;
    card.setAttribute("data-color", pickedColor);
    card.addEventListener("click", cardClick);
    timeTrigger.appendChild(card);
  }

};

function timer() {
  let currentSeconds = Number(seconds.innerText);
  let currentMinutes = Number(minutes.innerText);
  if (currentSeconds < 60 ) {
    currentSeconds++;
  } else {
    currentSeconds = 0;
    currentMinutes++;
  }
  seconds.innerText = ("0" + currentSeconds).slice(-2);
  minutes.innerText = ("0" + currentMinutes).slice(-2);
}

function startTimer() {
timerIntervalId = setInterval(timer , 1000);
timeTrigger.removeEventListener("click", startTimer);
}

function cardClick(e) {
  let card = e.target;
  let result = document.getElementById("results");
  clicks++;
  document.getElementById("click-count").innerText = `${clicks}`;
  card.setAttribute("style", "background-color: " + card.dataset.color);
  card.setAttribute("class", "flipped");
  let flipped = document.getElementsByClassName("flipped");
  flipped = [...flipped];
  if (flipped.length === 2 && flipped[0].dataset.color === flipped[1].dataset.color) {
    flipped.forEach(card => {
      card.setAttribute("class", "match");
    }); 

    let matched = document.getElementsByClassName("match");
    matched = [...matched];
    if (matched.length === (initialCards * level)) {
      clearInterval(timerIntervalId);
      let finalTime = minutes.innerHTML + " : " + seconds.innerHTML;
      document.getElementById("clicks").innerText = clicks;
      document.getElementById("time").innerText = finalTime;
      result.classList.add("show");
      let nextLevel = document.getElementById("next");
      nextLevel.addEventListener("click", gameLevelUp);
    }
    //flipped cards don't match
  } else if (flipped.length >= 2) {
    // result.setAttribute("style", "visibility: visible;");
    let cards = document.getElementsByClassName("card");
    cards = [...cards];
    cards.forEach(card => card.setAttribute("style", "pointer-events: none;"))
    setTimeout( function () {
      cards.forEach(card => card.removeAttribute("style"));
      flipped.forEach(card => {
        card.removeAttribute("style");
        card.setAttribute("class", "card");
      });
      flipped = [];
    }, 500);
  }
}

function resetGame(e) {
  clearInterval(timerIntervalId);
  document.getElementById("seconds").innerText = "00";
  document.getElementById("minutes").innerText = "00";
  document.getElementById("click-count").innerText = "0";
  timeTrigger.addEventListener("click", startTimer);
  timeTrigger.innerHTML = "";
  level = 1;
  clicks =0;
  changeBackground();
  colorGenerator();
  cardsGenerator();
  e.preventDefault();
}

function gameLevelUp() {
  level++;
  clicks = 0;
  let result = document.getElementById("results");
  result.classList.remove("show");
  timeTrigger.innerHTML = "";
  changeBackground();
  colorGenerator();
  cardsGenerator();
  document.getElementById("seconds").innerText = "00";
  document.getElementById("minutes").innerText = "00";
  document.getElementById("click-count").innerText = "0";
  timeTrigger.addEventListener("click", startTimer);
}

function changeBackground() {
  let body = document.getElementsByTagName("body");
  body = [...body];
  body[0].setAttribute("class", `level-${level}`);
}
