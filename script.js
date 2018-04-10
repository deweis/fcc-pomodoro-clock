let sessionLength = 0.1;
let breakLength = 0.1;
let timer = sessionLength * 60;
let breaker = breakLength * 60;
let duration = sessionLength * 60;

/**
* Load initial page
*/
document.getElementById("sessionLength").innerHTML = sessionLength;
document.getElementById("breakLength").innerHTML = breakLength;

/**
* Display reset button
*/
function displayReset() {
  document.getElementById("btn-reset").style.display = "initial";
  document.getElementById("settings").style.marginBottom = "10px";
}
/**
* Press reset button
*/
document.getElementById("btn-reset").addEventListener("click", function() {
  sessionLength = 0.1;
  breakLength = 0.1;
  timer = sessionLength * 60;
  breaker = breakLength * 60;
  duration = sessionLength * 60;
  isBreak = 0;
  running = 0;
  clearInterval(x);
  document.getElementById("title").innerHTML = "fCC";
  document.getElementById("title").style.color = "#78909c";
  document.getElementById("canvas").innerHTML = "Pomodoro Clock";
  document.getElementById("canvas").style.color = "#78909c";
  document.getElementById("btn").innerHTML = "Start";
  document.getElementById("btn").style.background = "#fff";
  document.getElementById("btn").style.border = "2px solid #E1E2E1";
  document.getElementById("btn").style.color = "#78909c";
  document.getElementById("sessionLength").innerHTML = sessionLength;
  document.getElementById("breakLength").innerHTML = breakLength;
  document.getElementById("settings").style.margin = "40px 0";
  document.getElementById("btn-reset").style.display = "none";
});

/**
* Increase- / Decrease the session- and break durations
*/
document.getElementById("sessionPlus").addEventListener("click", function() {
  sessionLength += 1;
  timer = sessionLength * 60;
  duration = sessionLength * 60;
  document.getElementById("sessionLength").innerHTML = sessionLength;
  //updateTimer();
  //updateBackground();
  displayReset();
});

document.getElementById("sessionMinus").addEventListener("click", function() {
  if (sessionLength === 1) {return;}
  sessionLength -= 1;
  timer = sessionLength * 60;
  duration = sessionLength * 60;
  document.getElementById("sessionLength").innerHTML = sessionLength;
  //updateTimer();
  //updateBackground();
  displayReset();
});

document.getElementById("breakPlus").addEventListener("click", function() {
  breakLength += 1;
  breaker = breakLength * 60;
  document.getElementById("breakLength").innerHTML = breakLength;
  displayReset();
});

document.getElementById("breakMinus").addEventListener("click", function() {
  if (breakLength === 1) {return;}
  breakLength -= 1;
  breaker = breakLength * 60;
  document.getElementById("breakLength").innerHTML = breakLength;
  displayReset();
});

/**
* Update Timer
*/
function updateTimer() {
  mins = Math.floor(timer/60);
  secs = timer % 60 > 9 ? timer % 60 : `0${timer % 60}`;
  document.getElementById("canvas").innerHTML = `${mins}:${secs}`;
}
/**
* Update Timer background
*/
function updateBackground() {
  let filling = isBreak === 1 ? '#f44' : '#9C0';
  let rangeFilling = Math.round(Number((1-(timer/(duration))).toFixed(2)) * 100);
  let rangeGray = 100-rangeFilling;
  document.getElementById("btn").style.background = "linear-gradient(#fff, #fff "+rangeGray+"%, "+filling+" "+rangeGray+"%, "+filling+")";
}

/**
* Start and Stop the timer by cklicking the button
*/
let running = 0;
let x;
let isBreak = 0;

document.getElementById("btn").addEventListener("click", function() {
  if (running === 0) {
      running = 1;
      //document.getElementById("btn").innerHTML = "Pause";
      x = setInterval( function() {
              timer -= 1;
              if (timer >= 0) {
                if (isBreak === 0) {
                  displayReset();
                  document.getElementById("title").innerHTML = "Session";
                  document.getElementById("btn").innerHTML = "Pause";
                  document.getElementById("btn").style.border = "2px solid #9C0";
                  document.getElementById("btn").style.color = "#E1E2E1";
                  document.getElementById("title").style.color = "#9C0";
                  document.getElementById("canvas").style.color = "#9C0";
                }
                updateTimer();
                updateBackground();
              }
              else if (isBreak === 0) {
                isBreak = 1;
                timer = breaker;
                duration = breakLength * 60;
                document.getElementById("title").innerHTML = "Break!";
                document.getElementById("btn").innerHTML = "Pause";
                document.getElementById("btn").style.border = "2px solid #f44"
                document.getElementById("btn").style.color = "#E1E2E1";
                document.getElementById("title").style.color = "#f44";
                document.getElementById("canvas").style.color = "#f44";
                updateTimer();
                updateBackground();
              }
              else {
                isBreak = 0;
                timer = sessionLength * 60;
                duration = sessionLength * 60;
                document.getElementById("title").innerHTML = "Session";
                document.getElementById("btn").innerHTML = "Pause";
                document.getElementById("btn").style.border = "2px solid #9C0";
                document.getElementById("btn").style.color = "#E1E2E1";
                document.getElementById("title").style.color = "#9C0";
                document.getElementById("canvas").style.color = "#9C0";
                updateTimer();
                updateBackground();
              }
      }, 1000);
  } else {
      running = 0;
      document.getElementById("btn").innerHTML = "Start";
      clearInterval(x);
  }
});

/**
* Load initial page

let mins = Math.floor(timer/60);
let secs = timer % 60 > 9 ? timer % 60 : `0${timer % 60}`;
//document.getElementById("timer").innerHTML = `${mins}:${secs}`;
console.log(window.getComputedStyle(document.getElementById("canvas")).fontSize);
*/

/**
* Battery Colors:
*   - Green: https://material.io/color/#!/?view.left=0&view.right=0&primary.color=64DD17
*   - Red:   https://material.io/color/#!/?view.left=0&view.right=0&primary.color=FF3D00

document.getElementById("battery").innerHTML = "&#xf240;";
document.getElementById("battery").style.color = "#64dd17";
document.getElementById("load-state").innerHTML = '100%';
*/
