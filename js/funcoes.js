(function () {
  const cnv = document.querySelector('#canvas');
  const ctx = cnv.getContext('2d');

  //movimentos
  let moveLeft = false;
  let moveUp = false;
  let moveRight = false;
  let moveDown = false;

  let moveLeft2 = false;
  let moveUp2 = false;
  let moveRight2 = false;
  let moveDown2 = false;

  // arrays
  const quadrados = []; //armazena os quadrados

  // quadrados
  const quadrado2 = new quadrado(490, 0, 10, 500, "#000", 0); // posX, posY, width, height, color, velocidade
  quadrados.push(quadrado2); // adiciona o quadrado2 ao array quadrados

  const quadrado3 = new quadrado(470, 220, 50, 50, "#000", 0); // posX, posY, width, height, color, velocidade
  quadrados.push(quadrado3); // adiciona o quadrado3 ao array quadrados
  
  //robo 1
  const quadrado1 = new quadrado(900, 200, 50, 70, "grey", 5, 0); // posX, posY, width, height, color, velocidade
  quadrados.push(quadrado1); // adiciona o quadrado1 ao array quadrados

  //robo 2
  const quadrado4 = new quadrado(50, 200, 50, 70, "#dc143c", 5, 0); // posX, posY, width, height, color, velocidade
  quadrados.push(quadrado4); // adiciona o quadrado4 ao array quadrados
  


  // pressionar as teclas robo1
  window.addEventListener('keydown', function (e) {
    const nomeKey = e.key;
    console.log(nomeKey);
    switch (nomeKey) {
      case 'ArrowLeft':
        moveLeft = true;
        break;
      case 'ArrowUp':
        moveUp = true;
        break;
      case 'ArrowRight':
        moveRight = true;
        break;
      case 'ArrowDown':
        moveDown = true;
        break;
      case 'a':
      case 'A':
        moveLeft2 = true;
        break;
      case 'w':
      case 'W':
        moveUp2 = true;
        break;
      case 'd':
      case 'D':
        moveRight2 = true;
        break;
      case 's':
      case 'S':
        moveDown2 = true;
        break;
    }
  });

  //soltar as teclas robo1
  window.addEventListener('keyup', (e) => {
    const key = e.key;
    switch (key) {
      case 'ArrowLeft':
        moveLeft = false;
        break;
      case 'ArrowUp':
        moveUp = false;
        break;
      case 'ArrowRight':
        moveRight = false;
        break;
      case 'ArrowDown':
        moveDown = false;
        break;
      case 'a':
      case 'A':
        moveLeft2 = false;
        break;
      case 'w':
      case 'W':
        moveUp2 = false;
        break;
      case 'd':
      case 'D':
        moveRight2 = false;
        break;
      case 's':
      case 'S':
        moveDown2 = false;
        break;
    }
  });

  function colisao(a, b) {
    return a.posX < b.posX + b.width &&
            a.posX + a.width > b.posX &&
            a.posY < b.posY + b.height &&
            a.posY + a.height > b.posY;
  }

  function moverQuadrados() {
    if (moveLeft && !moveRight) {
      quadrado1.posX -= quadrado1.velocidade;
    }
    if (moveRight && !moveLeft) {
      quadrado1.posX += quadrado1.velocidade;
    }
    if (moveUp && !moveDown) {
      quadrado1.posY -= quadrado1.velocidade;
    }
    if (moveDown && !moveUp) {
      quadrado1.posY += quadrado1.velocidade;
    }

    if (moveLeft2 && !moveRight2) {
      quadrado4.posX -= quadrado4.velocidade;
    }
    if (moveRight2 && !moveLeft2) {
      quadrado4.posX += quadrado4.velocidade;
    }
    if (moveUp2 && !moveDown2) {
      quadrado4.posY -= quadrado4.velocidade;
    }
    if (moveDown2 && !moveUp2) {
      quadrado4.posY += quadrado4.velocidade;
    }
    //fiixar na tela - NÃO SAI DO CANVAS - Precisa pensar em como fazer isso com o obstáculo
    quadrado1.posX = Math.max(0, Math.min(cnv.width - quadrado1.width, quadrado1.posX));
    quadrado1.posY = Math.max(0, Math.min(cnv.height - quadrado1.height, quadrado1.posY));

    quadrado4.posX = Math.max(0, Math.min(cnv.width - quadrado4.width, quadrado4.posX));
    quadrado4.posY = Math.max(0, Math.min(cnv.height - quadrado4.height, quadrado4.posY));

    if (colisao(quadrado1, quadrado4)) {
      console.log('Colisão entre os quadrados 1 e 4');
      quadrado1.posX += (quadrado4.posX - quadrado1.posX) * -0.1;
      quadrado1.posY += (quadrado4.posY - quadrado1.posY) * -0.1;
      
      quadrado4.posX += (quadrado1.posX - quadrado4.posX) * -0.1;
      quadrado4.posY += (quadrado1.posY - quadrado4.posY) * -0.1;

      quadrado1.dano += 1;
      console.log(quadrado1.dano);
    }

  }


  function exibirQuadrados() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    for (const i in quadrados) {
      const spr = quadrados[i];
      ctx.fillStyle = spr.color
      ctx.fillRect(spr.posX, spr.posY, spr.width, spr.height);
    }
  }
  //solicitar uma animação ao browser e chamar a função
  //que é a propria função atualizarTela
  function atualizarTela() {
    window.requestAnimationFrame(atualizarTela, cnv);
    moverQuadrados();
    exibirQuadrados();
  }
  atualizarTela();

}());