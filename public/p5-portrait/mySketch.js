// mySketch.js

var imgs = [];
var imgIndex = -1;
var img;
var paint;
var subStep = 200; // pasos por frame -> controla la velocidad/densidad
var z = 0;
var isStop = false;
var count = 0;

let cnv;

function preload() {
  // Asegúrate de que "steven.png" está en la misma carpeta que tu sketch
  imgs[0] = loadImage("steven.png");
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);

  // 👇 marcar este canvas con una clase propia
  cnv.elt.classList.add("p5-portrait-canvas");

  img = createImage(width, height);
  nextImage();

  paint = new Paint(createVector(width / 2, height / 2));

  // fondo transparente (no usar background(0) a secas)
  clear();
  colorMode(RGB, 255, 255, 255, 255);
}

function draw() {
  if (!isStop) {
    for (var i = 0; i < subStep; i++) {
      paint.update();
      paint.show();
      z += 0.01;
    }
  }

  count++;
  if (count > width) {
    isStop = true;
  }
}

// -------- UTILIDADES DE IMAGEN --------

function fget(i, j) {
  var index = j * img.width + i;
  index *= 4;
  return color(
    img.pixels[index],
    img.pixels[index + 1],
    img.pixels[index + 2],
    img.pixels[index + 3]
  );
}

function fset(i, j, c) {
  var index = j * img.width + i;
  index *= 4;
  img.pixels[index] = red(c);
  img.pixels[index + 1] = green(c);
  img.pixels[index + 2] = blue(c);
  img.pixels[index + 3] = alpha(c);
}

function nextImage() {
  if (!img) return;
  imgIndex = ++imgIndex % imgs.length;
  var targetImg = imgs[imgIndex];

  img.copy(
    targetImg,
    0,
    0,
    targetImg.width,
    targetImg.height,
    0,
    0,
    img.width,
    img.height
  );
  img.loadPixels();
  clear();
}

// Opcional: pausar/reanudar con "S" si quieres
function keyPressed() {
  if (key === "s" || key === "S") {
    isStop = !isStop;
  }
}
