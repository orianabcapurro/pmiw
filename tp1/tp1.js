// Oriana Betsabé Capurro, tp1, comisión 3

// Variables
let img;
let numCuadrados = 40; // Cuadrados
let tamanoInicial = 700; // Tamaño inicial
let coloresInvertidos = false;
let centroX = 600; // Centro del lado derecho
let centroY = 200;
let tiempoAnterior = 0; // Para controlar el cambio automático de colores

function preload() {
    img = loadImage("data/F_48.jpg"); // Cargar la imagen de referencia
}

function setup() {
    createCanvas(800, 400);
    tiempoAnterior = millis(); // Inicia el tiempo
}

function draw() {
    background(255);
    
    // Cambio automático de colores cada 1.5 segundos
    if (millis() - tiempoAnterior > 1500) {
        coloresInvertidos = !coloresInvertidos;
        tiempoAnterior = millis();
    }
    
    // Dibujar patrón en el lado derecho
    dibujarPatron(centroX, centroY, numCuadrados);
    
    // Punto rojo
    fill(255, 0, 0);
    ellipse(centroX, centroY, 13, 13);
    
    // Solo mostrar la imagen
    mostrarImagen();
}

// Función 1: (No retorna valor) Dibuja el patrón completo
function dibujarPatron(x, y, cantidad) {
    push();
    translate(x, y);
    rotate(PI/4); // Rotar 45 grados
    
    let filas = cantidad;
    let columnas = 2;
    
    // Ciclos for anidados para el patrón
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            
            let factor = (j === 0) ? 1.0 : 0.7;
            let tamano = calcularTamano(i, cantidad) * factor;
            
            // Determinar color con condicional (usando i y j)
            if ((i + j) % 2 === 0) {
                if (coloresInvertidos) {
                    fill(255); // Blanco
                } else {
                    fill(0); // Negro
                }
            } else {
                if (coloresInvertidos) {
                    fill(0); // Negro
                } else {
                    fill(255); // Blanco
                }
            }
            if (j === 0) {
                // Primera iteración: cuadrado más grande
                noStroke();
                rectMode(CENTER);
                rect(0, 0, tamano, tamano);
            } else {
                // Segunda iteración: cuadrado más chico encima
                noStroke();
                rectMode(CENTER);
                rect(0, 0, tamano, tamano);
            }
        }
    }
    pop();
}

// Función 2: (Retorna valor) Calcula el tamaño de cada cuadrado
function calcularTamano(indice, total) {
   // map() para reducir tamaño gradualmente desde muy grande hasta muy chico
    return map(indice, 0, total-1, tamanoInicial, 3);
}

// Función 3: (No retorna valor) Muestra solo la imagen
function mostrarImagen() {
    image(img, 0, 0, 400, 400);
}

// Función 4: (No retorna valor) Reinicia
function reiniciar() {
    numCuadrados = 40; // Vuelve al estado inicial con muchos cuadrados
    tamanoInicial = 700; // Tamaño inicial MUY grande
    coloresInvertidos = false;
    tiempoAnterior = millis(); // Reinicia el tiempo también
}

// Eventos de teclado
function keyPressed() {
  // Invertir colores
    if (key === ' ') {
        coloresInvertidos = !coloresInvertidos;
    }
    
    // Reiniciar programa
    if (key === 'r' || key === 'R') {
        reiniciar();
    }
    
    // Flechas arriba y abajo
    if (keyCode === UP_ARROW) {
      // Más cuadrados (máximo 60)
        if (numCuadrados < 60) {
            numCuadrados++;
        }
    }
    
    if (keyCode === DOWN_ARROW) {
      // Menos cuadrados (mínimo 10)
        if (numCuadrados > 10) {
            numCuadrados--;
        }
    }
}

// Eventos de mouse
function mousePressed() {
  // Para detectar si el click está cerca de lo dibujado
    let distancia = dist(mouseX, mouseY, centroX, centroY);
    
    if (distancia < 200) {
      // Achicar el tamaño cada vez que hacés click
        tamanoInicial = tamanoInicial * 0.8; // Achique del tamaño actual
        
        // No dejar que se achique tanto
        if (tamanoInicial < 100) {
            tamanoInicial = 100;
        }
    }
}
