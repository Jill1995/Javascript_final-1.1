//declaring canvas and context as global variables
let myCanvas;
let ctx;

//create cancel button to revert to front page
const cancel = document.createElement("button");
const textOnButton = document.createTextNode("X");
cancel.appendChild(textOnButton);
cancel.style.width = "30px";
document.getElementById("canvas").appendChild(cancel);

cancel.addEventListener("click", revert);

//reverting to front page when cancel is clicked
function revert() {
  let ele = document.querySelector("#titles");
  ele.style.display = "block";

  let element = document.getElementById("changingOptions");
  element.innerHTML = "";

  let c = document.getElementById("cv");
  c.parentNode.removeChild(c);

  let attr = document.getElementById("controls");
  attr.style.display = "none";
}

//drawing the different applications
const random = document.getElementById("random");
const graphs = document.getElementById("graphs");
const attractor = document.getElementById("attractor");

document.addEventListener("click", function (event) {
  switch (event.target) {
    case random:
      initiate();
      drawRandom(myCanvas, ctx);
      break;

    case graphs:
      initiate();
      drawGraphs(myCanvas, ctx);
      break;

    case attractor:
      initiate();
      let ctrl = document.getElementById("controls");
      ctrl.style.display = "block";
      drawAttractor(myCanvas, ctx);
      break;
  }
});

//prepare canvas to load function
function initiate() {
  myCanvas = document.createElement("canvas");
  myCanvas.setAttribute("id", "cv");
  const element = document.getElementById("canvas");
  element.appendChild(myCanvas);

  myCanvas.width = window.innerWidth - 30;
  myCanvas.height = window.innerHeight - 20;
  ctx = myCanvas.getContext("2d");

  let ele = document.querySelector("#titles");
  ele.style.display = "none";
  //myCanvas.style.display = "block";
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
}
