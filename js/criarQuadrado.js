function criarQuadrado(posX, posY, width, height, type, color, velocidade, dano) {
    const novoQuadrado = {
        posX: posX,
        posY: posY,
        width: width,
        height: height,
        type: type,
        color: color, // Cor para quadrados não baseados em imagem
        velocidade: velocidade,
        dano: dano
    };

    if (type === "image") {
        novoQuadrado.image = new Image();
        novoQuadrado.image.src = color;
    }

    return novoQuadrado;
}