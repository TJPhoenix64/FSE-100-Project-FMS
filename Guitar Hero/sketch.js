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
  makeLane(100, 150);
  makeLane(150, 200);
  makeLane(200, 250);

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
  makeTarget(50, 250);
}

function keyPressed() {
  if (key === "w") {
    createNote();
    //print("input taken");
  }
}

function createNote() {
  let myColor = color(50, 255, 50);
  let xVal = random(0, 1);
  xVal *= 4;
  xVal = Math.floor(xVal);
  circleList.push(new Note(xVal * 50 + 75, 50, myColor, 50));
}

function makeLane(startX, endX) {
  stroke(0);
  strokeWeight(3);
  line(startX, 0, startX, height);
  line(endX, 0, endX, height);
  fill(255, 0, 0);
  circle(startX + 25, 500, startX - endX);
}

function makeTarget(startX, endX) {
  stroke(0);
  strokeWeight(10);
  line(startX, 500, endX, 500);
  strokeWeight(1);
}
