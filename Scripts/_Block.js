function _Block(vectors, image, index) {

    this.squares = [new _Square(), new _Square(), new _Square(), new _Square()];
    this.minPoint = new _Vector(0, 0);
    this.maxPoint = new _Vector(0, 0);
    this.index = index;

    this.GetIndex = function () {
        return this.index;
    }

    this.Draw = function () {
        for (var i = 0; i < this.squares.length; i++) {
            this.squares[i].Draw();
        }
    }

    this.Init = function () {
        for (var i = 0; i < this.squares.length; i++) {
            this.squares[i].Init(vectors[i], image, index);
        }
        this.Draw();
    }

    this.GetBoundary = function () {
        var minX = canvas.width;
        var maxX = 0;
        var minY = canvas.height;
        var maxY = 0;

        for (var i = 0; i < vectors.length; i++) {
            var x = this.squares[i].GetX();
            var y = this.squares[i].GetY();
            if (minX > x)
                minX = x;

            if (minY > y)
                minY = y;

            if (maxX < x)
                maxX = x;

            if (maxY < y)
                maxY = y;
        }

        this.minPoint.SetPosition(minX, minY);
        this.maxPoint.SetPosition(maxX, maxY);
    }

    this.GetRotatePoint = function () {
        this.GetBoundary();
        var rotateX = (this.maxPoint.GetX() + squareSize - this.minPoint.GetX()) / 2;
        var rotateY = (this.maxPoint.GetY() + squareSize - this.minPoint.GetY()) / 2;
        return new _Vector(this.minPoint.GetX() + rotateX, this.minPoint.GetY() + rotateY);
    }

    this.IsCollidingWithBottom = function () {
        for (var i = 0; i < this.squares.length; i++) {
            if (this.squares[i].IsCollidingWithBottom())
                return true;
        }
        return false;
    }

    this.IsCollidingWithSide = function (side) {
        for (var i = 0; i < this.squares.length; i++) {
            if (this.squares[i].IsCollidingWithSide(side))
                return true;
        }
        return false;
    }

    this.Stop = function () {
        for (var i = 0; i < this.squares.length; i++) {
            this.squares[i].ChangeValueOnBoard();
        }
    }

    this.Rotate = function (angle) {
        var rotatePoint = this.GetRotatePoint();

        for (var i = 0; i < this.squares.length; i++) {
            if (!this.squares[i].IsRotating(angle, rotatePoint)) {
                return;
            }
        }

        for (var i = 0; i < this.squares.length; i++) {
            this.squares[i].Rotate(angle, rotatePoint);
        }
    }

    this.Move = function (side, down) {
        for (var i = 0; i < this.squares.length; i++) {
            var x = this.squares[i].GetX();
            var y = this.squares[i].GetY();
            this.squares[i].SetPosition(x + side, y + down);
        }
    }

    this.Init();

}