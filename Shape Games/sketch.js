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

  let newShape = createButton("New Shape");
  newShape.position(20,20);
  newShape.mousePressed(generateNewShape);
  generateNewShape();
}

function generateNewShape(){
  background(220);
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
    beginShape();
    vertex(x,y-size/2);
    vertex(x+random(size/4,size/2),y+size/2);
    vertex(x-random(size/4,size/2),y+size/2);
    endShape();
  }
  if(choice === 4){
    let startAngle = random(0,360);
    let stopAngle = startAngle + random(90,180);
    arc(x, y, size, size+50, startAngle, stopAngle, PIE);
  }
}

function draw() {
  
}