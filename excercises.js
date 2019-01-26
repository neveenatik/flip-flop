"use strict";

//excercise 1

function showNumbers (limit) {
  if(!limit || typeof limit !== "number"){
    throw "Error: invalid entery expected number";
  }
  for( let i = 0; i <= limit; i ++) {
    console.log(i, ((i % 2 !== 0) ? "ODD" : "EVEN"));
  }
}

//excercise 2

function countTruthy(arr) {
  if(!Array.isArray(arr)){
    throw "Error: invalid entery expected a valid array";
  }
  let counter = 0;
  arr.forEach(value => value && counter++);
  return counter;
}

//excercise 3

function showProperties(obj) {
  if(typeof obj !== "object" || Array.isArray(obj) || obj === null) {
    throw "Error: invalid entery expected a valid object";
  }
  for (const key in obj) {
    if (typeof obj[key] === "string") {
       console.log(key, obj[key]);
    }
  }
}

//excercise 4

function sum(limit) {
  if(!limit || typeof limit !== "number"){
    throw "Error: invalid entery expected number";
  }
  let total = 0;
  for(let i = 0; i <= limit; i++) {
    if((i % 3 === 0) || (i % 5 === 0)) {
      total += i;
    }
  }
  return total;
}

//excercise 5

function calculateGrade(marks) {
  if(!marks || Array.isArray(marks)){
    throw "Error: invalid entery expected a valid array";
  }
  const total = marks.reduce((sum,mark) => sum + mark,0);
  const avr = total / marks.length;
  let grade = '';
  if (avr <= 59) {
    grade = "F";
  } else if (avr <= 69) {
    grade = "D";
  }
  else if (avr <= 79) {
    grade = "C";
  }
  else if (avr <= 89) {
    grade = "B";
  }
  else {
    grade = "A";
  }
  console.log(grade);
}

//excercise 6

function showPrimes(limit) {
  if(!limit || typeof limit !== "number"){
    throw "Error: invalid entery expected number";
  }
  // lable to break when number checked as not prime
  for (let num = 2; num <= limit; num++) { 
    /* num starts at first prime number, divisor starts at first divisor
    when num is 2 the second for loop doesn't run  and num is logged*/
    let divisors = [];
    for (let divisor = 2; divisor < num; divisor++) {
      if (num % divisor === 0) {
        divisors.push(divisor);
      }
    }
    if(divisors.length === 0) {
      console.log(num); // a prime, log it
    }
  }
}

//excercise 7

function showStars(rows) {
  if (!rows || typeof rows !== "number" || rows < 0) {
    throw "Error: invalid entry expected a positive number!";
  }
  for (let i = 1; i <= rows; i++) {
    console.log("*".repeat(i));
  }
}

//excercise 8

function pyramid(n) {
  if (!n || typeof n !== number || n < 0) {
    throw "Error: Sorry only making pyramid, please choose positive number!";
  }
  for(let i = 1; i <= n; i++) {
    const hashes = "#".repeat((i * 2) -1);
    const spaces = " ".repeat((n - i));
    console.log(spaces + hashes + spaces);
  }
}

// excercise 9 


function maxStockProfit(prices) {
  if(!prices || typeof prices !== "object") {
    return NaN;
  }
  if (prices.length < 2) {
    return -1;
  } 

  let maxProfit = 0;

  for (let i = 0; i <= prices.length -1; i++) {
    if (prices[j] > prices[i] && (prices[j] - prices[i]) > maxProfit) {
      maxProfit = prices[j] - prices[i];
    }
  }

  return maxProfit;
}
