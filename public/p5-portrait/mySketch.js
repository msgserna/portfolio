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
  // Canvas del tamaño de la ventana
  cnv = createCanvas(windowWidth, windowHeight);

  // Clase para poder aplicar estilos desde CSS (mix-blend, etc.)
  cnv.elt.classList.add("p5-portrait-canvas");

  // Imagen base donde leemos el brillo
  img = createImage(width, height);
  nextImage();

  // "Pintor" que recorre la imagen
  paint = new Paint(createVector(width / 2, height / 2));

  // Fondo transparente (muy importante para que solo se vean los trazos)
  clear();

  // Modo color normal RGBA
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

// Si redimensionas la ventana, opcionalmente puedes reajustar el canvas
function windowResized() {
  // Si no quieres que cambie el tamaño, puedes comentar esto
  resizeCanvas(windowWidth, windowHeight);
  clear();
  if (img) {
    img = createImage(width, height);
    nextImage();
  }
  if (paint) {
    paint.reset();
  }
  isStop = false;
  count = 0;
  z = 0;
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

  // limpiamos el canvas para que empiece a "pintar" desde cero
  clear();
}

// Opcional: pausar/reanudar con "S"
function keyPressed() {
  if (key === "s" || key === "S") {
    isStop = !isStop;
  }
}
