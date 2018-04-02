let sessionLength = 0.3;
let breakLength = 0.3;
let timer = sessionLength * 60;
let breaker = breakLength * 60;
let duration = sessionLength * 60;

/**
* Load initial page
*/
document.getElementById("sessionLength").innerHTML = sessionLength;
document.getElementById("breakLength").innerHTML = breakLength;

let mins = Math.floor(timer/60);
let secs = timer % 60 > 9 ? timer % 60 : `0${timer % 60}`;
document.getElementById("timer").innerHTML = `${mins}:${secs}`;

/**
* Battery Colors:
*   - Green: https://material.io/color/#!/?view.left=0&view.right=0&primary.color=64DD17
*   - Red:   https://material.io/color/#!/?view.left=0&view.right=0&primary.color=FF3D00
*/
document.getElementById("battery").innerHTML = "&#xf240;";
document.getElementById("battery").style.color = "#64dd17";
document.getElementById("load-state").innerHTML = '100%';

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
  duration = sessionLength * 60;
  document.getElementById("sessionLength").innerHTML = sessionLength;
  updateTimer();
  updateBackground();
});

document.getElementById("sessionMinus").addEventListener("click", function() {
    if (sessionLength === 1) {return;}
  sessionLength -= 1;
  timer = sessionLength * 60;
  duration = sessionLength * 60;
  document.getElementById("sessionLength").innerHTML = sessionLength;
  updateTimer();
  updateBackground();
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
* Update Timer background
*/
function updateBackground() {
  let filling = isBreak === 1 ? '#f44' : '#9C0';
  let rangeFilling = Math.round(Number((1-(timer/(duration))).toFixed(2)) * 100);
  let rangeGray = 100-rangeFilling;
  console.log(rangeGray+'%');
  document.getElementById("session").style.background = "linear-gradient(#333, #333 "+rangeGray+"%, "+filling+" "+rangeGray+"%, "+filling+")";
  document.getElementById("load-state").innerHTML = rangeGray+'%';
  if (rangeGray < 66 && isBreak === 0) {
    document.getElementById("battery").innerHTML = "&#xf241;";
  }
  if (rangeGray < 33 && isBreak === 0) {
    document.getElementById("battery").innerHTML = "&#xf242;";
  }
  /*if (rangeGray > 0 && isBreak === 1) {
    document.getElementById("battery").innerHTML = "&#xf243;";
    document.getElementById("battery").style.color = "#ff3d00";
  }*/
  if (rangeGray === 0 && isBreak === 1) {
    document.getElementById("battery").innerHTML = "&#xf244;";
  }
}

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
                updateBackground();
              }
              else if (isBreak === 0) {
                isBreak = 1;
                timer = breaker;
                duration = breakLength * 60
                document.getElementById("sessionTitle").innerHTML = "Break!";
                document.getElementById("session").style.border = "2px solid #f44"
                document.getElementById("battery").innerHTML = "&#xf243;";
                document.getElementById("battery").style.color = "#ff3d00";
                updateTimer();
                updateBackground();
              }
              else {
                isBreak = 0;
                timer = sessionLength * 60;
                duration = sessionLength * 60
                document.getElementById("sessionTitle").innerHTML = "Session";
                document.getElementById("session").style.border = "2px solid #9C0";
                document.getElementById("battery").innerHTML = "&#xf240;";
                document.getElementById("battery").style.color = "#64dd17";
                updateTimer();
                updateBackground();
              }
      }, 1000);
  } else {
      running = 0;
      clearInterval(x);
  }
});
