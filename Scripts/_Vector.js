
function _Vector(x, y) {
    this.x = x;
    this.y = y;

    this.SetX = function (x) {
        this.x = x;
    }

    this.SetY = function (y) {
        this.y = y;
    }

    this.GetX = function () {
        return this.x;
    }

    this.GetY = function () {
        return this.y;
    }

    this.SetPosition = function (x, y) {
        this.SetX(x);
        this.SetY(y);
    }

    this.SimulateRotation = function (angle, rotatePoint) {
        angle = angle * (Math.PI / 180);
        var halfSquareSize = squareSize / 2;

        
        var transalteX = this.x - rotatePoint.x + halfSquareSize;
        var transalteY = this.y - rotatePoint.y + halfSquareSize;

        var x = transalteX * Math.cos(angle) - transalteY * Math.sin(angle);
        var y = transalteX * Math.sin(angle) + transalteY * Math.cos(angle);

        x = x + rotatePoint.x - halfSquareSize;
        y = y + rotatePoint.y - halfSquareSize;

        x = Math.round(x / squareSize) * squareSize;
        y = Math.round(y / squareSize) * squareSize;

        return new _Vector(x, y);
    }

    this.Rotate = function (angle, rotatePoint) {
        angle = angle * (Math.PI / 180);
        var halfSquareSize = squareSize / 2;
        this.x = this.x - rotatePoint.x + halfSquareSize;
        this.y = this.y - rotatePoint.y + halfSquareSize;

        var x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        var y = this.x * Math.sin(angle) + this.y * Math.cos(angle);

        x = x + rotatePoint.x - halfSquareSize;
        y = y + rotatePoint.y - halfSquareSize;

        x = Math.round(x / squareSize) * squareSize;
        y = Math.round(y / squareSize) * squareSize;

        this.SetPosition(x, y);
    }
}