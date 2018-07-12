function Square(vector) {
    var position = new Vector(0, 0);
    var image;
    var index;

    this.draw = function () {
        ctx.drawImage(image, position.getX(), position.getY(), squareSize, squareSize);
    }

    this.setPosition = function (x, y) {
        position.setPosition(x, y);
    }

    this.getX = function () {
        return position.getX();
    }

    this.getY = function () {
        return position.getY();
    }

    this.getIndexX = function () {
        return this.getX() / squareSize + 1; //playable boar is from 1 to 8;
    }

    this.getIndexY = function () {
        return this.getY() / squareSize;
    }

    this.rotate = function (angle, rotatePoint) {
        position.rotate(angle, rotatePoint);
    }

    this.isRotating = function (angle, rotatePoint) {
        var positionAfterRotation = position.simulateRotation(angle, rotatePoint);
        var x = positionAfterRotation.getX() / squareSize;
        var y = positionAfterRotation.getY() / squareSize;
        if (x > 0 && x < 8 && y < 12 && board[x][y] < bottomCollision) //playable boar is from 1 to 8 for x and to 12 for y;
            return true;
        return false;
    }

    this.isCollidingWithBottom = function () {
        var x = this.getIndexX();
        var y = this.getIndexY();
        if (board[x][y + 1] > neutralNumber)
            return true;
        return false;
    }

    this.isCollidingWithSide = function (side) {
        var x = this.getIndexX();
        var y = this.getIndexY();
        if (board[x + side][y] == sideCollision || board[x + side][y] > neutralNumber)
            return true;
        return false;
    }

    this.changeValueOnBoard = function () {
        var x = this.getIndexX();
        var y = this.getIndexY();
        board[x][y] = index;
    }

    this.init = function (vector, setImage, setIndex) {
        this.setPosition(vector.getX(), vector.getY());
        image = setImage;
        index = setIndex;
    }

}