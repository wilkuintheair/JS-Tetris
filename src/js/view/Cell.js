var Cell = function () {
    PIXI.Sprite.call(this);
    this.rect = new PIXI.Graphics();
};

Cell.prototype = Object.create(PIXI.Sprite.prototype);
Cell.prototype.constructor = Cell;

Cell.prototype.draw = function (color, size) {
    this.rect.clear();
    this.rect.lineStyle(1, 0x666666);
    this.rect.beginFill(color);
    this.rect.drawRect(0, 0, size, size);
    this.rect.endFill();
    this.addChild(this.rect);
};
