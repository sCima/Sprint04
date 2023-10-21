// MONTA OS QUADRADOS(ROBÔS E OBSTÁCULOS)
const quadrado = function (posX, posY, width, height, type, color, velocidade, dano) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.type = type;
    if (type === "image"){
        this.image = new Image()
        this.image.src = color;
    }
    this.velocidade = velocidade;
    this.dano = dano;
}