const board_border = 'rgb(238, 36, 69)';
const board_background = 'rgb(34, 35, 36)';
const snake_col = 'rgb(238, 36, 69)';
const snake_border = 'rgb(238, 36, 69)';
const food_background = 'rgb(235, 196, 26)';
const food_border = 'black';

let snake = [
  {x: 100, y: 100},
]

const board = document.getElementById("SnakeGameBoard");
const board_ctx = board.getContext("2d");

function clearCanvas() {
  board_ctx.fillStyle = board_background;
  board_ctx.strokestyle = board_border;
  board_ctx.lineWidth = 0;
  board_ctx.fillRect(0, 0, board.width, board.height);
  board_ctx.strokeRect(0, 0, board.width, board.height);
}

function drawSnake() {
  snake.forEach(drawSnakePart)
}

function drawSnakePart(snakePart) {
  board_ctx.fillStyle = snake_col;
  board_ctx.strokestyle = snake_border;
  board_ctx.lineWidth = 1;
  board_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  board_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}


var dx=10;
var dy=0;
var score = 0;
var high_score = 0;
function move_snake() {
    dx = ndx.shift();
    dy = ndy.shift();
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    const has_eaten_food = snake[0].x === foodx && snake[0].y === foody;
    if(has_eaten_food) {
        score+=10;
        UpdateScore();
        UpdateHighScore();
        genFood();
    } else {
        snake.pop();
    }
}

main();
genFood();
function main() {
    if(hasGameEnded()) {
        UDied();
        return;
    }
    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        move_snake();
        drawSnake();
        main();
    },140);
}

function UDied() {
    snake = [{x: 100, y: 100}];
    score = 0;
    document.getElementById("Score").innerHTML = "Score: ";
    genFood();
    drawFood();
    main();
}

function UpdateScore() {
    document.getElementById("Score").innerHTML = "Score: "+score;
}

function UpdateHighScore() {
    if(score>high_score) {
        high_score = score;
        document.getElementById("HScore").innerHTML = "High Score: <lb></lb>"+high_score;;
    }
}

var ndx = [10];
var ndy = [0];

document.addEventListener("keydown", change_direction)
function change_direction(event) {
    const LeftKey=37;
    const RightKey=39;
    const UpKey=38;
    const DownKey=40;

    const A=65;
    const D=68;
    const W=87;
    const S=83;

    const KeyPressed = event.keyCode;
    const goUp = dy === -10;
    const goDown = dy === 10;
    const goRight = dx === 10;  
    const goLeft = dx === -10;

   if((KeyPressed ===LeftKey||KeyPressed ===A) && !goRight) {
        ndx.push(-10);
        ndy.push(0);
    }
   if((KeyPressed ===UpKey||KeyPressed ===W) && !goDown) {
        ndx.push(0);
        ndy.push(-10);
    }
    if((KeyPressed ===RightKey||KeyPressed ===D) && !goLeft) {
        ndx.push(10);
        ndy.push(0);
    }
    if((KeyPressed ===DownKey||KeyPressed ===S) && !goUp) {
        ndx.push(0);
        ndy.push(10);
    }
}

function hasGameEnded() {
    for(let i = 4; i<snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        {
            return true;
        }
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > board.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > board.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function randomFood(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

var foodx;
var foody;
function genFood() {
    foodx = randomFood(0, board.width-10);
    foody = randomFood(0, board.height-10);
    snake.forEach(
        function hasEatenFood(part) {
            const hasEaten = part.x === foodx && part.y === foody;
            if(hasEaten) genFood();
        }
    );
}

function drawFood() {
    board_ctx.fillStyle = food_background;
    board_ctx.strokestyle = food_border;
    board_ctx.lineWidth = 1;
    board_ctx.fillRect(foodx, foody, 10, 10);
    board_ctx.strokeRect(foodx, foody, 10, 10);
}
