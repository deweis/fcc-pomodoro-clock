let sessionLength = 1;
let breakLength = 1;

document.getElementById("sessionLength").innerHTML = sessionLength;
document.getElementById("breakLength").innerHTML = breakLength;

let timer = sessionLength * 60;

var x = setInterval( function() {
        if (timer > 0) {
          document.getElementById("timer").innerHTML = timer;
          timer -= 1;
        }
        else {
          document.getElementById("timer").innerHTML = "End";
          clearInterval(x);
        }
}, 1000);
