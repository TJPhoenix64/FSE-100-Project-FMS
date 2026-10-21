var baseX = 300;
var baseY = 250;
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
  //x = random(300,350);
  //y = random(175,225);
  let choice = floor(random(5));
  if(choice === 0){
    square(baseX,baseY,size);
  }
  if(choice === 1){
    circle(baseX,baseY,size);
  }
  if(choice === 2){
    rect(baseX,baseY,size,size+50);
  }
  if(choice === 3){
    let x1 = baseX;
    let y1 = baseY - size / 2;
    let x2 = baseX + random(size / 4, size / 2);
    let y2 = baseY + size / 2;
    let x3 = baseX - random(size / 4, size / 2);
    let y3 = baseY + size / 2;
    triangle(x1, y1, x2, y2, x3, y3);
  }
  if(choice === 4){
    let startAngle = random(0,360);
    let stopAngle = startAngle + random(90,180);
    arc(baseX, baseY, size, size+50, startAngle, stopAngle, PIE);
  }
}

function generateShape(){
  fill('#f0dbdb');
  x = 300 + random(200,400);
  y = 250 + random(-100,100);
  square(x,y,size);
  x = 300 + random(200,400);
  y = 250 + random(-100,100);
  circle(x,y,size);
  x = 300 + random(200,400);
  y = 250 + random(-100,100);
  rect(x,y,size,size+50);
  x = 300 + random(200,400);
  y = 250 + random(-100,100);
  let x1 = x;
  let y1 = y - size / 2;
  let x2 = x + random(size / 4, size / 2);
  let y2 = y + size / 2;
  let x3 = x - random(size / 4, size / 2);
  let y3 = y + size / 2;
  triangle(x1, y1, x2, y2, x3, y3);
  x = 300 + random(200,400);
  y = 250 + random(-100,100);
  let startAngle = random(0,360);
  let stopAngle = startAngle + random(90,180);
  arc(x, y, size, size+50, startAngle, stopAngle, PIE);
}

function mousePressed(){
  
}
function mouseDragged(){
  
}
function mouseReleased(){
  
}

function draw() {
  
}