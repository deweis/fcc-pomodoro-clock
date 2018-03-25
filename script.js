let sessionLength = 1;
let breakLength = 1;
let time = sessionLength * 60;

document.getElementById("sessionLength").innerHTML = sessionLength;
document.getElementById("breakLength").innerHTML = breakLength;
document.getElementById("timer").innerHTML = time;

let running = 0;
let x;

document.getElementById("session").addEventListener("click", function() {
  if (running === 0) {
      running = 1;
      x = setInterval( function() {
              if (time > 0) {
                document.getElementById("timer").innerHTML = time;
                time -= 1;
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
