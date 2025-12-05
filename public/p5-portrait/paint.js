// paint.js

function Paint(p) {
  var ppos = p.copy();      // posición anterior
  var pos = p.copy();       // posición actual
  var vel = createVector(0, 0);
  var force = createVector(0, 0);

  var maxSpeed = 3.0;
  var perception = 5;
  var bound = 60;
  var boundForceFactor = 0.16;
  var noiseScale = 100.0;
  var noiseInfluence = 1 / 20.0;

  // Parámetros de dibujo (los de tu sketch original)
  var dropRate = 0.004;   // probabilidad de “gota” más gruesa
  var drawWeight = 1;     // grosor base

  // Opacidades separadas para light/dark
  var drawAlphaLight = 50;
  var dropAlphaLight = 150;

  var drawAlphaDark = 85;   // un poco más fuerte en dark para que destaque
  var dropAlphaDark = 210;

  var count = 0;
  var maxCount = 100;     // longitud de cada recorrido del pintor

  // -------- detección de tema --------
  function isDarkTheme() {
    if (typeof document === "undefined") return false;

    var html = document.documentElement;
    var body = document.body || null;

    // cubrimos varias formas típicas de marcar el tema
    var hasDarkClass =
      html.classList.contains("dark") ||
      (body && body.classList.contains("dark"));

    var hasDarkDataTheme =
      html.getAttribute("data-theme") === "dark" ||
      (body && body.getAttribute("data-theme") === "dark");

    return hasDarkClass || hasDarkDataTheme;
  }

  // -------- lógica de movimiento --------

  this.update = function () {
    ppos = pos.copy();
    force.mult(0);

    // Fuerza de la imagen (busca zonas más oscuras)
    var target = createVector(0, 0);
    var nCount = 0;
    for (var i = -floor(perception / 2); i < perception / 2; i++) {
      for (var j = -floor(perception / 2); j < perception / 2; j++) {
        if (i === 0 && j === 0) continue;
        var x = floor(pos.x + i);
        var y = floor(pos.y + j);
        if (x <= img.width - 1 && x >= 0 && y < img.height - 1 && y >= 0) {
          var c = fget(x, y);
          var b = brightness(c);
          b = 1 - b / 100.0;
          var pv = createVector(i, j);
          target.add(pv.normalize().copy().mult(b).div(pv.mag()));
          nCount++;
        }
      }
    }
    if (nCount !== 0) {
      force.add(target.div(nCount));
    }

    // Fuerza de ruido
    var n = noise(pos.x / noiseScale, pos.y / noiseScale, z);
    n = map(n, 0, 1, 0, 5 * TWO_PI);
    var pNoise = p5.Vector.fromAngle(n);
    if (force.mag() < 0.01) force.add(pNoise.mult(noiseInfluence * 5));
    else force.add(pNoise.mult(noiseInfluence));

    // Fuerza de los bordes
    var boundForce = createVector(0, 0);
    if (pos.x < bound) {
      boundForce.x = (bound - pos.x) / bound;
    }
    if (pos.x > width - bound) {
      boundForce.x = (pos.x - width) / bound;
    }
    if (pos.y < bound) {
      boundForce.y = (bound - pos.y) / bound;
    }
    if (pos.y > height - bound) {
      boundForce.y = (pos.y - height) / bound;
    }
    force.add(boundForce.mult(boundForceFactor));

    vel.add(force);
    vel.mult(0.9999);
    if (vel.mag() > maxSpeed) {
      vel.mult(maxSpeed / vel.mag());
    }

    pos.add(vel);
    // Si se sale del canvas, reiniciamos
    if (pos.x > width || pos.x < 0 || pos.y > height || pos.y < 0) {
      this.reset();
    }
  };

  this.reset = function () {
    img.updatePixels();
    img.loadPixels();

    count = 0;
    var hasFound = false;
    // Buscar un punto de inicio en una zona relativamente oscura
    while (!hasFound) {
      pos.x = random(1) * width;
      pos.y = random(1) * height;
      var c = fget(floor(pos.x), floor(pos.y));
      var b = brightness(c);
      if (b < 35) hasFound = true;
    }

    ppos = pos.copy();
    vel.mult(0);
  };

  // -------- dibujo de los trazos --------

  this.show = function () {
    count++;
    if (count > maxCount) this.reset();

    var dark = isDarkTheme();

    // color base + “gotas” en función del tema
    var drawAlpha = dark ? drawAlphaDark : drawAlphaLight;
    var dropAlpha = dark ? dropAlphaDark : dropAlphaLight;

    var baseColor = dark
      ? color(255, 255, 255, drawAlpha) // blanco en dark
      : color(0, 0, 0, drawAlpha);      // negro en light

    var boldColor = dark
      ? color(255, 255, 255, dropAlpha)
      : color(0, 0, 0, dropAlpha);

    stroke(baseColor);
    strokeWeight(drawWeight);

    // “gota” más gruesa de vez en cuando
    if (force.mag() > 0.1 && random(1) < dropRate) {
      stroke(boldColor);
      var boldWeight = drawWeight + random(5);
      strokeWeight(boldWeight);
    }

    line(ppos.x, ppos.y, pos.x, pos.y);

    this.fadeLineFromImg(ppos.x, ppos.y, pos.x, pos.y);
  };

  // Suaviza la zona de la imagen por donde pasa el trazo
  this.fadeLineFromImg = function (x1, y1, x2, y2) {
    var xOffset = floor(abs(x1 - x2));
    var yOffset = floor(abs(y1 - y2));
    var step = xOffset < yOffset ? yOffset : xOffset;
    for (var i = 0; i < step; i++) {
      var x = floor(x1 + ((x2 - x1) * i) / step);
      var y = floor(y1 + ((y2 - y1) * i) / step);
      var originColor = fget(x, y);

      var r = red(originColor);
      var g = green(originColor);
      var b = blue(originColor);

      originColor.setRed(r + 50 > 255 ? 255 : r + 50);
      originColor.setGreen(g + 50 > 255 ? 255 : g + 50);
      originColor.setBlue(b + 50 > 255 ? 255 : b + 50);

      fset(x, y, originColor);
    }
  };
}
