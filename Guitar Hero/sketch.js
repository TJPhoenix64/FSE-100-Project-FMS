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

const Screen = Object.freeze({
  LEVELSELECT: "level select",
  PLAYING: "playing",
  SETTINGS: "settings",
});

var currentScreen = Screen.LEVELSELECT;
var prevScreen;

const level1 = [
  { time: 3000, lane: 0 },
  { time: 3500, lane: 2 },
  { time: 4000, lane: 1 },
  { time: 4000, lane: 3 }, // two notes at once is fine
  { time: 4500, lane: 0 },
];

const targetCircleWidth = 75;
const noteWidth = 50;
const numLanes = 6;
const laneStartX = 50;
const circleStartY = 200;
const circleEndY = 500;

let button1;
let levelSelectButton;

let redd;
let greenn;
let bluee;
let lightGreen;
let mix;
let grey;
let levelStart;

var statusList = [];

var streak = 0;

let perfectSound, errorSound;

var pressList = [0, 0, 0, 0];

function preload() {
  perfectSound = loadSound("assets/coin-ding.wav");
  errorSound = loadSound("assets/error.wav");
  loadButtons();
  for (let i = 0; i < numLanes; i++) {
    statusList[i] = Judgement.WAITING;
  }
}

function loadButtons() {
  loadLSButtons();
  loadPLButtons();
}

function loadPLButtons() {
  button1 = createButton("level 1");
  levelSelectButton = createButton("LS");

  button1.position(400, 200);
  levelSelectButton.position(450, 200);

  button1.mousePressed(() => playLevel(1));
  levelSelectButton.mousePressed(() => {
    currentScreen = Screen.LEVELSELECT;
  });
}

function setup() {
  createCanvas(800, 600);
  startTime = millis();
  currentTime = startTime;
  initColors();
}

function initColors() {
  redd = color(255, 0, 0);
  greenn = color(0, 255, 0);
  grey = color(112, 99, 98);
  bluee = color(0, 0, 255);
  lightGreen = color(82, 222, 119);
  mix = color(46, 39, 122);
}

function drawPlaying() {
  delta = millis() - currentTime;
  currentTime = millis();
  background(220);

  for (let i = 0; i < numLanes; i++) {
    let time = millis();
    let diff = time - pressList[i];
    if (time == diff) {
      statusList[i] = Judgement.WAITING;
    } else if (diff > 100) {
      statusList[i] = Judgement.WAITING;
    }
  }

  for (let idx = 0; idx < numLanes; idx++) {
    let x = (idx + 1) * targetCircleWidth;
    let status = statusList[idx];
    if (status == Judgement.WAITING) {
      makeLane(x, x + targetCircleWidth, grey);
    } else if (status == Judgement.GOOD) {
      makeLane(x, x + targetCircleWidth, mix);
      streak++;
    } else if (status == Judgement.PERFECT) {
      makeLane(x, x + targetCircleWidth, lightGreen);
      perfectSound.play();
      streak++;
    } else if (status == Judgement.WRONG_LANE) {
      makeLane(x, x + targetCircleWidth, bluee);
    } else {
      makeLane(x, x + targetCircleWidth, redd);
      errorSound.play();
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
  //checkAndPlaySound();
  print(circleList.length);
  makeTarget(laneStartX + 25, laneStartX + targetCircleWidth * numLanes + 25);
}

function hidePlayingButtons() {
  button1.hide();
  levelSelectButton.hide();
}

function showPlayingButtons() {
  button1.show();
  levelSelectButton.show();
}

function draw() {
  if (currentScreen == Screen.LEVELSELECT && prevScreen != Screen.LEVELSELECT) {
    drawLevelSelect();
    hidePlayingButtons();
    showLevelSelectButtons();
  } else if (currentScreen == Screen.PLAYING) {
    drawPlaying();
    if (prevScreen != Screen.PLAYING) {
      hideLevelSelectButtons();
      showPlayingButtons();
    }
  }
  prevScreen = currentScreen;
}

async function checkAndPlaySound() {
  for (let i = 0; i < numLanes; i++) {
    if (statusList[i] == Judgement.PERFECT) {
      perfectSound.play();
    }
  }
}

function drawLabels() {
  let c = color(87, 69, 68);
  fill(c);
  textAlign(CENTER, TOP);
  text("Streak" + 5);
}

function clearNotes() {
  circleList = [];
}

function playLevel(num) {
  console.log("level " + num + " start");
}

function loadLevel1() {
  levelStart = millis();
  clearNotes();
  let spawnTime = [];
  for (let i = 0; i < level1.length; i++) {
    spawnTime[i] = level1[i].time - calcTravelTime();
  }
}

function calcTravelTime() {
  let distance = circleEndY - circleStartY;
  return distance * levelSpeed;
}

function keyPressed() {
  if (key === "w") {
    createNoteRand();
  }

  if (key === "1") {
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
  return (laneIdx + 1) * targetCircleWidth + targetCircleWidth / 2;
}
function createNoteRand() {
  let myColor = color(50, 255, 50);
  let val = randInt(0, 3);
  console.log(val);
  circleList.push(new Note(laneX(val), circleStartY, myColor, noteWidth));
}

function createNote(laneNum) {
  let myColor = color(50, 255, 50);
  circleList.push(new Note(laneX(laneNum), circleStartY, myColor, noteWidth));
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
  circle(startX + targetCircleWidth / 2.0, circleEndY, startX - endX);
}

function makeTarget(startX, endX) {
  let laneY = 500;
  stroke(0);
  strokeWeight(10);
  line(startX, laneY, endX, laneY);
  strokeWeight(1);
}
