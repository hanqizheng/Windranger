var stage;
function init() {
  stage = new createjs.Stage("demoCanvas");
  setInterval(handleMouseUp, 1000);
}

function handleMouseUp() {
  const circle = new createjs.Shape();
  const min = 6;
  const max = 9;
  const maxR = 30;
  const minR = 10;
  const minX = 0;
  const maxX = 1000;
  const minY = 0;
  const maxY = 500;
  let randomX = Math.floor(Math.random()*(maxX-minX+1)+minX).toString();
  let randomY = Math.floor(Math.random()*(maxY-minY+1)+minY).toString();
  let randomR = Math.floor(Math.random()*(max-min+1)+min).toString();
  let randomG = Math.floor(Math.random()*(max-min+1)+min).toString();
  let randomB = Math.floor(Math.random()*(max-min+1)+min).toString();
  let randomRadius = Math.floor(Math.random()*(maxR-minR+1)+minR).toString();
  circle.graphics.beginFill("#" + 00 + randomG + 00).drawCircle(0, 0, randomRadius);
  // circle.x = stage.mouseX;
  // circle.y = stage.mouseY;
  circle.x = randomX;
  circle.y = randomY;
  stage.addChild(circle);
  createjs.Tween.get(circle, { override: true })
    .to({ scaleX: 3.5, scaleY: 3.5}, 500, createjs.Ease.bounceOut)
    // .to({ scaleX: -0.5, scaleY: -0.5}, 100, createjs.Ease.bounceOut);
    .to({ alpha: 0 }, 200, createjs.Ease.bounceOut);
  
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", stage);
}