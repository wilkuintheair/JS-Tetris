var ExpandablePool = function (cls) {
    this.pool = [];
    this.counter = 0;
    this.cls = cls;
};

function createItem() {
    try {
        var instance = new this.cls.prototype.constructor();
    } catch (e) {
        console.log(e);
    }
    return instance;
}

function addItemAt(index) {
    var item = createItem.call(this);
    if (index < this.pool.length) {
        this.pool.splice(index, 0, item);
    } else {
        this.pool[index] = item;
    }
    return item;
}

ExpandablePool.prototype.getItem = function () {
    var item;
    if(this.counter > 0) {
        item = this.pool[--this.counter];
    } else {
        item = addItemAt.call(this, 0);
    }
    return item;
};

ExpandablePool.prototype.returnItem = function (item) {
    if (item instanceof this.cls) {
        this.pool[this.counter++] = item;
    }
};




