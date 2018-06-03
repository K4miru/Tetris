
function Vector(x, y) {
    this.x = x;
    this.y = y;

    this.setX = function (x) {
        this.x = x;
    }

    this.setY = function (y) {
        this.y = y;
    }

    this.getX = function () {
        return this.x;
    }

    this.getY = function () {
        return this.y;
    }

    this.setPosition = function (x, y) {
        this.setX(x);
        this.setY(y);
    }

    this.simulateRotation = function (angle, rotatePoint) {
        angle = angle * (Math.PI / 180);
        var halfSquareSize = squareSize / 2;

        
        var translateX = this.x - rotatePoint.x + halfSquareSize;
        var translateY = this.y - rotatePoint.y + halfSquareSize;

        var x = translateX * Math.cos(angle) - translateY * Math.sin(angle);
        var y = translateX * Math.sin(angle) + translateY * Math.cos(angle);

        x = x + rotatePoint.x - halfSquareSize;
        y = y + rotatePoint.y - halfSquareSize;

        x = Math.round(x / squareSize) * squareSize;
        y = Math.round(y / squareSize) * squareSize;

        return new Vector(x, y);
    }

    this.rotate = function (angle, rotatePoint) {
        var positionAfterRotation = this.simulateRotation(angle, rotatePoint);

        this.setPosition(positionAfterRotation.x, positionAfterRotation.y);
    }
}