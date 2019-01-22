"use strict";

let timerIntervalId;
let colors = [ "#f6b7bd", "#d3deba", "#70d0d0", "#c3a196", "#6a6cd0"];
let cards = document.getElementsByClassName("card");
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", startTimer);
}
  
document.getElementById("reset").addEventListener("click", resetTimer);
function timer() {
  let seconds = document.getElementById("seconds");
  let minutes = document.getElementById("minutes");
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
  let card = e.target;
  card.setAttribute("style", "background-color: " + colors[Math.random() * 5 | 0]);
  timerIntervalId = setInterval(timer , 1000);
  for (let i = 0; i < cards.length; i++) {
    cards[i].removeEventListener("click", startTimer);
  }
}

function resetTimer() {
  clearInterval(timerIntervalId);
  document.getElementById("seconds").innerText = "00";
  document.getElementById("minutes").innerText = "00";
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", startTimer);
    cards[i].setAttribute("style", "background-color: #b3afaf;")
  }
}
