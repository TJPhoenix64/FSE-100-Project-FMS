var startTime;
var currentTime;
var delta;
let circleList = [];
var levelSpeed = 50;
const Judgement = Object.freeze({
  PERFECT: "PERFECT",
  GOOD: "GOOD",
  MISS: "MISS",
  WRONG_LANE: "WRONG LANE",
  WAITING: "WAITING",
});

let red;
let green;
let blue;
let lightGreen;
let mix;

var statusList = [
  Judgement.WAITING,
  Judgement.WAITING,
  Judgement.WAITING,
  Judgement.WAITING,
];

var streak = 0;

var pressList = [0, 0, 0, 0];

function setup() {
  createCanvas(800, 600);
  startTime = millis();
  currentTime = startTime;
  initColors();
}

function initColors() {
  red = color(255, 0, 0);
  green = color(0, 255, 0);
  blue = color(0, 0, 255);
  lightGreen = color(82, 222, 119);
  mix = color(46, 39, 122);
}

function draw() {
  delta = millis() - currentTime;
  currentTime = millis();
  background(220);

  for (let i = 0; i < pressList.length; i++) {
    let time = millis();
    let diff = time - pressList[i];
    if (time == diff) {
      statusList[i] = Judgement.WAITING;
    } else if (diff > 100) {
      statusList[i] = Judgement.WAITING;
    }
  }

  for (let idx = 0; idx < statusList.length; idx++) {
    let x = (idx + 1) * 50;
    let status = statusList[idx];
    if (status == Judgement.WAITING) {
      makeLane(x, x + 50, green);
    } else if (status == Judgement.GOOD) {
      makeLane(x, x + 50, mix);
      streak++;
    } else if (status == Judgement.PERFECT) {
      makeLane(x, x + 50, lightGreen);
      streak++;
    } else if (status == Judgement.WRONG_LANE) {
      makeLane(x, x + 50, blue);
    } else {
      makeLane(x, x + 50, red);
      streak = 0;
    }
  }

  //print("time:" + delta);
  for (let i = circleList.length - 1; i >= 0; i--) {
    circleList[i].update(delta, levelSpeed);
    if (circleList[i].getY() > height - 50) {
      circleList.splice(i, 1);
    } else {
      circleList[i].display();
    }
  }
  print(circleList.length);
  makeTarget(50, 250);
}

function drawLabels() {
  fill(87, 69, 68);
  textAlign(CENTER, TOP);
  text("Streak" + 5);
}

function keyPressed() {
  if (key === "w") {
    createNote();
  }

  if (key === "a") {
    pressList[0] = millis();

    let result = checkDetection(0);
    setLaneStatus(0, result);
    console.log(statusList[0]);
  }
  if (key === "s") {
    pressList[1] = millis();

    let result = checkDetection(1);
    setLaneStatus(1, result);
    console.log(statusList[1]);
  }
  if (key === "d") {
    pressList[2] = millis();
    let result = checkDetection(2);
    setLaneStatus(2, result);
    console.log(statusList[2]);
  }
  if (key === "f") {
    pressList[3] = millis();
    let result = checkDetection(3);
    setLaneStatus(3, result);
    console.log(statusList[3]);
  }
}

function setLaneStatus(laneIdx, result) {
  if (result === undefined) {
    statusList[laneIdx] = Judgement.WRONG_LANE;
  } else if (result < -30 || result > 30) {
    statusList[laneIdx] = Judgement.MISS;
  } else if (result > 10 || result < -10) {
    statusList[laneIdx] = Judgement.GOOD;
  } else {
    statusList[laneIdx] = Judgement.PERFECT;
  }
}

function checkDetection(laneNum) {
  let circleX = laneX(laneNum);
  let note = null;
  for (let i = 0; i < circleList.length; i++) {
    if (circleList[i].getX() === circleX) {
      note = circleList[i];
      break;
    }
  }
  if (note === null) {
    return;
  }
  let circleY = note.getY();
  let diff = 500 - circleY;
  console.log(diff);
  return diff;
}

function laneX(laneIdx) {
  return (laneIdx + 1) * 50 + 25;
}
function createNote() {
  let myColor = color(50, 255, 50);
  let val = randInt(0, 3);
  console.log(val);
  circleList.push(new Note(laneX(val), 50, myColor, 50));
}

//generates an integer inclusive between low and high
function randInt(low, high) {
  let xVal = random(0, 1);
  xVal *= high - low + 1;
  xVal += low;
  xVal = Math.floor(xVal);
  return xVal;
}

function makeLane(startX, endX, circleColor) {
  stroke(0);
  strokeWeight(3);
  line(startX, 0, startX, height);
  line(endX, 0, endX, height);
  fill(circleColor);
  circle(startX + 25, 500, startX - endX);
}

function makeTarget(startX, endX) {
  stroke(0);
  strokeWeight(10);
  line(startX, 500, endX, 500);
  strokeWeight(1);
}
