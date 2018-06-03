function Square(vector) {
    this.position = new Vector(0, 0);
    this.image;
    this.index;

    this.draw = function () {
        ctx.drawImage(this.image, this.position.x, this.position.y, squareSize, squareSize);
    }

    this.setPosition = function (x, y) {
        this.position.setPosition(x, y);
    }

    this.getX = function () {
        return this.position.getX();
    }

    this.getY = function () {
        return this.position.getY();
    }

    this.getIndexX = function () {
        return this.getX() / squareSize + 1; //playable boar is from 1 to 8;
    }

    this.getIndexY = function () {
        return this.getY() / squareSize;
    }

    this.rotate = function (angle, rotatePoint) {
        this.position.rotate(angle, rotatePoint);
    }

    this.isRotating = function (angle, rotatePoint) {
        var positionAfterRotation = this.position.simulateRotation(angle, rotatePoint);
        var x = positionAfterRotation.x / squareSize;
        var y = positionAfterRotation.y / squareSize;
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
        board[x][y] = this.index;
    }

    this.init = function (vector, image, index) {
        this.setPosition(vector.x, vector.y);
        this.image = image;
        this.index = index;
    }

}