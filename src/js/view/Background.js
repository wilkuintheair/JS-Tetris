var Background = function (width, height, cellSize, color) {
    PIXI.Sprite.call(this);

    function draw() {
        for (var i = 1; i < height / cellSize; i++) {
            var line = new PIXI.Graphics();
            var y = i * cellSize;
            line.lineStyle(1, color);
            line.moveTo(0, y);
            line.lineTo(width, y);
            this.addChild(line);
        }

        for (var j = 1; j < width / cellSize; j++) {
            var vLine = new PIXI.Graphics();
            var x = j * cellSize;
            vLine.lineStyle(1, color);
            vLine.moveTo(x, 0);
            vLine.lineTo(x, height);
            this.addChild(vLine);
        }
    }

    draw.call(this);
};

Background.prototype = Object.create(PIXI.Sprite.prototype);
Background.prototype.constructor = Background;
