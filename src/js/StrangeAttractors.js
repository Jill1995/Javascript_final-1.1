function drawAttractor(canvas, cxt) {
  let defaultColor = "#008099";
  let n = 10000;
  let scale = 4, // a scale factor
    yPos = 2; // y translation

  let Sw, Sh; // size canvas
  let pS = { value: 0 }; // the size of each particle position drawn
  let a = { value: 0 },
    b = { value: 0 },
    c = { value: 0 },
    d = { value: 0 };
  let xp, x, y, i, t;
  let pi = Math.PI;
  let requestFrame = null;

  let particleColor = document.getElementById("particleColor");
  let slider_pS = document.getElementById("slider_pS");
  let slider_a = document.getElementById("slider_a");
  let slider_b = document.getElementById("slider_b");
  let slider_c = document.getElementById("slider_c");
  let slider_d = document.getElementById("slider_d");

  particleColor.value = defaultColor;
  setValues(1.4, -2.3, 2.4, -2.1, 0.3, 4.5, 2);

  //on resize start over
  window.addEventListener(
    "resize",
    function () {
      start();
    },
    false
  );

  //on clicking redraw, start again
  document.getElementById("redraw").addEventListener(
    "click",
    function () {
      start();
    },
    false
  );

  const globalAlphaCheckbox = document.getElementById("globalAlpha");
  // globalAlphaCheckbox.addEventListener('click', function(){ start(); });
  globalAlphaCheckbox.checked = true;

  //set the values of ps,a,b,c,d based on input
  document.getElementById("ranges").addEventListener(
    "input",
    function (e) {
      let thisValue = parseFloat(e.target.value);
      if (e.target.id == "slider_pS") {
        if (thisValue >= 0.01 && thisValue <= 1) {
          pS.value = thisValue;
        }
      }
      if (e.target.id == "slider_a") {
        if (thisValue >= -pi && thisValue <= pi) {
          a.value = thisValue;
        }
      }
      if (e.target.id == "slider_b") {
        if (thisValue >= -pi && thisValue <= pi) {
          b.value = thisValue;
        }
      }
      if (e.target.id == "slider_c") {
        if (thisValue >= -pi && thisValue <= pi) {
          c.value = thisValue;
        }
      }
      if (e.target.id == "slider_d") {
        if (thisValue >= -pi && thisValue <= pi) {
          d.value = thisValue;
        }
      }

      e.target.parentElement.querySelector("span").innerHTML = " " + thisValue;
      start();
    },
    false
  );

  //set drawing to default examples
  document.getElementById("examples").addEventListener(
    "click",
    function (e) {
      if (e.target.id == "example1") {
        setValues(1.4, -2.3, 2.4, -2.1, 0.3, 4.5, 2);
      }

      if (e.target.id == "example2") {
        setValues(2.01, -2.53, 1.61, -0.33, 0.3, 3.8, 1.5);
      }
      if (e.target.id == "example3") {
        setValues(-2, -2, -1.2, 2, 0.3, 4.5, 2);
      }
      if (e.target.id == "example4") {
        setValues(-0.709, 1.638, 0.452, 1.74, 0.3, 2.4, 1.5);
      }
      if (e.target.id == "example5") {
        setValues(-0.827, -1.637, 1.659, -0.943, 0.3, 4, 1.6);
      }
    },
    false
  );

  function setValues(vala, valb, valc, vald, psize, div, yMove) {
    function set(el, variable, value) {
      variable.value = value;
      el.value = value;
      el.parentElement.querySelector("span").innerHTML = value;
    }
    set(slider_pS, pS, psize);
    set(slider_a, a, vala);
    set(slider_b, b, valb);
    set(slider_c, c, valc);
    set(slider_d, d, vald);
    scale = div;
    yPos = yMove;
    start();
  }

  function start() {
    if (requestFrame) {
      cancelAnimationFrame(requestFrame);
    }

    x = y = t = 0;
    cxt.clearRect(0, 0, canvas.width, canvas.height);

    Sw = canvas.width;
    Sh = canvas.height;
    requestFrame = requestAnimationFrame(draw);
  }

  function draw() {
    cxt.fillStyle = particleColor.value;
    if (globalAlphaCheckbox.checked) {
      cxt.globalAlpha = 0.2;
    } else {
      cxt.globalAlpha = 1;
    }
    //x=y=t/n;
    if (t < n) {
      for (i = 1e4; i--; ) {
        xp = x;
        x = Math.sin(a.value * y) - Math.cos(b.value * xp);
        y = Math.sin(c.value * xp) - Math.cos(d.value * y);
        cxt.fillRect(
          (x * Sw) / scale + Sw / 2,
          (y * Sh) / scale + Sh / yPos,
          pS.value,
          pS.value
        );
      }
      t++;
      //count.innerHTML = t;
      requestFrame = requestAnimationFrame(draw);
    }
  }
  //   });
}
