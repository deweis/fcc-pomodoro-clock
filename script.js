let sessionLength = 1;
let breakLength = 1;
let timer = sessionLength * 60;
let breaker = breakLength * 60;

/**
* Load initial page
*/
document.getElementById("sessionLength").innerHTML = sessionLength;
document.getElementById("breakLength").innerHTML = breakLength;

let mins = Math.floor(timer/60);
let secs = timer % 60 > 9 ? timer % 60 : `0${timer % 60}`;
document.getElementById("timer").innerHTML = `${mins}:${secs}`;

/**
* Update Timer
*/
function updateTimer() {
  mins = Math.floor(timer/60);
  secs = timer % 60 > 9 ? timer % 60 : `0${timer % 60}`;
  document.getElementById("timer").innerHTML = `${mins}:${secs}`;
}

/**
* Increase- / Decrease the session- and break durations
*/
document.getElementById("sessionPlus").addEventListener("click", function() {
  sessionLength += 1;
  timer = sessionLength * 60;
  document.getElementById("sessionLength").innerHTML = sessionLength;
  updateTimer();
});

document.getElementById("sessionMinus").addEventListener("click", function() {
    if (sessionLength === 1) {return;}
  sessionLength -= 1;
  timer = sessionLength * 60;
  document.getElementById("sessionLength").innerHTML = sessionLength;
  updateTimer();
});

document.getElementById("breakPlus").addEventListener("click", function() {
  breakLength += 1;
  breaker = breakLength * 60;
  document.getElementById("breakLength").innerHTML = breakLength;
});

document.getElementById("breakMinus").addEventListener("click", function() {
  if (breakLength === 1) {return;}
  breakLength -= 1;
  breaker = breakLength * 60;
  document.getElementById("breakLength").innerHTML = breakLength;
});

/**
* Start and Stop the timer by cklicking the session circle
*/
let running = 0;
let x;
let isBreak = 0;

document.getElementById("session").addEventListener("click", function() {
  if (running === 0) {
      running = 1;
      x = setInterval( function() {
              timer -= 1;
              if (timer >= 0) {
                updateTimer();
                // check for linear-gradient for changing the background color
              }
              else if (isBreak === 0) {
                isBreak = 1;
                timer = breaker;
                document.getElementById("sessionTitle").innerHTML = "Break!";
                updateTimer();
              }
              else {
                isBreak = 0;
                timer = sessionLength * 60;
                document.getElementById("sessionTitle").innerHTML = "Session";
                updateTimer();
              }
      }, 1000);
  } else {
      running = 0;
      clearInterval(x);
  }
});
