//0 = verde
//1 = vermelho
//2 = amarelo
//3 = azul
const start = document.querySelector('.start');
const points = document.querySelector('.points');
const game_over = document.querySelector('.game-over');
const blue = document.querySelector('.blue');
const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');

let order = [];
let clickedOrder = [];
let nivel = 1;
let score = 0;

//cria ordem aleatória de cores
function shuffleOrder() {
    let colorOrder = Math.floor(Math.random() * 4);

    order[order.length] = colorOrder;

    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);

        lightColor(elementColor, (Number(i) + 1));
    }
}
//acende a próxima cor
function lightColor(element, number) {
    number = number * 1100;

    setTimeout(() => {
        element.classList.add('selected');
        
    }, number - 550);

    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
}
//checa se os botões clicados são os mesmos da ordem gerada no jogo
function checkOrder() {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        nextLevel();
    }
    
}
//click do usuário
function click(color) {
    clickedOrder[clickedOrder.length] = color;

    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();

    }, 250);
}
//retorna a cor selecionada
function createColorElement(color) {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if(color == 2) {
        return yellow;
    } else if(color == 3) {
        return blue;
    }
}
//próximo nível
function nextLevel() {
    nivel++;
    score = (score + 50) * nivel;

    points.innerHTML = `Nível ${nivel}`;
    shuffleOrder();
}
//perdeu o jogo
function gameOver() {    
    points.style.display = "none";
    game_over.style.display = "block";
    game_over.innerHTML = 'GAME OVER';
    setTimeout(() => {
        game_over.innerHTML = `Pontuação: ${score}`;
    },2000);

    setTimeout(() => {
        game_over.innerHTML = 'Reiniciando...'
    }, 4000);

    setTimeout(() => {
        location.reload();
    }, 6000);
}

function playGame() { 
    nivel = 1;
    score = 0;
    order = [];
    clickedOrder = [];
    start.style.display = "none";
    points.style.display = "block";
    points.innerHTML = `Nível ${nivel}`
    shuffleOrder();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);
