function Block(vectors, image, index) {

    this.squares = [new Square(), new Square(), new Square(), new Square()];
    this.minPoint = new Vector(0, 0);
    this.maxPoint = new Vector(0, 0);
    this.index = index;

    this.getIndex = function () {
        return this.index;
    }

    this.draw = function () {
        for (var i = 0; i < this.squares.length; i++) {
            this.squares[i].draw();
        }
    }

    this.init = function () {
        for (var i = 0; i < this.squares.length; i++) {
            this.squares[i].init(vectors[i], image, index);
        }
        this.draw();
    }

    this.getBoundary = function () {
        var minX = canvas.width;
        var maxX = 0;
        var minY = canvas.height;
        var maxY = 0;

        for (var i = 0; i < vectors.length; i++) {
            var x = this.squares[i].getX();
            var y = this.squares[i].getY();
            if (minX > x)
                minX = x;

            if (minY > y)
                minY = y;

            if (maxX < x)
                maxX = x;

            if (maxY < y)
                maxY = y;
        }

        this.minPoint.setPosition(minX, minY);
        this.maxPoint.setPosition(maxX, maxY);
    }

    this.getRotatePoint = function () {
        this.getBoundary();
        var rotateX = (this.maxPoint.getX() + squareSize - this.minPoint.getX()) / 2;
        var rotateY = (this.maxPoint.getY() + squareSize - this.minPoint.getY()) / 2;
        return new Vector(this.minPoint.getX() + rotateX, this.minPoint.getY() + rotateY);
    }

    this.isCollidingWithBottom = function () {
        for (var i = 0; i < this.squares.length; i++) {
            if (this.squares[i].isCollidingWithBottom())
                return true;
        }
        return false;
    }

    this.isCollidingWithSide = function (side) {
        for (var i = 0; i < this.squares.length; i++) {
            if (this.squares[i].isCollidingWithSide(side))
                return true;
        }
        return false;
    }

    this.stop = function () {
        for (var i = 0; i < this.squares.length; i++) {
            this.squares[i].changeValueOnBoard();
        }
    }

    this.rotate = function (angle) {
        var rotatePoint = this.getRotatePoint();

        for (var i = 0; i < this.squares.length; i++) {
            if (!this.squares[i].isRotating(angle, rotatePoint)) {
                return;
            }
        }

        for (var i = 0; i < this.squares.length; i++) {
            this.squares[i].rotate(angle, rotatePoint);
        }
    }

    this.move = function (side, down) {
        for (var i = 0; i < this.squares.length; i++) {
            var x = this.squares[i].getX();
            var y = this.squares[i].getY();
            this.squares[i].setPosition(x + side, y + down);
        }
    }

    this.init();

}