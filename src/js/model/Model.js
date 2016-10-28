var Model = function () {

};

Model.CELL_SIZE = 40;
Model.BOARD_WIDTH = 400;
Model.BOARD_HEIGHT = 640;
Model.COLS = 10;
Model.ROWS = 16;
Model.STEP_DELAY = 500;
Model.ACCELERATED_SPEED = 50;
Model.EVENT_TETROMINO_CREATED = "tetrominoCreated";
Model.EVENT_LANDED_ARRAY_UPDATED = "landedArrayUpdated";

Model.prototype.accelerated = false;

Model.prototype.nextStep = function () {
    function addToLanded(tetromino, landedArray) {
        for (var i = 0; i < tetromino.shape.length; i++) {
            for (var j = 0; j < tetromino.shape[i].length; j++) {
                landedArray[tetromino.row + i][tetromino.col + j] += tetromino.shape[i][j];
            }
        }
    }

    var row = this.tetromino.row + 1;

    function removeFullLines(landedArray) {
        for (var i = 0; i < landedArray.length; i++) {
            var isFull = true;
            for (var j = 0; j < landedArray[i].length; j++) {
                if (landedArray[i][j] == 0) {
                    isFull = false;
                    break;
                }
            }
            if (isFull) {
                landedArray.splice(i, 1);
                landedArray.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            }
        }
    }

    if (!this.validatePosition(this.tetromino.col, row)) {
        addToLanded(this.tetromino, this.landedArray);
        removeFullLines(this.landedArray);
        this.tetromino = this.getRandomTetromino();
        if (!this.validatePosition()) {
            this.landedArray = this.getEmptyLandedArray();
            Model.STEP_DELAY = 1000;
        }
        document.body.dispatchEvent(new CustomEvent(Model.EVENT_TETROMINO_CREATED));
        document.body.dispatchEvent(new CustomEvent(Model.EVENT_LANDED_ARRAY_UPDATED));
    } else {
        this.tetromino.row = row;
        this.tetromino.update();
    }
};

Model.prototype.rotate = function () {
    this.tetromino.rotateRight();
    if (!this.validatePosition()) {
        this.tetromino.rotateLeft();
    }
    this.tetromino.update();
};

Model.prototype.validatePosition = function (col, row) {
    var tetromino = this.tetromino;
    if (col == undefined) {
        col = tetromino.col;
    }
    if (row == undefined) {
        row = tetromino.row;
    }
    var returnValue = row + tetromino.getHeight() < Model.ROWS + 1;
    if (returnValue && col < 0 || tetromino.getWidth() + col > Model.COLS) {
        returnValue = false;
    }
    if (returnValue) {
        for (var i = 0; i < tetromino.shape.length; i++) {
            for (var j = 0; j < tetromino.shape[i].length; j++) {
                if (this.landedArray[row + i][col + j] > 0 && tetromino.shape[i][j] > 0) {
                    returnValue = false;
                }
            }
        }
    }
    return returnValue;
};

Model.prototype.getStepDelay = function () {
    return this.accelerated ? Model.ACCELERATED_SPEED : Model.STEP_DELAY;
};

Model.prototype.speedUp = function () {
    if (Model.STEP_DELAY > 200) {
        Model.STEP_DELAY -= 1;
    }
};

Model.prototype.tetrominosList = [
    TetrominoI,
    TetrominoO,
    TetrominoS,
    TetrominoZ,
    TetrominoT,
    TetrominoL,
    TetrominoJ
];

Model.prototype.getRandomTetromino = function () {
    var index = Math.floor(Math.random() * this.tetrominosList.length);
    var constructor = this.tetrominosList[index];
    var tetromino = new constructor();
    tetromino.color = this.getColor(index);
    return tetromino;
};

Model.prototype.getColor = function (index) {
    return [0x00FFFF, 0xFFFF00, 0x32CD32, 0xFF0000, 0x551A8B, 0xFFA500, 0x0000FF][index];
};

Model.prototype.tetromino = Model.prototype.getRandomTetromino();

Model.prototype.getEmptyLandedArray = function () {
    return [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
};

Model.prototype.landedArray = Model.prototype.getEmptyLandedArray();
