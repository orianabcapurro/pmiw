// tpfinalparte2, comisión 3}
// Oriana Betsabé Capurro y Fiorella Celi

// Tamaño del canvas
const ANCHO = 640;
const ALTO = 480;

// Medidas del piso
const PISO_ALTO = 80;
const PISO_Y = ALTO - PISO_ALTO;

// Estados del juego
const ESTADO = {
  INICIO: 'inicio',
  JUGANDO: 'jugando',
  GANASTE: 'ganaste',
  PERDISTE: 'perdiste'
};

// Paleta de colores
const COLOR_CIELO = [205, 229, 245];
const COLOR_PASTO = [216, 240, 212];
const COLOR_TRONCO = [90, 64, 41];
const COLOR_COPA = [63, 139, 83];
const COLOR_PANEL = [34, 57, 68];
const COLOR_TEXTO = [255, 255, 255];
const COLOR_DORADO = [212, 184, 95];
const COLOR_ENEMIGO = [255, 90, 118];

// Variable global del juego
let juego;
// Imágenes
let imagenFondo;
let imagenCupido;

// Carga de imágenes
function preload() {
  imagenFondo = loadImage('data/fondito.jpg');
  imagenCupido = loadImage('data/cupido.png');
}

function setup() {
  createCanvas(ANCHO, ALTO);
  noStroke();
  juego = new Juego();
}

function draw() {
  dibujarFondo();
  juego.actualizar();
  juego.mostrar();
}

// Eventos de entrada
function keyPressed() {
  juego.teclaPresionada(key);
}

function mousePressed() {
  juego.disparar(mouseX, mouseY);
}

function dibujarFondo() {
  // Imagen de fondo ajustada al tamaño del canvas
  image(imagenFondo, 0, 0, width, height);
}

// Jueguito
class Juego {
  constructor() {
    // Estado del juego
    this.estadoActual = ESTADO.INICIO;
    this.puntos = 0;
    this.puntosParaGanar = 50;
    this.tiempoLimite = 30; // segundos
    this.tiempoInicio = millis();

    // Personaje/Cupido
    this.cupido = new Cupido(width * 0.18, height * 0.68);

    // Arrays/arreglos de objetos
    this.flechas = [];
    this.corazones = [];

    // Control de aparición de enemigos
    this.framesCadaSpawn = 70;
    this.ultimoFrameSpawn = 0;
    this.maxCorazones = 3;

    // Control de disparo
    this.tiempoEntreDisparos = 140; // milisegundos
    this.ultimoDisparo = -9999;

    // Incremento de dificultad
    this.segundosCadaIncremento = 15;

    // Créditos
    this.creditos = "Créditos: Oriana Betsabé Capurro y Fiorella Celi";
  }

  // Teclas
  teclaPresionada(tecla) {
    // R para reiniciar
    if (tecla === 'r' || tecla === 'R') {
      this.reiniciar();
    }
    // Espacio en pantallas de fin para reiniciar
    else if ((this.estadoActual === ESTADO.GANASTE || this.estadoActual === ESTADO.PERDISTE) && tecla === ' ') {
      this.reiniciar();
    }
  }

  // Maneja los clicks del mouse
  disparar(mx, my) {
    // Si está en la pantalla de inicio, verifica si clickeó el botón
    if (this.estadoActual === ESTADO.INICIO) {
      const btnX = width / 2 - 100;
      const btnY = 350;
      const btnAncho = 200;
      const btnAlto = 50;

      // Si clickeó el botón, empieza el juego
      if (mx > btnX && mx < btnX + btnAncho && my > btnY && my < btnY + btnAlto) {
        this.estadoActual = ESTADO.JUGANDO;
      }
      return;
    }

    // Si no está jugando, empieza el juego
    if (this.estadoActual !== ESTADO.JUGANDO) {
      this.estadoActual = ESTADO.JUGANDO;
      return;
    }

    // Verifica el cooldown
    if (millis() - this.ultimoDisparo < this.tiempoEntreDisparos) return;
    this.ultimoDisparo = millis();

    // Calcula la dirección
    const dirX = mx - this.cupido.x;
    const dirY = my - this.cupido.y;
    const distancia = dist(0, 0, dirX, dirY);
    
    if (distancia < 1) return;

    // Normaliza y multiplica por velocidad
    const velocidad = 16;
    const velX = (dirX / distancia) * velocidad;
    const velY = (dirY / distancia) * velocidad;

    // Crea la flecha un poco adelante del cupido
    const inicioX = this.cupido.x + velX * 1.2;
    const inicioY = this.cupido.y + velY * 1.2;
    
    this.flechas.push(new Flecha(inicioX, inicioY, velX, velY));
  }

  // Reinicia todo
  reiniciar() {
    this.estadoActual = ESTADO.INICIO;
    this.puntos = 0;
    this.tiempoInicio = millis();
    this.cupido = new Cupido(width * 0.18, height * 0.68);
    this.flechas = [];
    this.corazones = [];
    this.ultimoFrameSpawn = frameCount;
    this.framesCadaSpawn = 70;
    this.maxCorazones = 3;
  }

  // Aumenta la dificultad con el tiempo
  ajustarDificultad(segundosTranscurridos) {
    const niveles = floor(segundosTranscurridos / this.segundosCadaIncremento);
    this.maxCorazones = constrain(3 + niveles, 3, 10);
    this.framesCadaSpawn = max(28, 70 - niveles * 6);
  }

  // Aparece un nuevo corazón enemigo
  aparecerCorazon() {
    if (this.corazones.length >= this.maxCorazones) return;
    if (frameCount - this.ultimoFrameSpawn < this.framesCadaSpawn) return;

    const x = random(width * 0.55, width - 40);
    const y = random(70, height - 110);
    this.corazones.push(new Corazon(x, y));
    this.ultimoFrameSpawn = frameCount;
  }

  // Actualiza la lógica del juego
  actualizar() {
    if (this.estadoActual !== ESTADO.JUGANDO) return;

    // Calcula tiempo
    const tiempoTranscurrido = (millis() - this.tiempoInicio) / 1000;
    const tiempoRestante = max(0, floor(this.tiempoLimite - tiempoTranscurrido));

    // Ajusta dificultad
    this.ajustarDificultad(tiempoTranscurrido);

    // Movimiento del cupido (A y D)
    const moviendoIzq = keyIsDown(65); // A
    const moviendoDer = keyIsDown(68); // D
    this.cupido.mover(moviendoIzq, moviendoDer);
    this.cupido.actualizar();

    // Aparece enemigos
    this.aparecerCorazon();

    // Actualiza corazones
    for (let c of this.corazones) {
      c.seguirPersonaje(this.cupido.x, this.cupido.y);
      c.actualizar();
    }

    // Actualiza flechas
    for (let i = this.flechas.length - 1; i >= 0; i--) {
      this.flechas[i].actualizar();
      if (this.flechas[i].fueraDePantalla()) {
        this.flechas.splice(i, 1);
      }
    }

    // Colisión corazón-cupido
    for (let c of this.corazones) {
      const distancia = dist(c.x, c.y, this.cupido.x, this.cupido.y);
      if (distancia < c.radio + this.cupido.radio) {
        this.estadoActual = ESTADO.PERDISTE;
        return;
      }
    }

    // Colisión entre flecha y corazón
    for (let i = this.corazones.length - 1; i >= 0; i--) {
      const c = this.corazones[i];
      for (let j = this.flechas.length - 1; j >= 0; j--) {
        const f = this.flechas[j];
        const distancia = dist(f.x, f.y, c.x, c.y);
        if (distancia < c.radio + f.radio) {
          this.corazones.splice(i, 1);
          this.flechas.splice(j, 1);
          this.puntos += 10;
          break;
        }
      }
    }

    // Verifica condiciones de victoria y derrota
    if (this.puntos >= this.puntosParaGanar) {
      this.estadoActual = ESTADO.GANASTE;
    } else if (tiempoRestante <= 0) {
      this.estadoActual = ESTADO.PERDISTE;
    }
  }

  // Dibuja todo
  mostrar() {
    // Dibuja entidades si está jugando
    if (this.estadoActual === ESTADO.JUGANDO) {
      this.cupido.dibujar();
      for (let c of this.corazones) c.dibujar();
      for (let f of this.flechas) f.dibujar();
    }

    // Dibuja HUD
    this.dibujarHUD();

    // Dibuja pantallas según estado
    if (this.estadoActual === ESTADO.INICIO) this.pantallaInicio();
    if (this.estadoActual === ESTADO.GANASTE) this.pantallaGanaste();
    if (this.estadoActual === ESTADO.PERDISTE) this.pantallaPerdiste();
  }

  // Dibuja el HUD (puntos y tiempo)
  dibujarHUD() {
    // Calcula tiempo restante
    let tiempoRestante = 0;
    if (this.estadoActual !== ESTADO.INICIO) {
      const transcurrido = (millis() - this.tiempoInicio) / 1000;
      tiempoRestante = max(0, floor(this.tiempoLimite - transcurrido));
    }

    // Panel del HUD
    fill(0, 150);
    rect(12, 12, 190, 70, 8);

    // Texto del HUD
    fill(...COLOR_TEXTO);
    textAlign(LEFT, TOP);
    textSize(14);
    text("Puntaje: " + this.puntos, 22, 18);
    text("Tiempo: " + nf(tiempoRestante, 2) + "s", 22, 38);
    text("R = Reiniciar", 22, 58);
  }

  // Pantalla de inicio
  pantallaInicio() {
    // Dibuja la imagen del cupido de fondo
    push();
    image(imagenCupido, 0, 0, width, height);
    pop();

    // Overlay oscuro semitransparente
    fill(0, 150);
    rect(0, 0, width, height);

    // Título
    fill(...COLOR_DORADO);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Cupid shooter", width / 2, 60);
    textSize(20);
    text("(Daphne & Apollo, parte 2)", width / 2, 95);

    // Cuadrito de instrucciones
    fill(0, 180);
    rect(width / 2 - 230, 140, 460, 150, 10);

    fill(...COLOR_TEXTO);
    textSize(16);
    textAlign(CENTER, TOP);
    text("Instrucciones:", width / 2, 155);
    textSize(14);
    text("• A/D para moverse", width / 2, 185);
    text("• Click para disparar", width / 2, 210);
    text("• R para reiniciar", width / 2, 235);
    text("• Llegá a los 50 puntos antes de los 30 segundos", width / 2, 260);

    // Créditos
    textSize(12);
    text(this.creditos, width / 2, 310);

    // Botón de comenzar (rectángulo simple)
    fill(100, 150, 100);
    rect(220, 350, 200, 50, 10);

    // Texto del botón
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("COMENZAR", width / 2, 375);
  }

  // Pantalla de victoria
  pantallaGanaste() {
    fill(0, 180);
    rect(0, 0, width, height);

    fill(...COLOR_DORADO);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("¡GANASTE!", width / 2, height / 2 - 20);

    fill(...COLOR_TEXTO);
    textSize(18);
    text("Puntaje: " + this.puntos + "  |  R para reiniciar", width / 2, height / 2 + 10);
  }

  // Pantalla de derrota
  pantallaPerdiste() {
    fill(0, 180);
    rect(0, 0, width, height);

    fill(...COLOR_ENEMIGO);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("PERDISTE", width / 2, height / 2 - 20);

    fill(...COLOR_TEXTO);
    textSize(18);
    text("Puntaje: " + this.puntos + "  |  R para reiniciar", width / 2, height / 2 + 10);
  }
}

// Cupido
class Cupido {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocidadX = 4.2;
    this.velocidadY = 0;
    this.radio = 18;
    this.gravedad = 0.25;

    // Controles de movimiento
    this.moviendoIzq = false;
    this.moviendoDer = false;
  }

  // Actualiza flags de movimiento
  mover(izq, der) {
    this.moviendoIzq = izq;
    this.moviendoDer = der;
  }

  // Actualiza posición y física
  actualizar() {
    // Movimiento horizontal
    if (this.moviendoIzq) this.x -= this.velocidadX;
    if (this.moviendoDer) this.x += this.velocidadX;

    // Aplicar gravedad
    this.velocidadY += this.gravedad;
    this.y += this.velocidadY;

    // Rebote en el piso
    if (this.y + this.radio > PISO_Y) {
      this.y = PISO_Y - this.radio;
      this.velocidadY = -abs(this.velocidadY) * 0.25;
      if (abs(this.velocidadY) < 0.5) this.velocidadY = 0;
    }

    // Límites horizontales
    this.x = constrain(this.x, this.radio, width - this.radio);
  }

  // Dibuja el cupido
  dibujar() {
    // Ángulo hacia el mouse
    const angulo = atan2(mouseY - this.y, mouseX - this.x);

    push();
    translate(this.x, this.y);

    // Alas
    fill(245, 171, 201);
    ellipse(-16, -8, 22, 14);
    ellipse(-22, 2, 22, 14);
    ellipse(-12, 2, 22, 14);

    // Cuerpo
    fill(237, 232, 224);
    ellipse(0, 0, this.radio * 2, this.radio * 2 + 4);
    rect(-7, 6, 14, 14, 4);

    // Pelito
    fill(212, 75, 62);
    arc(0, -6, 22, 16, PI, TWO_PI);

    // Arco (apunta al mouse)
    rotate(angulo);
    fill(156, 90, 59);
    rect(-14, -18, 8, 36, 4);

    pop();
  }
}

// Corazones
class Corazon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.direccion = random(0, TWO_PI);
    this.velocidad = random(1.4, 2.6);
    this.tam = random(26, 40);
    this.radio = this.tam * 0.42;
  }

  // Hace que el corazón persiga al personaje/cupido
  seguirPersonaje(xDestino, yDestino) {
    this.direccion = atan2(yDestino - this.y, xDestino - this.x);
  }

  // Mueve el corazón
  mover() {
    // Desplazamiento polar
    const despX = cos(this.direccion) * this.velocidad;
    const despY = sin(this.direccion) * this.velocidad;

    this.x += despX;
    this.y += despY;

    // Rebote en bordes
    if (this.x + this.radio > width || this.x - this.radio < 0) {
      this.velocidad *= -1;
    }
    if (this.y + this.radio > PISO_Y || this.y - this.radio < 0) {
      this.velocidad *= -1;
    }

    // Limita posición
    this.x = constrain(this.x, this.radio, width - this.radio);
    this.y = constrain(this.y, this.radio, PISO_Y - this.radio);
  }

  actualizar() {
    this.mover();
  }

  // Dibuja el corazón
  dibujar() {
    fill(...COLOR_ENEMIGO);
    // Dos círculos arriba
    ellipse(this.x - this.tam * 0.2, this.y - this.tam * 0.1, this.tam * 0.7);
    ellipse(this.x + this.tam * 0.2, this.y - this.tam * 0.1, this.tam * 0.7);
    // Triángulo abajo
    triangle(
      this.x - this.tam * 0.45, this.y,
      this.x + this.tam * 0.45, this.y,
      this.x, this.y + this.tam * 0.5
    );
  }
}

// Flecha (onda proyectil)
class Flecha {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.velocidadX = vx;
    this.velocidadY = vy;
    this.radio = 6;
  }

  // Actualiza posición
  actualizar() {
    this.x += this.velocidadX;
    this.y += this.velocidadY;
  }

  // Verifica si salió de pantalla
  fueraDePantalla() {
    return (this.x < -30 || this.x > width + 30 || 
            this.y < -30 || this.y > height + 30);
  }

  // Dibuja la flecha
  dibujar() {
    const angulo = atan2(this.velocidadY, this.velocidadX);
    
    push();
    translate(this.x, this.y);
    rotate(angulo);

    // Cuerpo dorado
    fill(...COLOR_DORADO);
    rect(-10, -2, 20, 4, 2);
    triangle(10, 0, 4, -4, 4, 4);

    // Plumas
    fill(200, 200, 200);
    rect(-14, -3, 4, 6, 1);
    
    pop();
  }
}
