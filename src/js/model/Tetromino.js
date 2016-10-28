var Tetromino = function () {

};

Tetromino.prototype.shape = undefined;
Tetromino.prototype.update = undefined;
Tetromino.prototype.rotations = undefined;
Tetromino.prototype.color = 0xCCCCCC;
Tetromino.prototype.col = 4;
Tetromino.prototype.row = 0;
Tetromino.prototype.rotation = 0;
Tetromino.prototype.getWidth = function () {
    return this.shape[0].length;
};
Tetromino.prototype.getHeight = function () {
    return this.shape.length;
};
Tetromino.prototype.getLeft = function () {
    return this.col;
};
Tetromino.prototype.getRight = function () {
    return this.col + this.getWidth();
};
Tetromino.prototype.getTop = function () {
    return this.row;
};
Tetromino.prototype.getBottom = function () {
    return this.row + this.getHeight();
};
Tetromino.prototype.rotateRight = function () {
    this.rotation = (this.rotation + 1) % this.rotations.length;
    this.shape = this.rotations[this.rotation];
};
Tetromino.prototype.rotateLeft = function () {
    var n = this.rotations.length;
    this.rotation = (n + this.rotation - 1) % n;
    this.shape = this.rotations[this.rotation];
};

var TetrominoI = function () {
    Tetromino.call(this);
    this.rotations = [
        [
            [1],
            [1],
            [1],
            [1]
        ],
        [
            [1, 1, 1, 1]
        ]
    ];
    this.shape = this.rotations[0];
};

TetrominoI.prototype = Object.create(Tetromino.prototype);
TetrominoI.prototype.constructor = TetrominoI;

var TetrominoO = function () {
    Tetromino.call(this);
    this.rotations = [
        [
            [2, 2],
            [2, 2]
        ]
    ];
    this.shape = this.rotations[0];
};

TetrominoO.prototype = Object.create(Tetromino.prototype);
TetrominoO.prototype.constructor = TetrominoO;

var TetrominoS = function () {
    Tetromino.call(this);
    this.rotations = [
        [
            [0, 3, 3],
            [3, 3, 0]
        ],
        [
            [3, 0],
            [3, 3],
            [0, 3]
        ]
    ];
    this.shape = this.rotations[0];
};

TetrominoS.prototype = Object.create(Tetromino.prototype);
TetrominoS.prototype.constructor = TetrominoS;

var TetrominoZ = function () {
    Tetromino.call(this);
    this.rotations = [
        [
            [4, 4, 0],
            [0, 4, 4]
        ],
        [
            [0, 4],
            [4, 4],
            [4, 0]
        ]
    ];
    this.shape = this.rotations[0];
};

TetrominoZ.prototype = Object.create(Tetromino.prototype);
TetrominoZ.prototype.constructor = TetrominoZ;

var TetrominoT = function () {
    Tetromino.call(this);
    this.rotations = [
        [
            [5, 5, 5],
            [0, 5, 0]
        ],
        [
            [0, 5],
            [5, 5],
            [0, 5]
        ],
        [
            [0, 5, 0],
            [5, 5, 5]
        ],
        [
            [5, 0],
            [5, 5],
            [5, 0]
        ]
    ];
    this.shape = this.rotations[0];
};

TetrominoT.prototype = Object.create(Tetromino.prototype);
TetrominoT.prototype.constructor = TetrominoT;

var TetrominoL = function () {
    Tetromino.call(this);
    this.rotations = [
        [
            [6, 6, 6],
            [6, 0, 0]
        ],
        [
            [6, 6],
            [0, 6],
            [0, 6]
        ],
        [
            [0, 0, 6],
            [6, 6, 6]
        ],
        [
            [6, 0],
            [6, 0],
            [6, 6]
        ]
    ];
    this.shape = this.rotations[0];
};

TetrominoL.prototype = Object.create(Tetromino.prototype);
TetrominoL.prototype.constructor = TetrominoL;

var TetrominoJ = function () {
    Tetromino.call(this);
    this.rotations = [
        [
            [7, 7, 7],
            [0, 0, 7]
        ],
        [
            [0, 7],
            [0, 7],
            [7, 7]
        ],
        [
            [7, 0, 0],
            [7, 7, 7]
        ],
        [
            [7, 7],
            [7, 0],
            [7, 0]
        ]
    ];
    this.shape = this.rotations[0];
};

TetrominoJ.prototype = Object.create(Tetromino.prototype);
TetrominoJ.prototype.constructor = TetrominoJ;
