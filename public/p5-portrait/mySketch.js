var imgs = [];
var imgIndex = -1;
var img;
var paint;
var subStep = 800;
var z = 0;
var isStop = false;
var count = 0;

// 👇 nuevo: estado de tema
var isDarkTheme = false;

function preload() {
  imgs[0] = loadImage("steven.png");
}

// 👇 helpers para leer y aplicar el tema actual
function getCurrentTheme() {
  try {
    var stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch (e) {
    // localStorage puede no estar disponible, ignoramos
  }

  // fallback si el usuario usa "system"
  if (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

function applyTheme(theme) {
  isDarkTheme = theme === "dark";
}

// Escuchar cambios de tema en tiempo real (next-themes escribe en localStorage.theme)
if (typeof window !== "undefined") {
  window.addEventListener("storage", function (event) {
    if (event.key === "theme") {
      var newTheme = event.newValue;
      if (newTheme === "light" || newTheme === "dark" || newTheme === "system") {
        applyTheme(getCurrentTheme());
        // Si quisieras limpiar el dibujo al cambiar de tema:
        // clear();
      }
    }
  });
}

function setup() {
  // Canvas = tamaño del iframe (mitad izquierda de la pantalla)
  createCanvas(windowWidth, windowHeight);

  // Imagen base con el mismo tamaño que el canvas
  img = createImage(width, height);

  // Cargamos la primera imagen dentro de img (con contain)
  nextImage();

  // Creamos el pintor
  paint = new Paint(createVector(width / 2, height / 2));

  // 👇 fondo transparente
  clear();
  colorMode(RGB, 255, 255, 255, 255);

  // 👇 aplicar tema inicial
  applyTheme(getCurrentTheme());
}

function draw() {
  //console.log(frameRate());
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
  //background(255);
  //image(img, 0, 0, width, height);
}

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

function keyPressed() {
  console.log(key);
  if (key === "s" || key === "S") {
    isStop = !isStop;
  }
}

// 🔴 IMPORTANTE: quitamos interacción por click/touch
// function mouseClicked() {
//   nextImage();
// 	isStop = false;
// 	count = 0;
// }
// function touchStarted() {
//   nextImage();
// 	isStop = false;
// 	count = 0;
// }

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
  //img.resize(width, height);
  img.loadPixels();
  clear();
}
