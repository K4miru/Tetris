function _Square(vector) {
    this.position = new _Vector(0, 0);
    this.image;
    this.index;

    this.Draw = function () {
        ctx.drawImage(this.image, this.position.x, this.position.y, 50, 50);
    }

    this.SetPosition = function (x, y) {
        this.position.SetPosition(x, y);
    }

    this.GetX = function () {
        return this.position.GetX();
    }

    this.GetY = function () {
        return this.position.GetY();
    }

    this.GetIndexX = function () {
        return this.GetX() / squareSize + 1;
    }

    this.GetIndexY = function () {
        return this.GetY() / squareSize;
    }

    this.Rotate = function (angle, rotatePoint) {
        this.position.Rotate(angle, rotatePoint);
    }

    this.IsRotating = function (angle, rotatePoint) {
        var positionAfterRotation = this.position.SimulateRotation(angle, rotatePoint);
        var x = positionAfterRotation.x / squareSize;
        var y = positionAfterRotation.y / squareSize;
        if ((x > 0 && x < 8 && y < 12) && board[x][y] < bottomCollision)
            return true;
        return false;
    }

    this.IsCollidingWithBottom = function () {
        var x = this.GetIndexX();
        var y = this.GetIndexY();
        if (board[x][y + 1] > neutralNumber)
            return true;
        return false;
    }

    this.IsCollidingWithSide = function (side) {
        var x = this.GetIndexX();
        var y = this.GetIndexY();
        if (board[x + side][y] == sideCollision || board[x + side][y] > neutralNumber)
            return true;
        return false;
    }

    this.ChangeValueOnBoard = function () {
        var x = this.GetIndexX();
        var y = this.GetIndexY();
        board[x][y] = this.index;
    }

    this.Init = function (vector, image, index) {
        this.SetPosition(vector.x, vector.y);
        this.image = image;
        this.index = index;
    }

}