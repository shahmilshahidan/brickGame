const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// Attributes of game background
let x = canvas.width / 2;
let y = canvas.height - 30;
// Attributes of ball speed
let dx = 2;
let dy = -2;
// Attributes of the paddle
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth) / 2;
let rightKey = false;
let leftKey = false;
// Attributes of a brick
const brickRow = 3;
const brickCol = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
// Size of the ball
const ballRadius = 10;
// Score details
let score = brickCol * brickRow;

let bricks = [];
for(let c = 0; c < brickCol; c++){
    bricks[c] = [];
    for(let r = 0; r < brickRow; r++){
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightKey = true;
    }
    
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftKey = true;
    }
}

function keyUpHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightKey = false;
    }
    
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftKey = false;
    }
}

function collisionDetection(){
    for(let c = 0; c < brickCol; c++){
        for(let r = 0; r < brickRow; r++){
            let b = bricks[c][r];
            if(b.status == 1){
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    dy = -dy;
                    b.status = 0;
                    score--;
                    if(score == 0){
                        alert("Yeehaw!!");
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}

function drawScore(){
    ctx.font = "16px Sans Serif";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Bricks remaining: "+score, 8, 20);
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#2B65EC";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function getRandomColour(){
    const letters = "0123456789ABCDEF";
    let colour = "#";
    for (let i = 0; i < 6; i++){
        colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour;
}

function drawBricks(){
    for(let c = 0; c < brickCol; c++){
        for(let r = 0; r < brickRow; r++){
            if(bricks[c][r].status == 1){
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = getRandomColour();
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Create a drawing loop function
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawing functions goes down here
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    drawScore();
    
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx;
    }
    
    if(y + dy < ballRadius){
        dy = -dy;
    }
    else if(y + dy > canvas.height - ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            if(y = y - paddleHeight){
                dy = -dy;
            }
        }
        else{
            alert("GAME OVER!!");
            document.location.reload();
            clearInterval(interval);
        }
    }

    if(rightKey && paddleX < canvas.width - paddleWidth){
        paddleX += 5;
    }
    
    else if(leftKey && paddleX > 0){
        paddleX -= 5;
    }

    x += dx;
    y += dy;
}

let interval = setInterval(draw, 10);