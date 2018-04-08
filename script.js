let sessionLength = 0.1;
let breakLength = 0.1;
let timer = sessionLength * 60;
let breaker = breakLength * 60;

/*


let duration = sessionLength * 60;
let total = breaker + timer;
let share = breaker + timer;
//console.log(total);*/


/**
* Load initial page
*/
document.getElementById("sessionLength").innerHTML = sessionLength;
document.getElementById("breakLength").innerHTML = breakLength;

/**
* Increase- / Decrease the session- and break durations
*/
document.getElementById("sessionPlus").addEventListener("click", function() {
  sessionLength += 1;
  //timer = sessionLength * 60;
  //duration = sessionLength * 60;
  //total = breaker + timer;
  //share = breaker + timer;
  document.getElementById("sessionLength").innerHTML = sessionLength;
  //updateTimer();
  //updateBackground();
});

document.getElementById("sessionMinus").addEventListener("click", function() {
  if (sessionLength === 1) {return;}
  sessionLength -= 1;
  //timer = sessionLength * 60;
  //duration = sessionLength * 60;
  //total = breaker + timer;
  //share = breaker + timer;
  document.getElementById("sessionLength").innerHTML = sessionLength;
  //updateTimer();
  //updateBackground();
});

document.getElementById("breakPlus").addEventListener("click", function() {
  breakLength += 1;
  //breaker = breakLength * 60;
  //total = breaker + timer;
  //share = breaker + timer;
  document.getElementById("breakLength").innerHTML = breakLength;
});

document.getElementById("breakMinus").addEventListener("click", function() {
  if (breakLength === 1) {return;}
  breakLength -= 1;
  //breaker = breakLength * 60;
  //total = breaker + timer;
  //share = breaker + timer;
  document.getElementById("breakLength").innerHTML = breakLength;
});


/**
* Update Timer
*/
function updateTimer() {
  mins = Math.floor(timer/60);
  secs = timer % 60 > 9 ? timer % 60 : `0${timer % 60}`;
  //document.getElementById("canvas").style.height = `"${document.getElementById("canvas").clientHeight}"`;
  document.getElementById("canvas").innerHTML = `${mins}:${secs}`;
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
      document.getElementById("btn").innerHTML = "Pause";
      x = setInterval( function() {
              timer -= 1;
              //share -= 1;
              if (timer >= 0) {
                if (isBreak === 0) {document.getElementById("title").innerHTML = "Session";}
                updateTimer();
                //updateBackground();
              }
              else if (isBreak === 0) {
                isBreak = 1;
                timer = breaker;
                //duration = breakLength * 60;
                //share = breaker;
                document.getElementById("title").innerHTML = "Break!";
                //document.getElementById("btn").style.border = "5px solid #f44"
                //document.getElementById("battery").innerHTML = "&#xf243;";
                //document.getElementById("battery").style.color = "#ff3d00";
                updateTimer();
                //updateBackground();
              }
              else {
                isBreak = 0;
                timer = sessionLength * 60;
                //duration = sessionLength * 60;
                //share = breaker + timer;
                document.getElementById("title").innerHTML = "Session";
                //document.getElementById("btn").style.border = "5px solid #9C0";
                //document.getElementById("battery").innerHTML = "&#xf240;";
                //document.getElementById("battery").style.color = "#64dd17";
                updateTimer();
                //updateBackground();
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


/**
* Update Timer background

function updateBackground() {
  let filling = isBreak === 1 ? '#f44' : '#9C0';
  let rangeFilling = Math.round(Number((1-(timer/(duration))).toFixed(2)) * 100);
  let rangeGray = 100-rangeFilling;
  let state = 100-Math.round(Number((1-(share/(total))).toFixed(2)) * 100);
  document.getElementById("btn").style.background = "linear-gradient(#333, #333 "+rangeGray+"%, "+filling+" "+rangeGray+"%, "+filling+")";
  document.getElementById("load-state").innerHTML = state+'%';
  if (rangeGray < 66 && isBreak === 0) {
    document.getElementById("battery").innerHTML = "&#xf241;";
  }
  if (rangeGray < 33 && isBreak === 0) {
    document.getElementById("battery").innerHTML = "&#xf242;";
  }
  if (rangeGray === 0 && isBreak === 1) {
    document.getElementById("battery").innerHTML = "&#xf244;";
  }
}
*/
