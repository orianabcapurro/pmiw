// Oriana Betsabé Capurro y Fiorella Celi, comisión 3
// https://www.youtube.com/watch?v=quGP75VJun8
// En los videos de Youtube teníamos todos los objetos en una pestaña,
// después nos dimos cuenta que quizás querías que estén separados, así que ya lo cambiamos en el código,
// Mil disculpa por el largo de los videos, queríamos explicar todo lo suficiente y no supimos acortarlo más

// Tamaño del canvas
const ANCHO = 640;
const ALTO = 480;

// Para el piso
const PISO_ALTO = 80;
const PISO_Y = ALTO - PISO_ALTO;

// Variables globales
let juego;
let imagenFondo;
let imagenCupido;
let sonido;
let musicaPrendida = false;

// Carga imágenes y sonido
function preload() {
  imagenFondo = loadImage('data/fondito.png');
  imagenCupido = loadImage('data/cupido.png');
  sonido = loadSound('data/musica.mp3');
}

function setup() {
  createCanvas(ANCHO, ALTO);
  noStroke();
  juego = new Juego(); // Crea el juego
}

function draw() {
  dibujarFondo();
  juego.actualizar(); // Actualiza todo
  juego.mostrar();    // Dibuja todo
}

// Para las teclas
function keyPressed() {
  // Espacio prende/apaga música
  if (key === ' ') {
    if (musicaPrendida) {
      sonido.pause();
      musicaPrendida = false;
    } else {
      sonido.loop();
      musicaPrendida = true;
    }
  }
  
  juego.teclaPresionada(key);
}

// Para el mouse
function mousePressed() {
  juego.disparar(mouseX, mouseY);
}

// Dibuja imagen de fondo
function dibujarFondo() {
  image(imagenFondo, 0, 0, width, height);
}
