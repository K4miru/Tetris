function Block(vectors, image, index) {

    var squares = [new Square(), new Square(), new Square(), new Square()];
    var minPoint = new Vector(0, 0);
    var maxPoint = new Vector(0, 0);
    this.index = index;

    this.getIndex = function () {
        return this.index;
    }

    this.draw = function () {
        for (var i = 0; i < squares.length; i++) {
            squares[i].draw();
        }
    }

    this.init = function () {
        for (var i = 0; i < squares.length; i++) {
            squares[i].init(vectors[i], image, index);
        }
        this.draw();
    }

    this.getBoundary = function () {
        var minX = canvas.width;
        var maxX = 0;
        var minY = canvas.height;
        var maxY = 0;

        for (var i = 0; i < vectors.length; i++) {
            var x = squares[i].getX();
            var y = squares[i].getY();
            if (minX > x)
                minX = x;

            if (minY > y)
                minY = y;

            if (maxX < x)
                maxX = x;

            if (maxY < y)
                maxY = y;
        }

        minPoint.setPosition(minX, minY);
        maxPoint.setPosition(maxX, maxY);
    }

    this.getRotatePoint = function () {
        this.getBoundary();
        var rotateX = (maxPoint.getX() + squareSize - minPoint.getX()) / 2;
        var rotateY = (maxPoint.getY() + squareSize - minPoint.getY()) / 2;
        return new Vector(minPoint.getX() + rotateX, minPoint.getY() + rotateY);
    }

    this.isCollidingWithBottom = function () {
        for (var i = 0; i < squares.length; i++) {
            if (squares[i].isCollidingWithBottom())
                return true;
        }
        return false;
    }

    this.isCollidingWithSide = function (side) {
        for (var i = 0; i < squares.length; i++) {
            if (squares[i].isCollidingWithSide(side))
                return true;
        }
        return false;
    }

    this.stop = function () {
        for (var i = 0; i < squares.length; i++) {
            squares[i].changeValueOnBoard();
        }
    }

    this.rotate = function (angle) {
        var rotatePoint = this.getRotatePoint();

        for (var i = 0; i < squares.length; i++) {
            if (!squares[i].isRotating(angle, rotatePoint)) {
                return;
            }
        }

        for (var i = 0; i < squares.length; i++) {
            squares[i].rotate(angle, rotatePoint);
        }
    }

    this.move = function (side, down) {
        for (var i = 0; i < squares.length; i++) {
            var x = squares[i].getX();
            var y = squares[i].getY();
            squares[i].setPosition(x + side, y + down);
        }
    }

    this.init();

}