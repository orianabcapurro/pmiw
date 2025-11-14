// Corazones (enemigos)
class Corazon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dir = random(0, TWO_PI); // Dirección random
    this.vel = random(1.4, 2.6);  // Velocidad random
    this.tam = random(26, 40);    // Tamaño random
    this.radio = this.tam * 0.42; // Para colisiones
  }

  // Hace que persiga al personaje/Cupido
  seguirPersonaje(xDestino, yDestino) {
    this.dir = atan2(yDestino - this.y, xDestino - this.x);
  }

  // Movimiento
  mover() {
    // Desplazamiento polar
    const despX = cos(this.dir) * this.vel;
    const despY = sin(this.dir) * this.vel;

    this.x += despX;
    this.y += despY;

    // Rebota en los bordes
    if (this.x + this.radio > width || this.x - this.radio < 0) {
      this.vel *= -1;
    }
    if (this.y + this.radio > PISO_Y || this.y - this.radio < 0) {
      this.vel *= -1;
    }

    // Limita posición
    this.x = constrain(this.x, this.radio, width - this.radio);
    this.y = constrain(this.y, this.radio, PISO_Y - this.radio);
  }

  actualizar() {
    this.mover();
  }

  // Dibuja el corazón (dos circulos arriba y triangulo abajo)
  dibujar() {
    fill(255, 90, 118); // Rosita/rojito
    // Circulos de arriba
    ellipse(this.x - this.tam * 0.2, this.y - this.tam * 0.1, this.tam * 0.7);
    ellipse(this.x + this.tam * 0.2, this.y - this.tam * 0.1, this.tam * 0.7);
    // Triángulo de abajo
    triangle(
      this.x - this.tam * 0.45, this.y,
      this.x + this.tam * 0.45, this.y,
      this.x, this.y + this.tam * 0.5
    );
  }
}
