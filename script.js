let sessionLength = 25;
let breakLength = 5;
const sessionColor = '#4caf50'; /*#9C0;*/
const breakColor = '#ff5722'; /*#f44;*/
let timer = sessionLength * 60;
let breaker = breakLength * 60;
let duration = sessionLength * 60;
let isReset = 0;
const audio = new Audio('http://sampleswap.org/samples-ghost/%20MAY%202014%20LATEST%20ADDITIONS/PUBLIC%20DOMAIN%20MUSIC/626[kb]buster-brown-gonna-make-you-happy-1943.mp3.mp3');

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
  isReset = 1;
  timer = sessionLength * 60;
  breaker = breakLength * 60;
  duration = sessionLength * 60;
  isBreak = 0;
  running = 0;
  clearInterval(x);
  audio.pause();
  updateTimer();
  document.getElementById("title").innerHTML = "Session";
  document.getElementById("title").style.color = sessionColor;
  document.getElementById("canvas").style.color = sessionColor;
  document.getElementById("btn").innerHTML = "Start";
  document.getElementById("btn").style.background = "#fff";
  document.getElementById("btn").style.border = `2px solid ${sessionColor}`;
  document.getElementById("btn").style.color = "#E1E2E1";
  document.getElementById("sessionLength").innerHTML = sessionLength;
  document.getElementById("breakLength").innerHTML = breakLength;
  document.getElementById("settings").style.margin = "40px 0";
  document.getElementById("btn-reset").style.display = "none";
});

/**
* Increase- / Decrease the session- and break durations
*/
document.getElementById("sessionPlus").addEventListener("click", function() {
  if (isReset === 0 && !(document.getElementById("title").innerHTML === "fCC")) {return;} //"fCC";)) {return;}
  sessionLength += 1;
  timer = sessionLength * 60;
  duration = sessionLength * 60;
  document.getElementById("sessionLength").innerHTML = sessionLength;
  if (isReset === 1) {
    updateTimer();
    document.getElementById("btn-reset").style.display = "none";
  }
});

document.getElementById("sessionMinus").addEventListener("click", function() {
  if ((isReset === 0 || sessionLength === 1) && !(document.getElementById("title").innerHTML === "fCC") ) {return;}
  sessionLength -= 1;
  timer = sessionLength * 60;
  duration = sessionLength * 60;
  document.getElementById("sessionLength").innerHTML = sessionLength;
  if (isReset === 1) {
    updateTimer();
    document.getElementById("btn-reset").style.display = "none";
  }
});

document.getElementById("breakPlus").addEventListener("click", function() {
  if (isReset === 0 && !(document.getElementById("title").innerHTML === "fCC")) {return;}
  breakLength += 1;
  breaker = breakLength * 60;
  document.getElementById("breakLength").innerHTML = breakLength;
  if (isReset === 1) {
    updateTimer();
    document.getElementById("btn-reset").style.display = "none";
  }
});

document.getElementById("breakMinus").addEventListener("click", function() {
  if ((isReset === 0 || breakLength === 1) && !(document.getElementById("title").innerHTML === "fCC") ) {return;}
  breakLength -= 1;
  breaker = breakLength * 60;
  document.getElementById("breakLength").innerHTML = breakLength;
  if (isReset === 1) {
    updateTimer();
    document.getElementById("btn-reset").style.display = "none";
  }
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
  let filling = isBreak === 1 ? breakColor : sessionColor;
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
      isReset = 0;
      x = setInterval( function() {
              timer -= 1;
              if (timer >= 0) {
                if (isBreak === 0) {
                  displayReset();
                  document.getElementById("title").innerHTML = "Session";
                  document.getElementById("btn").innerHTML = "Pause";
                  document.getElementById("btn").style.border = `2px solid ${sessionColor}`;
                  document.getElementById("btn").style.color = "#E1E2E1";
                  document.getElementById("title").style.color = sessionColor;
                  document.getElementById("canvas").style.color = sessionColor;
                }
                if (isBreak === 1) {
                  audio.play();
                }
                updateTimer();
                updateBackground();
              }
              else if (isBreak === 0) {
                isBreak = 1;
                audio.load();
                audio.play();
                timer = breaker;
                duration = breakLength * 60;
                document.getElementById("title").innerHTML = "Break!";
                document.getElementById("btn").innerHTML = "Pause";
                document.getElementById("btn").style.border = `2px solid ${breakColor}`;
                document.getElementById("btn").style.color = "#E1E2E1";
                document.getElementById("title").style.color = breakColor;
                document.getElementById("canvas").style.color = breakColor;
                updateTimer();
                updateBackground();
              }
              else {
                audio.pause();
                isBreak = 0;
                timer = sessionLength * 60;
                duration = sessionLength * 60;
                document.getElementById("title").innerHTML = "Session";
                document.getElementById("btn").innerHTML = "Pause";
                document.getElementById("btn").style.border = `2px solid ${sessionColor}`;
                document.getElementById("btn").style.color = "#E1E2E1";
                document.getElementById("title").style.color = sessionColor;
                document.getElementById("canvas").style.color = sessionColor;
                updateTimer();
                updateBackground();
              }
      }, 1000);
  } else {
      running = 0;
      document.getElementById("btn").innerHTML = "Start";
      audio.pause();
      clearInterval(x);
  }
});
