// Variable para saber la pantalla actual
let pantalla;
let Imagenes = [];

function preload() {
  // Imágenes
  Imagenes[0] = loadImage("./data/Imagen0.png");
  Imagenes[1] = loadImage("./data/Imagen1.png");
  Imagenes[2] = loadImage("./data/Imagen2.png");
  Imagenes[3] = loadImage("./data/Imagen3.png");
  Imagenes[4] = loadImage("./data/Imagen4.png");
  Imagenes[5] = loadImage("./data/Imagen5.png");
  Imagenes[6] = loadImage("./data/Imagen6.png");
  Imagenes[7] = loadImage("./data/Imagen7.png");
  Imagenes[8] = loadImage("./data/Imagen8.png");
  Imagenes[9] = loadImage("./data/Imagen9.png");
  Imagenes[10] = loadImage("./data/Imagen10.png");
  Imagenes[11] = loadImage("./data/Imagen11.png");
  Imagenes[12] = loadImage("./data/Imagen12.png");
  Imagenes[13] = loadImage("./data/Imagen13.png");
  Imagenes[14] = loadImage("./data/Imagen14.png");
}

function setup() {
  createCanvas(640, 480);
  // Valor inicial de pantalla
  pantalla = 0;
} 

function draw() {
  background(137, 206, 140);
  
  // Mostrar pantalla de inicio
  if (pantalla === 0) {
    mostrarPantallaInicio();
  }
  // Pantalla 1
  else if (pantalla === 1) {
    image(Imagenes[1], 0, 0, width, height);
    // Descomentar para ver el área del botón:
    //mostrarBotonRect(220, 430, 200, 40);
  }
  // Pantalla 2
  else if (pantalla === 2) {
    image(Imagenes[2], 0, 0, width, height);
    // Descomentar para ver el área del botón:
    //mostrarBotonRect(220, 430, 200, 40);
  }
  // Pantalla 3
  else if (pantalla === 3) {
    image(Imagenes[3], 0, 0, width, height);
    // Descomentar para ver las áreas de los botones:
    //mostrarBotonRect(60, 430, 240, 40);  // Botón izquierdo
    //mostrarBotonRect(340, 430, 240, 40); // Botón derecho
  }
  // Pantalla 4
  else if (pantalla === 4) {
    image(Imagenes[4], 0, 0, width, height);
    // Descomentar para ver el área del botón:
    //mostrarBotonRect(220, 430, 200, 40);
  }
  // Pantalla 5
  else if (pantalla === 5) {
    image(Imagenes[5], 0, 0, width, height);
    // Descomentar para ver el área del botón:
    //mostrarBotonRect(220, 430, 200, 40);
  }
  // Pantalla 6
  else if (pantalla === 6) {
    image(Imagenes[6], 0, 0, width, height);
    // Descomentar para ver el área del botón:
    //mostrarBotonRect(220, 430, 200, 40);
  }
  //Pantalla 7 (Primer final)
  else if (pantalla === 7) {
    image(Imagenes[7], 0, 0, width, height);
    // Descomentar para ver el área del botón:
    //mostrarBotonRect(220, 430, 200, 40);
  }
  // Pantalla 8
  else if (pantalla === 8) {
    image(Imagenes[8], 0, 0, width, height);
    // Descomentar para ver las áreas de los botones:
    //mostrarBotonRect(60, 430, 240, 40);  // Botón izquierdo
    //mostrarBotonRect(340, 430, 240, 40); // Botón derecho
  }
  // Pantalla 9
  else if (pantalla === 9) {
    image(Imagenes[9], 0, 0, width, height);
    // Descomentar para ver el área del botón:
    //mostrarBotonRect(220, 430, 200, 40);
  }
  // Pantalla 10
  else if (pantalla === 10) {
    image(Imagenes[10], 0, 0, width, height);
    // Descomentar para ver el área del botón:
    //mostrarBotonRect(220, 430, 200, 40);
  }
  // Pantalla 11 (Segundo final)
  else if (pantalla === 11) {
    image(Imagenes[11], 0, 0, width, height);
    // Descomentar para ver el área del botón:
    //mostrarBotonRect(220, 430, 200, 40);
  }
  // Pantalla 12
  else if (pantalla === 12) {
    image(Imagenes[12], 0, 0, width, height);
    // Descomentar para ver el área del botón:
    //mostrarBotonRect(220, 430, 200, 40);
  }
  // Pantalla 13
  else if (pantalla === 13) {
    image(Imagenes[13], 0, 0, width, height);
    // Descomentar para ver el área del botón:
    //mostrarBotonRect(220, 430, 200, 40);
  }
  // Pantalla 14 (Tercer final)
  else if (pantalla === 14) {
    image(Imagenes[14], 0, 0, width, height);
    // Descomentar para ver el área del botón:
    //mostrarBotonRect(220, 430, 200, 40);
  }
}

// Funciones para mostrar las áreas clickeables
function mostrarBotonCirculo(x_, y_, diametro_) {
  noFill();
  stroke(255, 0, 0);
  strokeWeight(2);
  circle(x_, y_, diametro_);
}

function mostrarBotonRect(x_, y_, ancho_, alto_) {
  noFill();
  stroke(255, 0, 0);
  strokeWeight(2);
  rect(x_, y_, ancho_, alto_);
}

function mousePressed() {
  // Pantalla 0: Botón para ir a pantalla 1
  if (pantalla === 0) { 
    let distancia = dist(mouseX, mouseY, 320, 420);
    if (distancia < 65) { // 65 es el radio (130/2)
      pantalla = 1;
    }
  }
  // Pantalla 1: Botón para ir a pantalla 2
  else if (pantalla === 1) {
    if (mouseX > 220 && mouseX < 420 && mouseY > 430 && mouseY < 470) {
      pantalla = 2;
    }
  }
  // Pantalla 2: Botón para ir a pantalla 3
  else if (pantalla === 2) {
    if (mouseX > 220 && mouseX < 420 && mouseY > 430 && mouseY < 470) {
      pantalla = 3;
    }
  }
  // Pantalla 3: Dos botones para las dos opciones
  else if (pantalla === 3) {
    // Botón izquierdo: "INTENTAR CORTEJAR"
    if (mouseX > 60 && mouseX < 300 && mouseY > 430 && mouseY < 470) {
      pantalla = 4;
    }
    // Botón derecho: "PERSEGUIRLA"
    else if (mouseX > 340 && mouseX < 580 && mouseY > 430 && mouseY < 470) {
      pantalla = 8;
    }
  }
  // Pantalla 4: Botón para ir a pantalla 5
  else if (pantalla === 4) {
    if (mouseX > 220 && mouseX < 420 && mouseY > 430 && mouseY < 470) {
      pantalla = 5;
    }
  }
  // Pantalla 5: Botón para ir a pantalla 6
  else if (pantalla === 5) {
    if (mouseX > 220 && mouseX < 420 && mouseY > 430 && mouseY < 470) {
      pantalla = 6;
    }
  }
  // Pantalla 6: Botón para ir a pantalla 7
  else if (pantalla === 6) {
    if (mouseX > 220 && mouseX < 420 && mouseY > 430 && mouseY < 470) {
      pantalla = 7;
    }
  }
  // Pantalla 7: Botón de reinicio para volver al inicio
  else if (pantalla === 7) {
    if (mouseX > 220 && mouseX < 420 && mouseY > 430 && mouseY < 470) {
      pantalla = 0;
    }
  }
  // Pantalla 8: Dos botones para las dos opciones
  else if (pantalla === 8) {
    // Botón izquierdo
    if (mouseX > 60 && mouseX < 300 && mouseY > 430 && mouseY < 470) {
      pantalla = 9;
    }
    // Botón derecho
    else if (mouseX > 340 && mouseX < 580 && mouseY > 430 && mouseY < 470) {
      pantalla = 12;
    }
  }
  // Pantalla 9: Botón para ir a pantalla 10
  else if (pantalla === 9) {
    if (mouseX > 220 && mouseX < 420 && mouseY > 430 && mouseY < 470) {
      pantalla = 10;
    }
  }
  // Pantalla 10: Botón para ir a pantalla 11
  else if (pantalla === 10) {
    if (mouseX > 220 && mouseX < 420 && mouseY > 430 && mouseY < 470) {
      pantalla = 11;
    }
  }
  // Pantalla 11: Botón de reinicio para volver al inicio
  else if (pantalla === 11) {
    if (mouseX > 220 && mouseX < 420 && mouseY > 430 && mouseY < 470) {
      pantalla = 0;
    }
  }
  // Pantalla 12: Botón para ir a pantalla 13
  else if (pantalla === 12) {
    if (mouseX > 220 && mouseX < 420 && mouseY > 430 && mouseY < 470) {
      pantalla = 13;
    }
  }
  // Pantalla 13: Botón para ir a pantalla 14
  else if (pantalla === 13) {
    if (mouseX > 220 && mouseX < 420 && mouseY > 430 && mouseY < 470) {
      pantalla = 14;
    }
  }
  // Pantalla 14: Botón de reinicio para volver al inicio
  else if (pantalla === 14) {
    if (mouseX > 220 && mouseX < 420 && mouseY > 430 && mouseY < 470) {
      pantalla = 0;
    }
  }
}

// Funciones de pantalla
function mostrarPantallaInicio() {
  push(); 
  image(Imagenes[0], 0, 0, width, height);
  pop();
}
