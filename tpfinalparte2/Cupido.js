// Cupido
class Cupido {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velX = 4.2; // Velocidad horizontal
    this.velY = 0;   // Velocidad vertical (gravedad)
    this.radio = 18;
    this.grav = 0.25; // Gravedad

    // Para saber si se esta moviendo
    this.moviendoIzq = false;
    this.moviendoDer = false;
  }

  // Actualiza movimiento
  mover(izq, der) {
    this.moviendoIzq = izq;
    this.moviendoDer = der;
  }

  // Física del personaje
  actualizar() {
    // Movimiento horizontal
    if (this.moviendoIzq) this.x -= this.velX;
    if (this.moviendoDer) this.x += this.velX;

    // Gravedad
    this.velY += this.grav;
    this.y += this.velY;

    // Rebote con el piso
    if (this.y + this.radio > PISO_Y) {
      this.y = PISO_Y - this.radio;
      this.velY = -abs(this.velY) * 0.25; // Rebota un poco
      if (abs(this.velY) < 0.5) this.velY = 0; // Si es muy poco lo frena
    }

    // Que no se salga por los lados
    this.x = constrain(this.x, this.radio, width - this.radio);
  }

  // Dibuja el Cupido
  dibujar() {
    // Ángulo hacia el mouse para el arco
    const angulo = atan2(mouseY - this.y, mouseX - this.x);

    push();
    translate(this.x, this.y);

    // Alas rosas
    fill(245, 171, 201);
    ellipse(-16, -8, 22, 14);
    ellipse(-22, 2, 22, 14);
    ellipse(-12, 2, 22, 14);

    // Cuerpito
    fill(237, 232, 224);
    ellipse(0, 0, this.radio * 2, this.radio * 2 + 4);
    rect(-7, 6, 14, 14, 4);

    // Pelito rojo
    fill(212, 75, 62);
    arc(0, -6, 22, 16, PI, TWO_PI);

    // Arco (apunta al mouse)
    rotate(angulo);
    fill(156, 90, 59);
    rect(-14, -18, 8, 36, 4);

    pop();
  }
}
