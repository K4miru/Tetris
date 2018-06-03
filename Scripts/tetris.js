var canvas, ctx;
var squareSize = 50;
var selectedBlock, nextBlock;
var sideCollision = -2;
var bottomCollision = 0; //0-6 - index of block
var neutralNumber = -1;

var vectors = [
    [new _Vector(100, -50), new _Vector(150, -50), new _Vector(150, -100), new _Vector(200, -100)],
    [new _Vector(100, -50), new _Vector(150, -50), new _Vector(200, -50), new _Vector(250, -50)],
    [new _Vector(100, -50), new _Vector(150, -50), new _Vector(100, -100), new _Vector(150, -100)],
    [new _Vector(100, -50), new _Vector(150, -50), new _Vector(200, -50), new _Vector(100, -100)],
    [new _Vector(100, -50), new _Vector(150, -50), new _Vector(200, -50), new _Vector(200, -100)],
    [new _Vector(100, -50), new _Vector(150, -50), new _Vector(200, -50), new _Vector(150, -100)],
    [new _Vector(100, -100), new _Vector(150, -100), new _Vector(150, -50), new _Vector(200, -50)]
]
var board = [];
var score = 0;
var addScore = 100;
var gameInterval;

var image = [
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image()
]

image[0].src = "images/square0.png";
image[1].src = "images/square1.png";
image[2].src = "images/square2.png";
image[3].src = "images/square3.png";
image[4].src = "images/square4.png";
image[5].src = "images/square5.png";
image[6].src = "images/square6.png";

function Control(e) {
    var moveVector = new _Vector(0,0); 
    //console.log(e.keyCode);
    switch(e.keyCode) {
        case 87:
        case 38:
            Rotate();
            break;
        case 68:
        case 39:
            moveVector.SetX(1); //move right
            break;
        case 65:
        case 37:
            moveVector.SetX(-1); //move left
            break;
        case 83:
        case 40:
            moveVector.SetY(1); //move down
            break;
    }
    Move(moveVector.GetX(), moveVector.GetY());
}

function Rotate() {
    selectedBlock.Rotate(90);
    DrawOnCanvas();
}

function Move(side, down) {
    if (!selectedBlock.IsCollidingWithBottom()) {
        if (side != 0 && selectedBlock.IsCollidingWithSide(side))
            side = 0; //prevent moving outside box
        selectedBlock.Move(side * squareSize, down * squareSize);
        DrawOnCanvas();
    } else {
        StopBlock();
    }
}

function StopBlock() {
    selectedBlock.Stop();
    CheckCanvas();
    var index = nextBlock.GetIndex();
    selectedBlock = new _Block(vectors[index], image[index], index);
    nextBlock = RandomBlock();
    nextBlock.Move(400, 250);
}

function DrawOnCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Separate canvas
    ctx.beginPath();
    ctx.moveTo(400, 0);
    ctx.lineTo(400, canvas.height);
    ctx.stroke();

    DrawScore();

    //Draw blocks
    selectedBlock.Draw();
    nextBlock.Draw();
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var valueOnBoard = board[i][j];
            if (valueOnBoard > neutralNumber)
                ctx.drawImage(image[valueOnBoard], (i - 1) * squareSize, j * squareSize, squareSize, squareSize);
        }
    }
}

function DrawScore() {
    ctx.font = "50px Georgia";
    ctx.fillText(score, 500, 75);
}

function CheckCanvas() {
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
            StopGame();
    }
}

function StopGame() {
    clearInterval(gameInterval);
    ctx.font = "40px Georgia";
    ctx.fillText("GAME OVER", 450, 500);
    document.removeEventListener("keydown", Control, false);
}

function RandomBlock() {
    var index = Math.floor(Math.random() * vectors.length);
    return new _Block(vectors[index], image[index], index);
}

function PrepareBoard() {
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

function Init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    PrepareBoard();

    selectedBlock = RandomBlock();
    nextBlock = RandomBlock();
    nextBlock.Move(8 * squareSize, 5 * squareSize);
    DrawOnCanvas();

    ctx.font = "30px Georgia";
    ctx.fillText("PRESS ANY KEY", 450, 500);

    document.addEventListener("keydown", Tetris, false);
}

function Tetris() {
    document.removeEventListener("keydown", Tetris, false);
    document.addEventListener("keydown", Control, false);

    //Falling Down
    gameInterval = setInterval(function () {
        var vectorDown = new _Vector(0, 1);
        Move(vectorDown.GetX(), vectorDown.GetY());
    }, 1000);
}