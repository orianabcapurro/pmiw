// Flechas tipo proyectil
class Flecha {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.velX = vx; // Velocidad en X
    this.velY = vy; // Velocidad en Y
    this.radio = 6; // Para colisiones
  }

  // Actualiza posición
  actualizar() {
    this.x += this.velX;
    this.y += this.velY;
  }

  // Chequea si salió de pantalla
  fueraDePantalla() {
    return (this.x < -30 || this.x > width + 30 || 
            this.y < -30 || this.y > height + 30);
  }

  // Dibuja la flecha
  dibujar() {
    // Ángulo para rotarla
    const angulo = atan2(this.velY, this.velX);
    
    push();
    translate(this.x, this.y);
    rotate(angulo);

    // Cuerpo dorado
    fill(212, 184, 95);
    rect(-10, -2, 20, 4, 2);
    triangle(10, 0, 4, -4, 4, 4); // Punta

    // Plumas
    fill(200, 200, 200);
    rect(-14, -3, 4, 6, 1);
    
    pop();
  }
}
