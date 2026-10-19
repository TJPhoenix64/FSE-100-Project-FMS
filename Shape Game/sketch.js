var x;
var y;
var size;
var number;

function setup() {
  createCanvas(800, 500);
  background(220);
  noLoop();
  rectMode(CENTER);
  x = width/2;
  y = height/2;
  stroke(0);
  strokeWeight(1);
  let newShape = createButton("New Shape");
  newShape.position(20,20);
  newShape.mousePressed(generateNewShape);
  newShape.style('background-color','#e6f4e1');
  generateNewShape();
}

function generateNewShape(){
  background(220);
  fill('#cee4e9');
  size = random(125,250);
  number = random(100,200);
  x = random(300,350);
  y = random(175,225);
  let choice = floor(random(5));
  if(choice === 0){
    square(x,y,size);
  }
  if(choice === 1){
    circle(x,y,size);
  }
  if(choice === 2){
    rect(x,y,size,size+50);
  }
  if(choice === 3){
    let x1 = x;
    let y1 = y - size / 2;
    let x2 = x + random(size / 4, size / 2);
    let y2 = y + size / 2;
    let x3 = x - random(size / 4, size / 2);
    let y3 = y + size / 2;
    triangle(x1, y1, x2, y2, x3, y3);
  }
  if(choice === 4){
    let startAngle = random(0,360);
    let stopAngle = startAngle + random(90,180);
    arc(x, y, size, size+50, startAngle, stopAngle, PIE);
  }
}

function draw() {
  
}