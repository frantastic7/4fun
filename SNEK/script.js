const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");


let gameOver=false;
let fX, fY;
let snekX = 5, snekY =5;
let speedX = 0, speedY = 0;
let snekBody=[];
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const updateFood = () => {
    fX = Math.floor(Math.random()*30)+1;
    fY = Math.floor(Math.random()*30)+1;
}

const over = () => {
    clearInterval(setIntervalId);
    alert("Game is over :( Press OK to play again.");
    location.reload();
}

const changeDirection = e => {
    if (e.key === "ArrowUp" && speedY !=1) 
    {
        speedX = 0;
        speedY = -1;
    }else if (e.key === "ArrowDown" && speedY !=-1) 
    {
        speedX = 0;
        speedY = 1;
    }else if (e.key === "ArrowLeft" && speedX !=1) 
    {
        speedX = -1;
        speedY = 0;
    }else if (e.key === "ArrowRight" && speedX !=-1) 
    {
        speedX = 1;
        speedY = 0;
    }
}

controls.forEach(button=> button.addEventListener("click",() => changeDirection({key:button.dataset.key})));

const initialize = () => {
    if (gameOver) return over();
    let html = `<div class="food" style="grid-area: ${fY}/${fX}"></div>`;

    if (snekX === fX && snekY === fY) {
        updateFood();
        snekBody.push([fY,fX]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score",highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score : ${highScore}`;
    }

    snekX += speedX;
    snekY += speedY

    for (let i = snekBody.length-1; i>0;i--) {
        snekBody[i]=snekBody[i-1]
    }
    snekBody[0]=[snekX,snekY]

    if (snekX <= 0 || snekX > 30 || snekY<=0 || snekY >30 ) {
        return gameOver = true;
    }
    for (let i = 0; i <snekBody.length;i++) {
        html += `<div class="head" style="grid-area: ${snekBody[i][1]}/ ${snekBody[i][0]}"></div>`
        if (i!==0 && snekBody[0][1] === snekBody[i][1] && snekBody[0][0] === snekBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = html;
}

updateFood();
setIntervalId = setInterval (initialize,100);
document.addEventListener("keyup",changeDirection);