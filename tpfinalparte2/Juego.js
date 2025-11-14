// Jueguito
class Juego {
  constructor() {
    this.estado = 'inicio'; // Puede ser: inicio, jugando, ganaste, perdiste
    this.puntos = 0;
    this.tiempoInicio = millis(); // Guarda cuando empieza

    // Personaje
    this.cupido = new Cupido(width * 0.18, height * 0.68);
    
    // Arrays con flechas y corazones
    this.flechas = [];
    this.corazones = [];

    // Para controlar spawn de enemigos
    this.contadorSpawn = 0;
    this.maxCorazones = 3;
    
    // Para que no dispare muy rápido
    this.ultimoDisparo = -9999;
  }

  // Teclas
  teclaPresionada(tecla) {
    // R reinicia
    if (tecla === 'r' || tecla === 'R') {
      this.reiniciar();
    }
  }

  // Disparo con mouse
  disparar(mx, my) {
    // Si está en inicio, clickear botón
    if (this.estado === 'inicio') {
      // area del boton comenzar
      if (mx > 220 && mx < 420 && my > 365 && my < 415) {
        this.estado = 'jugando';
      }
      return;
    }

    // Si no está jugando, empieza
    if (this.estado !== 'jugando') {
      this.estado = 'jugando';
      return;
    }

    // Cooldown para no spamear flechas
    if (millis() - this.ultimoDisparo < 140) return;
    this.ultimoDisparo = millis();

    // Calcular dirección hacia donde clickeo
    const dirX = mx - this.cupido.x;
    const dirY = my - this.cupido.y;
    const d = dist(0, 0, dirX, dirY);
    
    if (d < 1) return; // Si es muy cerca no dispara

    // Velocidad de la flecha
    const vel = 16;
    const velX = (dirX / d) * vel;
    const velY = (dirY / d) * vel;

    // punto de inicio (un poco adelante del cupido)
    const inicioX = this.cupido.x + velX * 1.2;
    const inicioY = this.cupido.y + velY * 1.2;
    
    // Crea la flecha
    this.flechas.push(new Flecha(inicioX, inicioY, velX, velY));
  }

  // Reiniciar todo
  reiniciar() {
    this.estado = 'inicio';
    this.puntos = 0;
    this.tiempoInicio = millis();
    this.cupido = new Cupido(width * 0.18, height * 0.68);
    this.flechas = [];
    this.corazones = [];
    this.contadorSpawn = 0;
    this.maxCorazones = 3;
  }

  // Acá va toda la lógica del juego
  actualizar() {
    // Solo actualiza si está jugando
    if (this.estado !== 'jugando') return;

    // Calcular tiempo
    const tiempoTranscurrido = (millis() - this.tiempoInicio) / 1000;
    const tiempoRestante = max(0, floor(30 - tiempoTranscurrido));

    // Dificultad aumenta con el tiempo
    const nivel = floor(tiempoTranscurrido / 15);
    this.maxCorazones = constrain(3 + nivel, 3, 10);

    // Movimiento del Cupido con A y D
    const izq = keyIsDown(65); // A
    const der = keyIsDown(68); // D
    this.cupido.mover(izq, der);
    this.cupido.actualizar();

    // Spawnear corazones enemigos
    this.contadorSpawn++;
    const velocidadSpawn = max(28, 70 - nivel * 6); // Cada vez más rápido
    if (this.corazones.length < this.maxCorazones && this.contadorSpawn > velocidadSpawn) {
      const x = random(width * 0.55, width - 40);
      const y = random(70, height - 110);
      this.corazones.push(new Corazon(x, y));
      this.contadorSpawn = 0; // Resetea contador
    }

    // Actualizar corazones (que sigan al Cupido)
    for (let c of this.corazones) {
      c.seguirPersonaje(this.cupido.x, this.cupido.y);
      c.actualizar();
    }

    // Actualizar flechas y borrar las que se fueron
    for (let i = this.flechas.length - 1; i >= 0; i--) {
      this.flechas[i].actualizar();
      if (this.flechas[i].fueraDePantalla()) {
        this.flechas.splice(i, 1); // borra
      }
    }

    // Colision corazón toca cupido = perdiste
    for (let c of this.corazones) {
      const d = dist(c.x, c.y, this.cupido.x, this.cupido.y);
      if (d < c.radio + this.cupido.radio) {
        this.estado = 'perdiste';
        return;
      }
    }

    // Colisión flecha con corazón
    for (let i = this.corazones.length - 1; i >= 0; i--) {
      const c = this.corazones[i];
      for (let j = this.flechas.length - 1; j >= 0; j--) {
        const f = this.flechas[j];
        const d = dist(f.x, f.y, c.x, c.y);
        if (d < c.radio + f.radio) {
          this.corazones.splice(i, 1); // Borra corazón
          this.flechas.splice(j, 1);   // Borra flecha
          this.puntos += 10;           // Suma puntos
          break;
        }
      }
    }

    // Chequear si gana o pierde
    if (this.puntos >= 50) {
      this.estado = 'ganaste';
    } else if (tiempoRestante <= 0) {
      this.estado = 'perdiste';
    }
  }

  // Dibuja todo en pantalla
  mostrar() {
    // Dibuja solo si está jugando
    if (this.estado === 'jugando') {
      this.cupido.dibujar();
      for (let c of this.corazones) c.dibujar();
      for (let f of this.flechas) f.dibujar();
    }

    // HUD siempre se ve
    this.dibujarHUD();

    // Pantallas según estado
    if (this.estado === 'inicio') this.pantallaInicio();
    if (this.estado === 'ganaste') this.pantallaGanaste();
    if (this.estado === 'perdiste') this.pantallaPerdiste();
  }

  // Puntaje y tiempo
  dibujarHUD() {
    // Calcular tiempo restante
    let tiempoRestante = 0;
    if (this.estado !== 'inicio') {
      const transcurrido = (millis() - this.tiempoInicio) / 1000;
      tiempoRestante = max(0, floor(30 - transcurrido));
    }

    // Cuadro del HUD
    fill(0, 150);
    rect(12, 12, 190, 70, 8);

    // Textos
    fill(255);
    textAlign(LEFT, TOP);
    textSize(14);
    text("Puntaje: " + this.puntos, 22, 18);
    text("Tiempo: " + nf(tiempoRestante, 2) + "s", 22, 38);
    text("R = Reiniciar", 22, 58);
  }

  // Pantalla de inicio con imagen de Cupido
  pantallaInicio() {
    push();
    image(imagenCupido, 0, 0, width, height);
    pop();

    // Tipo overlay oscuro
    fill(0, 150);
    rect(0, 0, width, height);

    // Título
    fill(212, 184, 95); // dorado
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Cupid shooter", width / 2, 60);
    textSize(20);
    text("(Daphne & Apollo, parte 2)", width / 2, 95);

    // Cuadrito de instrucciones
    fill(0, 180);
    rect(width / 2 - 230, 140, 460, 175, 10);

    fill(255);
    textSize(16);
    textAlign(CENTER, TOP);
    text("Instrucciones:", width / 2, 155);
    textSize(14);
    text("• A/D para moverse", width / 2, 185);
    text("• Click para disparar", width / 2, 210);
    text("• R para reiniciar", width / 2, 235);
    text("• Llegá a los 50 puntos antes de los 30 segundos", width / 2, 260);
    text("(Espacio para prender y apagar el sonido)", width / 2, 285);

    // Créditos
    textSize(12);
    text("Créditos: Oriana Betsabé Capurro y Fiorella Celi", width / 2, 330);

    // Botón de comenzar
    fill(100, 150, 100);
    rect(220, 365, 200, 50, 10);

    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("COMENZAR", width / 2, 390);
  }

  // Pantalla cuando ganás
  pantallaGanaste() {
    fill(0, 180);
    rect(0, 0, width, height);

    fill(212, 184, 95); // dorado
    textAlign(CENTER, CENTER);
    textSize(30);
    text("¡GANASTE!", width / 2, height / 2 - 20);

    fill(255);
    textSize(18);
    text("Puntaje: " + this.puntos + "  |  R para reiniciar", width / 2, height / 2 + 10);
  }

  // Pantalla cuando perdés
  pantallaPerdiste() {
    fill(0, 180);
    rect(0, 0, width, height);

    fill(255, 90, 118); // rojo/rosa
    textAlign(CENTER, CENTER);
    textSize(30);
    text("PERDISTE", width / 2, height / 2 - 20);

    fill(255);
    textSize(18);
    text("Puntaje: " + this.puntos + "  |  R para reiniciar", width / 2, height / 2 + 10);
  }
}
