var baseX = 300;
var baseY = 250;
var baseChoice;
var baseStartAngle;
var baseStopAngle;
var size;
var number;

var x;
var y;

function setup() {
  createCanvas(800, 500);
  background(220);
  noLoop();
  rectMode(CENTER);
  stroke(0);
  strokeWeight(1);
  let newShape = createButton("New Shape");
  newShape.position(20,20);
  newShape.mousePressed(newRound);
  newShape.style('background-color','#e6f4e1');
  generateBaseShape();
  generateShape();
}

function newRound(){
  generateBaseShape();
  generateShape();
  redraw();
}

function generateBaseShape(){
  background(220);
  fill('#cee4e9');
  size = random(125,250);
  number = random(100,200);
  
  baseChoice = floor(random(5));
  baseStartAngle = random(0, 360);
  baseStopAngle = baseStartAngle + random(90, 180);
  
  if(baseChoice === 0){
    square(baseX, baseY, size);
  }
  else if(baseChoice === 1){
    circle(baseX, baseY, size);
  }
  else if(baseChoice === 2){
    rect(baseX, baseY, size, size + 50);
  }
  else if(baseChoice === 3){
    let x1 = baseX;
    let y1 = baseY - size / 2;
    let x2 = baseX + random(size / 4, size / 2);
    let y2 = baseY + size / 2;
    let x3 = baseX - random(size / 4, size / 2);
    let y3 = baseY + size / 2;
    triangle(x1, y1, x2, y2, x3, y3);
  }
  else if(baseChoice === 4){
    arc(baseX, baseY, size, size + 50, baseStartAngle, baseStopAngle, PIE);
  }
}

function generateShape(){
  fill('#f0dbdb');
  //square
  x = 300 + random(200,400);
  y = 250 + random(-100,100);
  square(x, y, size);
  //circle
  x = 300 + random(200,400);
  y = 250 + random(-100,100);
  circle(x, y, size);
  //rect
  x = 300 + random(200,400);
  y = 250 + random(-100,100);
  rect(x, y, size, size + 50);
  //triangle
  x = 300 + random(200,400);
  y = 250 + random(-100,100);
  let x1 = x;
  let y1 = y - size / 2;
  let x2 = x + random(size / 4, size / 2);
  let y2 = y + size / 2;
  let x3 = x - random(size / 4, size / 2);
  let y3 = y + size / 2;
  triangle(x1, y1, x2, y2, x3, y3);
  //arc
  x = 300 + random(200,400);
  y = 250 + random(-100,100);
  arc(x, y, size, size + 50, baseStartAngle, baseStopAngle, PIE);
}

function mousePressed(){
}
function mouseDragged(){
}
function mouseReleased(){
}

function draw() {
}