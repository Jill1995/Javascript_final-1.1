function drawRandom(cvs, context) {
  context.font = "15px Georgia";
  context.fillStyle = "black";
  context.fillText("Press Space to start creating", 10, 50);
  context.fillText("Press BackSpace to regenerate", 10, 70);
  let maxDepth = 0,
    numShapes = 6,
    offset = Math.random() * Math.PI * 2,
    angles = [
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
    ],
    size = 0,
    dist = 0,
    scaleFactor = 0.6;

  init();

  function init() {
    size = cvs.height / 10;
    dist = size * 1.5;

    draw();

    document.body.addEventListener("keyup", function (event) {
      console.log(event.keyCode);

      switch (event.keyCode) {
        case 32: //spacebar
          maxDepth += 1;
          draw();
          break;

        case 8: //backspace
          context.clearRect(0, 0, cvs.width, cvs.height);
          context.font = "15px Georgia";
          context.fillStyle = "black";
          context.fillText("Press Space to start creating", 10, 50);
          context.fillText("Press BackSpace to regenerate", 10, 70);
          maxDepth = 0;
          (angles = [
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
          ]),
            draw();

          break;

        default:
          break;
      }
    });
  }

  function draw() {
    context.save();
    context.translate(cvs.width / 2, cvs.height / 2);
    drawShape();
    iterate(maxDepth);
    context.restore();
  }

  function iterate(depth) {
    for (let i = 0; i < numShapes; i++) {
      context.save();
      context.rotate(angles[i]);
      context.translate(dist, 0);
      context.scale(scaleFactor, scaleFactor);
      drawShape();

      if (depth > 0) {
        iterate(depth - 1);
      }
      context.restore();
    }
  }

  function drawShape() {
    context.fillStyle = "rgba(0,23,45,0.05)";
    context.beginPath();
    context.arc(0, 0, size, 0, Math.PI * 2, true);
    context.fill();
  }
}
