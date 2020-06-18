function drawGraphs(canvas, c) {
  //create the equations list
  const list = document.createElement("select");
  list.setAttribute("id", "variation");
  document.getElementById("changingOptions").appendChild(list);

  const equations = [
    "y' = cos(xy)",
    "y' = x + y",
    "y' = sin(x)cos(y)",
    "y' = cos(x) * y^2",
    "y' = log(x)log(y)",
    "y' = tan(x)cos(y)",
    "y' = 4y(1-y)",
    "Pendulum",
    "Orbit",
    "x'' = -g*x - sin(x) + F",
  ];

  for (let i = 0; i < equations.length; i++) {
    let option = document.createElement("option");
    option.text = equations[i];
    option.value = i;
    list.add(option);
  }

  //define create button
  const create = document.createElement("button");
  create.innerHTML = "create";
  create.setAttribute("id", "button1");

  document.getElementById("changingOptions").appendChild(create);

  //drawing the graphs
  let variation = 0;
  let height = window.innerHeight;
  let width = window.innerWidth;
  let blobArray = [];

  //to get mouse position
  let mouse = { x: 0, y: 0 };

  canvas.mouseIsOver = false;
  canvas.onmouseover = function () {
    this.mouseIsOver = true;
  };
  canvas.onmouseout = function () {
    this.mouseIsOver = false;
  };

  document.getElementById("button1").addEventListener("click", setupNew);

  //clear canvas when create pressed and set variation
  function setupNew() {
    let dropdown = document.getElementById("variation");
    variation = parseInt(dropdown.options[dropdown.selectedIndex].value);
    console.log(variation);
    c.fillStyle = "white";
    c.fillRect(0, 0, width, height);
    c.fillStyle = "grey";
    c.fillRect(0, height / 2 - 1, width, 0.3);
    c.fillRect(width / 2 - 1, 0, 0.5, height);
    // blobArray = [];
  }

  //storing mouse positions to draw blobs
  document.addEventListener(
    "mousemove",
    function (e) {
      mouse.x = e.clientX || e.pageX;
      mouse.y = e.clientY || e.pageY;
    },
    false
  );

  let mouseDown = 0;
  document.body.onmousedown = function () {
    mouseDown = true;
  };
  document.body.onmouseup = function () {
    mouseDown = false;
  };

  //draw axis
  c.fillStyle = "white";
  c.fillRect(0, 0, width, height);
  c.fillStyle = "grey";
  c.fillRect(0, height / 2 - 1, width, 0.3);
  c.fillRect(width / 2 - 1, 0, 0.5, height);

  //scale factor
  let divWidth = width / 20;
  let divHeight = height / 20;

  //create a looping which calls draw after millisecons
  setInterval(draw, 10);

  //drawing blobs
  function draw() {
    if (canvas.mouseIsOver) {
      if (mouseDown) {
        let color = getColor();
        let blob = {
          x: mouse.x,
          y: mouse.y,
          xSpeed: 0,
          ySpeed: 0,
          size: 5,
          lastPos: [],
          color: color,
          direction: 1,
          count: 1,
        };

        blobArray.push(blob);

        //change direction of blob to expand line in both directions
        blob = {
          x: mouse.x,
          y: mouse.y,
          xSpeed: 0,
          ySpeed: 0,
          size: 5,
          lastPos: [],
          color: color,
          direction: -1,
          count: 1,
        };
        blobArray.push(blob);
      }

      let length = blobArray.length;

      for (let i = 0; i < length; i++) {
        let blob = blobArray[i];
        //spacing between each dot
        // if (blob.count % 4 == 0) {
        drawCircle(blob.x, blob.y, blob.size, blob.color);
        //   blob.count = 0;
        // }
        // blob.count++;

        //drawing dots at new position
        blob.x += blob.xSpeed;
        blob.y += blob.ySpeed;

        //changing x and y speed to plot the graph
        let x = (blob.x - width / 2) / divWidth;
        let y = -(blob.y - height / 2) / divHeight;

        //calculting y coordinates by differentiating the equation 3 times
        let k1y = getSlopeY(x, y);
        let k2y = getSlopeY(
          x + (blob.direction * 1) / width,
          y + ((blob.direction * 1) / height) * k1y
        );
        let k3y = getSlopeY(
          x + (blob.direction * 2) / width,
          y -
            ((blob.direction * 2) / height) * k1y +
            ((blob.direction * 4) / height) * k2y
        );
        blob.ySpeed =
          blob.direction * 2 * ((1 / 6) * k1y + (4 / 6) * k2y + (1 / 6) * k3y);

        //calculation x coordinates
        let k1x = getSlopeX(x, y);
        let k2x = getSlopeX(
          x + ((blob.direction * 1) / width) * k1x,
          y + (blob.direction * 1) / height
        );
        let k3x = getSlopeX(
          x -
            ((blob.direction * 2) / width) * k1x +
            ((blob.direction * 4) / width) * k2x,
          y + (blob.direction * 2) / height
        );
        blob.xSpeed =
          blob.direction * 2 * ((1 / 6) * k1x + (4 / 6) * k2x + (1 / 6) * k3x);

        if (
          blob.x < -500 ||
          blob.y < -500 ||
          blob.x > width + 500 ||
          blob.y > height + 500
        ) {
          blobArray.splice(i, 1);
          i--;
        }
      }
    }
  }

  function getSlopeX(x, y) {
    switch (variation) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return 1;
      case 7:
      case 8:
        return -y;
      case 9:
        return -1.5 * y;
      case 10:
        return -x * (1 - y);
    }
  }

  function getSlopeY(x, y) {
    switch (variation) {
      case 0:
        return Math.cos(x * y);
      case 1:
        return x + y;
      case 2:
        return Math.sin(x) * Math.cos(x);
      case 3:
        return Math.cos(x) * y * y;
      case 4:
        return Math.log(Math.abs(x)) * Math.log(Math.abs(y));
      case 5:
        return Math.tan(x) * Math.cos(y);
      case 6:
        return 4 * y * (1 - y);
      case 7:
        return -Math.sin(x);
      case 8:
        return -2 * x;
      case 9:
        return -y - Math.sin(1.5 * x) + 0.7;
      case 10:
        return -y * (1 - x);
    }
  }

  function getColor() {
    switch (Math.floor(Math.random() * 9) + 1) {
      case 1:
        return "blue";
      case 2:
        return "pink";
      case 3:
        return "magenta";
      case 4:
        return "indigo";
      case 5:
        return "purple";
      case 6:
        return "violet";
      case 7:
        return "cyan";
      case 8:
        return "magenta";
      case 9:
        return "indigo";
    }
  }

  function drawCircle(centerX, centerY, diameter, color) {
    c.beginPath();
    c.arc(centerX, centerY, diameter / 2, 0, 2 * Math.PI, false);
    c.fillStyle = color;
    c.fill();
    c.lineWidth = 0;
  }
}
