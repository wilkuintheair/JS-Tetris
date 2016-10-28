var View = function (model) {
    PIXI.Sprite.call(this);

    var view = this;
    var tetrominoView;
    var landedContainer;
    var pool = new ExpandablePool(Cell);

    setupView();
    addListeners();
    setupKeyboard();
    createNewTetrominoView();

    function setupView() {
        var background = new Background(Model.BOARD_WIDTH, Model.BOARD_HEIGHT, Model.CELL_SIZE, 0x333333);
        view.addChild(background);
        landedContainer = new PIXI.Container();
        view.addChild(landedContainer);
    }

    function moveLeft() {
        var col = model.tetromino.col - 1;
        if (model.validatePosition(col)) {
            model.tetromino.col = col;
            model.tetromino.update();
        }
    }

    function moveRight() {
        var col = model.tetromino.col + 1;
        if (model.validatePosition(col)) {
            model.tetromino.col = col;
            model.tetromino.update();
        }
    }

    function createNewTetrominoView() {
        tetrominoView = new TetrominoView(model.tetromino);
        model.tetromino.update = function () {
            tetrominoView.update();
        };
        view.addChild(tetrominoView);
    }

    function redrawLanded() {
        var i;
        for (i = landedContainer.children.length - 1; i > -1; i--) {
            var child = landedContainer.getChildAt(i);
            if (child instanceof Cell) {
                pool.returnItem(child);
                landedContainer.removeChildAt(i);
            }
        }
        var array = model.landedArray;
        for (i = 0; i < array.length; i++) {
            for (var j = 0; j < array[i].length; j++) {
                if (array[i][j] > 0) {
                    createCell(j, i, landedContainer, model.getColor(array[i][j] - 1));
                }
            }
        }

        function createCell(x, y, container, color) {
            if (!color) {
                color = 0xCCCCCC;
            }
            var cell = pool.getItem();
            cell.draw(color, Model.CELL_SIZE);
            cell.x = x * Model.CELL_SIZE;
            cell.y = y * Model.CELL_SIZE;
            container.addChild(cell);
        }
    }

    function addListeners() {
        document.body.addEventListener(Model.EVENT_TETROMINO_CREATED, function () {
            model.tetromino.update = function () {
                tetrominoView.update();
            };
            tetrominoView.update(model.tetromino);
        });
        document.body.addEventListener(Model.EVENT_LANDED_ARRAY_UPDATED, function () {
            redrawLanded();
        });
    }

    function setupKeyboard() {
        var moveInterval = 0;
        var moveTimeout = 0;
        var keyboard = new Keyboard();
        keyboard.left.press = leftPressHandler;
        keyboard.left.release = clearTimeouts;
        keyboard.right.press = rightPressHandler;
        keyboard.right.release = clearTimeouts;
        keyboard.up.press = function () {
            model.rotate();
        };
        keyboard.down.press = function () {
            model.accelerated = true;
        };
        keyboard.down.release = function () {
            model.accelerated = false;
        };

        function leftPressHandler() {
            moveLeft();
            clearTimeouts();
            moveTimeout = setTimeout(function () {
                moveInterval = setInterval(function () {
                    moveLeft();
                }, 100);
            }, 250);
        }

        function rightPressHandler() {
            moveRight();
            clearTimeouts();
            moveTimeout = setTimeout(function () {
                moveInterval = setInterval(function () {
                    moveRight();
                }, 100);
            }, 250);
        }

        function clearTimeouts() {
            clearInterval(moveInterval);
            clearTimeout(moveTimeout);
        }
    }
};

View.prototype = Object.create(PIXI.Sprite.prototype);
View.prototype.constructor = View;
