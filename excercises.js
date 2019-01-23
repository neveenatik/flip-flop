"use strict";

//excercise 1

function showNumbers (limit) {
  for( let i = 0; i <= limit; i ++) {
    console.log(i, ((i % 2 !== 0) ? "ODD" : "EVEN"));
  }
}

//excercise 2

function countTruthy(arr) {
  let counter = 0;
  arr.forEach(value => value && counter++);
  return counter;
}

//excercise 3

function showProperties(obj) {
  for (const key in obj) {
    if (typeof obj[key] === "string") {
       console.log(key, obj[key]);
    }
  }
}

//excercise 4

function sum(limit) {
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
  // lable to break when number checked as not prime
  nextPrime: 
  for (let num = 2; num <= limit; num++) { 
    /* num starts at 2 because there is no prime number smaller than 2
    divisor starts at 2 because all numbers are divisible by 1
    when num is 2 the second for loop doesn't run and the num is logged becuase 2 is the first prime number*/
    for (let divisor = 2; divisor < num; divisor++) {
      // when divisor is smaller than num look for a divisor..
      if (num % divisor === 0) {
        /* if a divisible is found in this range 2 to < num
        then it is not a prime, go to next num to save time */
        continue nextPrime; 
      }
    }
    console.log(num); // a prime, log it
  }
}

//excercise 7

function showStars(rows) {
  if (rows < 0) {
    return "Error: There are no negative rows!";
  }
  for (let i = 1; i < rows; i++) {
    console.log("*".repeat(i));
  }
}

//excercise 8

function pyramid(n) {
  if (n < 0) {
    return "Error: Sorry only making pyramid, please choose positive number!";
  }
  for(let i = 1; i <= n; i++) {
    const hashes = "#".repeat((i * 2) -1);
    const spaces = " ".repeat((n - i));
    console.log(spaces + hashes + spaces);
  }
}

// excercise 9 


function maxStockProfit(prices) {
  if(!prices) {
    return NaN;
  }
  if (prices.length < 2) {
    return -1;
  } 

  let maxProfit = 0;

  for(let i = 0; i <= prices.length -1; i++) {
    for(let j =  i + 1 ; j <= prices.length - 1; j++)
    if (prices[j] > prices[i] && (prices[j] - prices[i]) > maxProfit) {
      maxProfit = prices[j] - prices[i];
    }
  }

  return maxProfit;
}
console.log(maxStockProfit([11]))