var imgs = [];
var imgIndex = -1;
var img;
var paints = [];
var numPaints = 100;
var subStep = 8;
var z = 0;
var isStop = false;
var count = 0;

// 👇 nuevo: estado de tema
var isDarkTheme = false;

function preload() {
  imgs[0] = loadImage("mario2.png");
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

// Escuchar mensajes desde la página padre (tema, pausa, reanudación)
if (typeof window !== "undefined") {
  window.addEventListener("message", function (event) {
    if (!event.data) return;

    if (event.data.type === "theme-change") {
      applyTheme(event.data.theme);
      var canvas = document.querySelector("canvas");
      if (canvas) {
        canvas.style.filter = isDarkTheme ? "invert(1)" : "none";
      }
      if (typeof loop === "function") loop();
    }

    if (event.data.type === "pause" && typeof noLoop === "function") {
      noLoop();
    }

    if (event.data.type === "resume" && typeof loop === "function") {
      if (!isStop) loop();
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

  // Creamos los pinceles y los dispersamos desde el inicio
  for (var k = 0; k < numPaints; k++) {
    var p = new Paint(createVector(width / 2, height / 2));
    p.reset();
    paints.push(p);
  }

  // 👇 fondo transparente
  clear();
  colorMode(RGB, 255, 255, 255, 255);

  // 👇 aplicar tema inicial
  applyTheme(getCurrentTheme());
  var c = document.querySelector("canvas");
  if (c && isDarkTheme) {
    c.style.filter = "invert(1)";
  }
}

function draw() {
  if (!isStop) {
    for (var i = 0; i < subStep; i++) {
      for (var k = 0; k < paints.length; k++) {
        paints[k].update();
        paints[k].show();
      }
      z += 0.01;
    }
  }
  count++;
  // Ajustamos el límite para compensar los menos pasos por frame
  if (count > width * 3) {
    isStop = true;
  }
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
