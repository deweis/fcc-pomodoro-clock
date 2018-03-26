let sessionLength = 1;
let breakLength = 1;
let timer = sessionLength * 60;
let breaker = breakLength * 60;

document.getElementById("sessionLength").innerHTML = sessionLength;
document.getElementById("breakLength").innerHTML = breakLength;
document.getElementById("timer").innerHTML = sessionLength;

let running = 0;
let x;

document.getElementById("session").addEventListener("click", function() {
  if (running === 0) {
      running = 1;
      x = setInterval( function() {
              timer -= 1;
              if (timer > 0) {
                let mins = Math.floor(timer/60);
                let secs = timer % 60 > 9 ? timer % 60 : `0${timer % 60}`;
                document.getElementById("timer").innerHTML = `${mins}:${secs}`;
              }
              else {
                document.getElementById("timer").innerHTML = "End";
                clearInterval(x);
              }
      }, 1000);
  } else {
      running = 0;
      clearInterval(x);
  }
});
