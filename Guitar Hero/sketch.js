var startTime;
var currentTime;
var delta;
let circleList = [];
var levelSpeed = 50;

function setup() {
  createCanvas(800, 600);
  startTime = millis();
  currentTime = startTime;
}

function draw() {
  delta = millis() - currentTime;
  currentTime = millis();
  background(220);
  makeLane(50, 100);

  //print("time:" + delta);
  for (let i = circleList.length - 1; i >= 0; i--) {
    circleList[i].update(delta, levelSpeed);
    if (circleList[i].getY() > height) {
      circleList.splice(i, 1);
    } else {
      circleList[i].display();
    }
  }
  print(circleList.length);
  makeTarget();
}

function keyPressed() {
  if (key === "w") {
    createNote();
    //print("input taken");
  }
}

function createNote() {
  let myColor = color(50, 255, 50);
  let xVal = random(50, 450);
  circleList.push(new Note(xVal, 50, myColor, 50));
}

function makeLane(startX, endX) {
  line(startX, 0, startX, height);
  line(endX, 0, endX, height);
  fill(255, 0, 0);
  circle(startX + (startX - endX) / 2.0, 500, startX - endX);
}

function makeTarget() {
  strokeWeight(10);
  line(0, 500, 500, 500);
  strokeWeight(1);
}
