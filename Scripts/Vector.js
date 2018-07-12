
function Vector(setX, setY) {
    var x = setX;
    var y = setY;

    this.setX = function (setX) {
        x = setX;
    }

    this.setY = function (setY) {
        y = setY;
    }

    this.getX = function () {
        return x;
    }

    this.getY = function () {
        return y;
    }

    this.setPosition = function (x, y) {
        this.setX(x);
        this.setY(y);
    }

    this.simulateRotation = function (angle, rotatePoint) {
        angle = angle * (Math.PI / 180);
        var halfSquareSize = squareSize / 2;


        var translateX = x - rotatePoint.getX() + halfSquareSize;
        var translateY = y - rotatePoint.getY() + halfSquareSize;

        var probablyX = translateX * Math.cos(angle) - translateY * Math.sin(angle);
        var probablyY = translateX * Math.sin(angle) + translateY * Math.cos(angle);

        probablyX = probablyX + rotatePoint.getX()- halfSquareSize;
        probablyY = probablyY + rotatePoint.getY()- halfSquareSize;

        probablyX = Math.round(probablyX / squareSize) * squareSize;
        probablyY = Math.round(probablyY / squareSize) * squareSize;

        return new Vector(probablyX, probablyY);
    }

    this.rotate = function (angle, rotatePoint) {
        var positionAfterRotation = this.simulateRotation(angle, rotatePoint);

        this.setPosition(positionAfterRotation.getX(), positionAfterRotation.getY());
    }
}