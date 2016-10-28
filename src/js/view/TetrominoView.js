var TetrominoView = function (tetrominoModel) {
    PIXI.Sprite.call(this);
    this.tetrominoModel = tetrominoModel;
    this.modelRotation = tetrominoModel.rotation;
    this.cells = [new Cell(), new Cell(), new Cell(), new Cell()];
    this.addChild(this.cells[0]);
    this.addChild(this.cells[1]);
    this.addChild(this.cells[2]);
    this.addChild(this.cells[3]);
    this.redraw();
    this.update();
};

TetrominoView.prototype = Object.create(PIXI.Sprite.prototype);
TetrominoView.constructor = TetrominoView;

TetrominoView.prototype.redraw = function () {
    var cellIndex = 0;
    for (var i = 0; i < this.tetrominoModel.shape.length; i++) {
        for (var j = 0; j < this.tetrominoModel.shape[i].length; j++) {
            if (this.tetrominoModel.shape[i][j] > 0) {
                var cell = this.cells[cellIndex++];
                cell.draw(this.tetrominoModel.color, Model.CELL_SIZE);
                cell.x = j * Model.CELL_SIZE;
                cell.y = i * Model.CELL_SIZE;
            }
        }
    }
};

TetrominoView.prototype.update = function (tetrominoModel) {
    if (tetrominoModel) {
        this.tetrominoModel = tetrominoModel;
    }
    this.x = this.tetrominoModel.col * Model.CELL_SIZE;
    this.y = this.tetrominoModel.row * Model.CELL_SIZE;
    if (tetrominoModel || this.modelRotation != this.tetrominoModel.rotation) {
        this.modelRotation = this.tetrominoModel.rotation;
        this.redraw();
    }
};
