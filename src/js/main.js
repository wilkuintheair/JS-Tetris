var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(Model.BOARD_WIDTH, Model.BOARD_HEIGHT);
document.body.appendChild(renderer.view);

var model = new Model();
var view = new View(model);
stage.addChild(view);

var stepTime = new Date().getTime();
function gameLoop() {
    requestAnimationFrame(gameLoop);
    var time = new Date().getTime();
    var stepDelta = time - stepTime;
    if (stepDelta > model.getStepDelay()) {
        model.speedUp();
        model.nextStep();
        stepTime = time;
    }
    renderer.render(stage);
}
gameLoop();
