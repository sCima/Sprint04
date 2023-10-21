(function () {
    const cnv = document.querySelector('#canvas');
    const ctx = cnv.getContext('2d');
    const audioContext = new(window.AudioContext || window.webkitAudioContext)();

    let attackSoundBuffer;
    let hitSoundBuffer;

    // Movimentos
    let moveLeft = false;
    let moveUp = false;
    let moveRight = false;
    let moveDown = false;

    let moveLeft2 = false;
    let moveUp2 = false;
    let moveRight2 = false;
    let moveDown2 = false;

    let colisoes = 0;

    // hp dos robôs
    const robo1 = document.querySelector('.hpRobo1');
    const robo2 = document.querySelector('.hpRobo2');

    // barra de informações dos robôs
    const infoRobo1 = document.querySelector('#infoRobo1');
    const infoRobo2 = document.querySelector('#infoRobo2');

    // mensagem de vitória
    const textoVitoria = document.querySelector('#vitoria');

    // arrays
    const quadrados = []; // Armazena os quadrados

    // Adicione os caminhos corretos para as imagens
    const image1 = "../images/doomirval-pixel.png";
    const image2 = "../images/demirval-pixel.png";

    // Crie os quadrados
    const quadrado1 = criarQuadrado(900, 210, 100, 100, "image", image1, 5, 100);
    const quadrado4 = criarQuadrado(50, 210, 100, 100, "image", image2, 5, 100);

    // Adicione os quadrados ao array
    quadrados.push(quadrado1);
    quadrados.push(quadrado4);

    function carregarImagens() {
      const imagens = [quadrado1, quadrado4];
      let imagensCarregadas = 0;

      imagens.forEach((quadrado) => {
        if (quadrado.type === "image") {
          quadrado.image.onload = () => {
            imagensCarregadas++;
            if (imagensCarregadas === imagens.length) {
              atualizarTela();
            }
          };
          quadrado.image.src = quadrado.color;
        }
      });
    }

    carregarImagens();

  // Carregamento de áudio (supondo que você já tenha os arquivos de áudio no local certo)
  async function loadSound(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await audioContext.decodeAudioData(arrayBuffer);
  }

  loadSound('../sound/som.mp3').then(buffer => {
    hitSoundBuffer = buffer;
  });

  // Função para reproduzir o som
  function playHitSound() {
    const source = audioContext.createBufferSource();
    source.buffer = hitSoundBuffer;
    source.connect(audioContext.destination);
    source.start(0);
  }

  // Função para detectar colisões
  function colisao(a, b) {
    return (
      a.posX < b.posX + b.width &&
      a.posX + a.width > b.posX &&
      a.posY < b.posY + b.height &&
      a.posY + a.height > b.posY
    );
  }

  // Função para verificar o vencedor
  function verificaVencendor() {
    if (colisoes === 5) {
      colisoes++;
      if (quadrado1.dano > quadrado4.dano) {
        textoVitoria.textContent = ('DEMIRVAL WINS')

      } else if (quadrado1.dano === quadrado4.dano) {
        textoVitoria.textContent = ('EMPATE')

      } else {
        textoVitoria.textContent = ('DOOMIRVAL WINS')

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
        textoVitoria.textContent = ('X')

      })
    }
  }

   // Pressionar as teclas do robô 1
   window.addEventListener('keydown', function (e) {
     const nomeKey = e.key;
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
     }
   });

   // Soltar as teclas do robô 1
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
     }
   });

   // Pressionar as teclas do robô 2
   window.addEventListener('keydown', function (e) {
     const nomeKey = e.key;
     switch (nomeKey) {
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

   // Soltar as teclas do robô 2
   window.addEventListener('keyup', (e) => {
     const key = e.key;
     switch (key) {
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
  // Função para mover os quadrados
  function moverQuadrados() {
    if (moveLeft2) {
      quadrado4.posX -= quadrado4.velocidade;
    }
    if (moveRight2) {
      quadrado4.posX += quadrado4.velocidade;
    }
    if (moveUp2) {
      quadrado4.posY -= quadrado4.velocidade;
    }
    if (moveDown2) {
      quadrado4.posY += quadrado4.velocidade;
    }

    if (moveLeft) {
      quadrado1.posX -= quadrado1.velocidade;
    }
    if (moveRight) {
      quadrado1.posX += quadrado1.velocidade;
    }
    if (moveUp) {
      quadrado1.posY -= quadrado1.velocidade;
    }
    if (moveDown) {
      quadrado1.posY += quadrado1.velocidade;
    }

    // Fixar na tela - NÃO SAI DO CANVAS
    quadrado1.posX = Math.max(0, Math.min(cnv.width - quadrado1.width, quadrado1.posX));
    quadrado1.posY = Math.max(0, Math.min(cnv.height - quadrado1.height, quadrado1.posY));

    quadrado4.posX = Math.max(0, Math.min(cnv.width - quadrado4.width, quadrado4.posX));
    quadrado4.posY = Math.max(0, Math.min(cnv.height - quadrado4.height, quadrado4.posY));

    if (colisao(quadrado1, quadrado4)) {
      quadrado1.posX += (quadrado4.posX - quadrado1.posX) * -1.5;
      quadrado1.posY += (quadrado4.posY - quadrado1.posY) * -1.5;

      quadrado4.posX += (quadrado1.posX - quadrado4.posX) * -1.5;
      quadrado4.posY += (quadrado1.posY - quadrado4.posY) * -1.5;

      playHitSound();

      // Se houver mais de "0" de vida, calcula o dano
      if (robo1.textContent >= "0") {
        quadrado1.dano -= Math.round(Math.random() * 20);
        robo1.textContent = quadrado1.dano;
      }
      // Se não, mantém a vida como 0 para não negativar
      if (robo1.textContent <= "0") {
        quadrado1.dano = 0;
        robo1.textContent = 0;
      }

      // Se houver mais de "0" de vida, calcula o dano
      if (robo2.textContent >= "0") {
        quadrado4.dano -= Math.round(Math.random() * 20);
        robo2.textContent = quadrado4.dano;
      }
      // Se não, mantém a vida como 0 para não negativar
      if (robo2.textContent <= "0") {
        quadrado4.dano = 0;
        robo2.textContent = 0;
      }

      // Adiciona 1 ao contador de colisões
      colisoes++;
    }
  }

  // Função para exibir os quadrados
  function exibirQuadrados() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    for (const i in quadrados) {
      const spr = quadrados[i];
      ctx.fillStyle = spr.color;
      if (spr.type === "image" && spr.image.complete) {
        ctx.drawImage(spr.image, spr.posX, spr.posY, spr.width, spr.height);
      } else {
        ctx.fillRect(spr.posX, spr.posY, spr.width, spr.height);
      }
    }
  }

  // Solicitar uma animação ao navegador e chamar a função atualizarTela
  function atualizarTela() {
    verificaVencendor();
    window.requestAnimationFrame(atualizarTela, cnv);
    if (colisoes <= 5) {
      moverQuadrados();
      exibirQuadrados();
    }
  }

  atualizarTela();
})();
