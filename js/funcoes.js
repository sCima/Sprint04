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

  let colisoes = 0;

  // hp dos robos
  const robo1 = document.querySelector('.hpRobo1');
  const robo2 = document.querySelector('.hpRobo2');

  // barra de informaçoes dos robos
  const infoRobo1 = document.querySelector('#infoRobo1');
  const infoRobo2 = document.querySelector('#infoRobo2');

  // mensagem de vitoria
  const textoVitoria = document.querySelector('#vitoria')

  // arrays
  const quadrados = []; //armazena os quadrados

  // quadrados
  /*const quadrado2 = new quadrado(490, 0, 10, 500, "#000", 0); // posX, posY, width, height, color, velocidade
  quadrados.push(quadrado2); // adiciona o quadrado2 ao array quadrados

  const quadrado3 = new quadrado(470, 220, 50, 50, "#000", 0); // posX, posY, width, height, color, velocidade
  quadrados.push(quadrado3); // adiciona o quadrado3 ao array quadrados*/

  //robo 1
  const quadrado1 = new quadrado(900, 210, 50, 70, "grey", 5, 100); // posX, posY, width, height, color, velocidade
  quadrados.push(quadrado1); // adiciona o quadrado1 ao array quadrados

  //robo 2
  const quadrado4 = new quadrado(50, 210, 50, 70, "#dc143c", 5, 100); // posX, posY, width, height, color, velocidade
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
    if (moveLeft2) {
      quadrado4.posX -= quadrado1.velocidade;
    }
    if (moveRight2) {
      quadrado4.posX += quadrado1.velocidade;
    }
    if (moveUp2) {
      quadrado4.posY -= quadrado1.velocidade;
    }
    if (moveDown2) {
      quadrado4.posY += quadrado1.velocidade;
    }

    if (moveLeft) {
      quadrado1.posX -= quadrado4.velocidade;
    }
    if (moveRight) {
      quadrado1.posX += quadrado4.velocidade;
    }
    if (moveUp) {
      quadrado1.posY -= quadrado4.velocidade;
    }
    if (moveDown) {
      quadrado1.posY += quadrado4.velocidade;
    }

    //fixar na tela - NÃO SAI DO CANVAS - Precisa pensar em como fazer isso com o obstáculo
    quadrado1.posX = Math.max(0, Math.min(cnv.width - quadrado1.width, quadrado1.posX));
    quadrado1.posY = Math.max(0, Math.min(cnv.height - quadrado1.height, quadrado1.posY));

    quadrado4.posX = Math.max(0, Math.min(cnv.width - quadrado4.width, quadrado4.posX));
    quadrado4.posY = Math.max(0, Math.min(cnv.height - quadrado4.height, quadrado4.posY));

    if (colisao(quadrado1, quadrado4)) {
      quadrado1.posX += (quadrado4.posX - quadrado1.posX) * -1.5;
      quadrado1.posY += (quadrado4.posY - quadrado1.posY) * -1.5;

      quadrado4.posX += (quadrado1.posX - quadrado4.posX) * -1.5;
      quadrado4.posY += (quadrado1.posY - quadrado4.posY) * -1.5;

      
      // Se houver mais de "0" de vida, calcula o dano
      if (robo1.textContent >= "0") {
        quadrado1.dano -= Math.round(Math.random() * 20);
        robo1.textContent = quadrado1.dano;
      } // Se não, mantem a vida como 0 para nao negativar
      if (robo1.textContent <= "0") {
        quadrado1.dano = 0;
        robo1.textContent = 0;

      }

      // Se houver mais de "0" de vida, calcula o dano
      if (robo2.textContent >= "0") {
        quadrado4.dano -= Math.round(Math.random() * 20);
        robo2.textContent = quadrado4.dano;
      } // Se não, mantem a vida como 0 para nao negativar
      if (robo2.textContent <= "0") {
        quadrado4.dano = 0;
        robo2.textContent = 0;

      }

      //Adiciona 1 ao contador de colisoes
      colisoes++;

    }
  }

  function exibirQuadrados() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    for (const i in quadrados) {
      const spr = quadrados[i];
      ctx.fillStyle = spr.color;
      ctx.fillRect(spr.posX, spr.posY, spr.width, spr.height);
    }
  }

  function verificaVencendor() {
    if (colisoes === 5) {
      colisoes++;
      if (quadrado1.dano > quadrado4.dano) {
        textoVitoria.textContent = ('DEMIRVAL WINS')
        textoVitoria.classList.remove('opacity-0');
        textoVitoria.classList.add('opacity-100');

      } else if (quadrado1.dano === quadrado4.dano) {
        textoVitoria.textContent = ('EMPATE')
        textoVitoria.classList.remove('opacity-0');
        textoVitoria.classList.add('opacity-100');
      } else {
        textoVitoria.textContent = ('DOOMERVAL WINS')
        textoVitoria.classList.remove('opacity-0');
        textoVitoria.classList.add('opacity-100');
      }
      const jogarNovamente = document.querySelector('.jogarNovamente');
      jogarNovamente.classList.add('opacity-100');
      
      jogarNovamente.addEventListener('click', () => {
        
        //Reseta o jogo e faz os robos pararem de se mover
        colisoes = 0;
        moveDown = false;
        moveUp = false;
        moveLeft = false;
        moveRight = false;
        moveDown2 = false;
        moveUp2 = false;
        moveLeft2 = false;
        moveRight2 = false;

        //Reseta a posição dos robos
        quadrado1.posX = 900;
        quadrado1.posY = 200;
        quadrado4.posX = 50;
        quadrado4.posY = 200;

        //Reseta a vida dos robos
        robo1.textContent = 100;
        robo2.textContent = 100;
        quadrado1.dano = 100;
        quadrado4.dano = 100;

        //Resetar o background azul
        infoRobo1.classList.remove('text-red');
        infoRobo1.classList.add('text-light');

        infoRobo2.classList.remove('text-red');
        infoRobo2.classList.add('text-light');

        //Fazer o botão sumir
        jogarNovamente.classList.remove('opacity-100');
        textoVitoria.classList.remove('opacity-100');
        textoVitoria.classList.add('opacity-0');

      })
    }
  }

  //solicitar uma animação ao browser e chamar a função
  //que é a propria função atualizarTela
  function atualizarTela() {
    verificaVencendor();
    window.requestAnimationFrame(atualizarTela, cnv);
    if (colisoes <= 5) {
      moverQuadrados();

      if (quadrado1.dano <= 50) {
        infoRobo1.classList.remove('text-light');
        infoRobo1.classList.add('text-red');
      }

      if (quadrado4.dano <= 50) {
        infoRobo2.classList.remove('text-light');
        infoRobo2.classList.add('text-red');
      }
      exibirQuadrados();
    }

  }
  atualizarTela();

}());
