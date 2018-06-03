var canvas, ctx;
const squareSize = 50;
var selectedBlock, nextBlock;
const sideCollision = -2;
const bottomCollision = 0; //0-6 - index of block
const neutralNumber = -1;

const vectors = [
    [new Vector(100, -50), new Vector(150, -50), new Vector(150, -100), new Vector(200, -100)],
    [new Vector(100, -50), new Vector(150, -50), new Vector(200, -50), new Vector(250, -50)],
    [new Vector(100, -50), new Vector(150, -50), new Vector(100, -100), new Vector(150, -100)],
    [new Vector(100, -50), new Vector(150, -50), new Vector(200, -50), new Vector(100, -100)],
    [new Vector(100, -50), new Vector(150, -50), new Vector(200, -50), new Vector(200, -100)],
    [new Vector(100, -50), new Vector(150, -50), new Vector(200, -50), new Vector(150, -100)],
    [new Vector(100, -100), new Vector(150, -100), new Vector(150, -50), new Vector(200, -50)]
]
var board = [];
var score = 0;
const addScore = 100;
var gameInterval;

var images = [
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image()
]

images[0].src = "images/square0.png";
images[1].src = "images/square1.png";
images[2].src = "images/square2.png";
images[3].src = "images/square3.png";
images[4].src = "images/square4.png";
images[5].src = "images/square5.png";
images[6].src = "images/square6.png";

function control(e) {
    var moveVector = new Vector(0,0); 
    switch(e.keyCode) {
        case 87:
        case 38:
            rotate();
            break;
        case 68:
        case 39:
            moveVector.setX(1); //move right
            break;
        case 65:
        case 37:
            moveVector.setX(-1); //move left
            break;
        case 83:
        case 40:
            moveVector.setY(1); //move down
            break;
    }
    move(moveVector.getX(), moveVector.getY());
}

function rotate() {
    selectedBlock.rotate(90);
    drawOnCanvas();
}

function move(side, down) {
    if (!selectedBlock.isCollidingWithBottom()) {
        if (side != 0 && selectedBlock.isCollidingWithSide(side))
            side = 0; //prevent moving outside box
        selectedBlock.move(side * squareSize, down * squareSize);
        drawOnCanvas();
    } else {
        stopBlock();
    }
}

function stopBlock() {
    selectedBlock.stop();
    checkCanvas();
    var index = nextBlock.getIndex();
    selectedBlock = new Block(vectors[index], images[index], index);
    nextBlock = randomBlock();
    nextBlock.move(400, 250); //move block to preview next one on the right side
}

function drawOnCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Separate canvas
    ctx.beginPath();
    ctx.moveTo(400, 0);
    ctx.lineTo(400, canvas.height);
    ctx.stroke();

    drawScore();

    //Draw blocks
    selectedBlock.draw();
    nextBlock.draw();
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var valueOnBoard = board[i][j];
            if (valueOnBoard > neutralNumber)
                ctx.drawImage(images[valueOnBoard], (i - 1) * squareSize, j * squareSize, squareSize, squareSize);
        }
    }
}

function drawScore() {
    ctx.font = "50px Georgia";
    ctx.fillText(score, 500, 75);
}

function checkCanvas() {
    for (var i = 0; i < 12; i++) {
        var lines = 0;
        for (var j = 1; j < 9; j++) {
            if (board[j][i] > neutralNumber)
                lines += 1;
        }
        if (lines == 8) {
            score += addScore;
            for (var j = 1; j < 9; j++) {
                board[j].splice(i, 1);
                board[j].splice(0, 0, neutralNumber);
            }
        }
    }

    for (var j = 1; j < 9; j++) {
        if (board[j][0] > neutralNumber)
            stopGame();
    }
}

function stopGame() {
    clearInterval(gameInterval);
    ctx.font = "40px Georgia";
    ctx.fillText("GAME OVER", 450, 500);
    document.removeEventListener("keydown", control, false);
}

function randomBlock() {
    var index = Math.floor(Math.random() * vectors.length);
    return new Block(vectors[index], images[index], index);
}

function prepareBoard() {
    board = new Array(10);
    for (var i = 0; i < board.length; i++) {
        board[i] = new Array(13);
        for (var j = 0; j < board[i].length; j++) {
            board[i][j] = neutralNumber;
        }
    }
    for (var i = 0; i < board.length; i++) {
        board[i][12] = bottomCollision;
    }
    for (var i = 0; i < board[0].length; i++) {
        board[0][i] = sideCollision;
        board[9][i] = sideCollision;
    }
}

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    prepareBoard();

    selectedBlock = randomBlock();
    nextBlock = randomBlock();
    nextBlock.move(8 * squareSize, 5 * squareSize);
    drawOnCanvas();

    ctx.font = "30px Georgia";
    ctx.fillText("PRESS ANY KEY", 450, 500);

    document.addEventListener("keydown", tetris, false);
}

function tetris() {
    document.removeEventListener("keydown", tetris, false);
    document.addEventListener("keydown", control, false);

    //Falling Down
    gameInterval = setInterval(function () {
        var vectorDown = new Vector(0, 1);
        move(vectorDown.getX(), vectorDown.getY());
    }, 1000);
}