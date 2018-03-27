let sessionLength = 1;
let breakLength = 1;
let timer = sessionLength * 60;
let breaker = breakLength * 60;

document.getElementById("sessionLength").innerHTML = sessionLength;
document.getElementById("breakLength").innerHTML = breakLength;
document.getElementById("timer").innerHTML = sessionLength;

let running = 0;
let x;
let isBreak = 0;

document.getElementById("session").addEventListener("click", function() {
  if (running === 0) {
      running = 1;
      x = setInterval( function() {
              timer -= 1;
              if (timer >= 0) {
                let mins = Math.floor(timer/60);
                let secs = timer % 60 > 9 ? timer % 60 : `0${timer % 60}`;
                document.getElementById("timer").innerHTML = `${mins}:${secs}`;
                // check for linear-gradient for changing the background color
              }
              else if (isBreak === 0) {
                isBreak = 1;
                timer = breaker;
                document.getElementById("sessionTitle").innerHTML = "Break!";
                let mins = Math.floor(timer/60);
                let secs = timer % 60 > 9 ? timer % 60 : `0${timer % 60}`;
                document.getElementById("timer").innerHTML = `${mins}:${secs}`;
              }
              else {
                isBreak = 0;
                timer = sessionLength * 60;
                document.getElementById("sessionTitle").innerHTML = "Session";
                let mins = Math.floor(timer/60);
                let secs = timer % 60 > 9 ? timer % 60 : `0${timer % 60}`;
                document.getElementById("timer").innerHTML = `${mins}:${secs}`;
              }
      }, 1000);
  } else {
      running = 0;
      clearInterval(x);
  }
});
