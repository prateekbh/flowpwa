// Code goes here
let stage;
let lines = [];
const lineColors = ['#FFEB3B', '#000', '#FF3D00'];
let bitmap;
let bool = true;
function init() {
  stage = new createjs.Stage("myCanvas");
  var circle = new createjs.Shape();
  circle.graphics
  .beginLinearGradientFill(["#4A148C","#3F51B5","#00BFA5"], [0, .2, 1], 0, 0, 0, 600)
  .drawRect(0, 0, 600, 600);
  stage.addEventListener('click',(e)=>{
		const newX = bitmap.x>150?100:300;
		const newRotation = bitmap.x===100?45:-45;
		const rocket = createjs.Tween.get(bitmap);
		rocket
			.to({
				rotation: newRotation,
			}, 0)
			.to({
				x: newX,
				y: bitmap.y - 50
			}, 400)
			.to({
				rotation: 0,
			}, 100);
  });
  stage.addChild(circle);
  stage.update();
  addLine();
}


function addLine(){
  var line = new createjs.Shape();
  line.graphics.setStrokeStyle(3);
  line.graphics.beginStroke("#787");
  line.graphics.moveTo(200, -70);
  line.graphics.lineTo(200, 0);
  line.height = 70;
  line.y = -40;
  line.graphics.endStroke();
  lines.push(line);
  stage.addChild(line);
  stage.update();
  createjs.Ticker.setFPS(60);
  addRocket();
  createjs.Ticker.addEventListener("tick", ()=>{
    lines.forEach(l=>{
			console.log(ndgmr.checkRectCollision(bitmap,l));
      l.y += 3;
    });
    if (line[0] > 700) {
      line.pop();
    }
    if (lines[lines.length -1] && lines[lines.length -1].y > -30) {
      pushIntoLines();
    }
    bitmap.y += 1;
    stage.update();
  });
}

function pushIntoLines(){
  var line = new createjs.Shape();
  line.graphics.setStrokeStyle(3);
  line.graphics.beginStroke(lineColors[Math.floor(Math.random()*3)]);
  const height = Math.floor(20+Math.random()*50);
  line.graphics.moveTo(200, -1 * height);
  line.graphics.lineTo(200, 0);
  line.height = height;
  line.y = -26 - lines[lines.length -1].height;
  line.graphics.endStroke();
  lines.push(line);
  stage.addChild(line);
}

function addRocket(){
  var doge = new Image();
  doge.src = "/rocket.png";
  bitmap = new createjs.Bitmap(doge);
  bitmap.scaleY = 0.075;
  bitmap.scaleX = 0.08;
  bitmap.y = 300;
  bitmap.x = 100;
  stage.addChild(bitmap);
}
