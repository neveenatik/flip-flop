"use strict";


let timerIntervalId;
let level = 6;
let clicks = 0;
const colors = [];
const backgroundColor = "#b3afaf";
let timeTrigger = document.getElementById("timer");
let seconds = document.getElementById("seconds");
let minutes = document.getElementById("minutes");
const game = {};

timeTrigger.addEventListener("click", startTimer);
document.getElementById("reset").addEventListener("click", resetGame);
colorGenerator();
cardsGenerator();

function colorGenerator() {
  let color;
  while (colors.length < level/2) {
    do {
        color = "#" + ("000000" + (Math.floor((Math.random()*1000000)+1)).toString(16)).slice(-6);
    } while (colors.indexOf(color) >= 0 && color !== backgroundColor && color !== "undefined") {
    colors.push(color);
    }
  }
};
function cardsGenerator() {
  let pickedColors = {};
  let pickedColor = backgroundColor;
  for(let i = 0; i < level; i++) {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    do {
      pickedColor = colors[Math.floor(Math.random()*colors.length)];
    } while(pickedColors[`"${pickedColor}"`] === 2);
    pickedColors[`"${pickedColor}"`] = pickedColors[`"${pickedColor}"`] === 1 ? 2 : 1;
    card.setAttribute("data-color", pickedColor);
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

function startTimer(e) {
timerIntervalId = setInterval(timer , 1000);
timeTrigger.removeEventListener("click", startTimer);
let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", changeColor);
  }

}

function resetGame() {
  clearInterval(timerIntervalId);
  document.getElementById("seconds").innerText = "00";
  document.getElementById("minutes").innerText = "00";
  timeTrigger.addEventListener("click", startTimer);
  timeTrigger.innerHTML = "";
  level = 6;
  colorGenerator();
  cardsGenerator();
}

function changeColor(e) {
  clicks++;
  let card = e.target;
  let flipped = document.getElementsByClassName("flipped");
  card.setAttribute("style", "background-color: " + card.dataset.color);
  card.setAttribute("class", "flipped");
  flipped = [...flipped];
  if (flipped.length === 2 && flipped[0].dataset.color === flipped[1].dataset.color) {
    flipped.forEach(card => {
      card.setAttribute("class", "match");
    }); 
    let matched = document.getElementsByClassName("match");
    matched = [...matched];
    console.log(matched);
    if (matched.length === level) {
      clearInterval(timerIntervalId);
      let finalTime = minutes.innerHTML + " : " + seconds.innerHTML; 
      console.log(finalTime);
      document.getElementById("clicks").innerText = clicks;
      document.getElementById("time").innerText = finalTime;
      let result = document.getElementById("results");
      result.classList.add("show");
      let nextLevel = document.getElementById("next");
      nextLevel.addEventListener("click", gameLevelUp)  
    }
  } else if (flipped.length !== 1){
    setTimeout( function () {
      flipped.forEach(card => {
        card.setAttribute("style", "background-color: #b3afaf;");
        card.setAttribute("class", "card");
        });
      flipped = [];
    }, 1000);
  }
}

function gameLevelUp() {
  // let body = document.getElementsByTagName("body");
  // let currentClass = body.classList.item(0);
  // body.classList.remove(currentClass);
  // body.classList.add(currentClass.slice(0,-1) + (Number(currentClass.slice(-1)) + 1));
  level = level * 2;
  let result = document.getElementById("results");
  result.classList.remove("show");
  document.getElementById("seconds").innerText = "00";
  document.getElementById("minutes").innerText = "00";
  timeTrigger.addEventListener("click", startTimer);
  timeTrigger.innerHTML = "";
  colorGenerator();
  cardsGenerator();
}