var startTime;
var currentTime;
var delta;
let circleList = [];
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

const PLAYSTATUS = Object.freeze({
  NOTPLAYING: "not playing",
  PRESET: "preset",
  USERGUIDED: "user guided",
});

var currentScreen = Screen.LEVELSELECT;
var prevScreen;
var targetLevelNum;

var playStatus = PLAYSTATUS.NOTPLAYING;

const level1Data = [
  { time: 2000, lane: 0 },
  { time: 4000, lane: 0 },
  { time: 5500, lane: 0 },
  { time: 7500, lane: 0 },
  { time: 10000, lane: 0 },
  { time: 12000, lane: 0 },
  { time: 14000, lane: 0 },
  { time: 15500, lane: 0 },
  { time: 17500, lane: 0 },
  { time: 20000, lane: 0 },
  { time: 22000, lane: 0 },
  { time: 24000, lane: 0 },
];

const level2Data = [
  { time: 2000, lane: 0 },
  { time: 3000, lane: 1 },
  { time: 4000, lane: 0 },
  { time: 5000, lane: 1 },

  { time: 6500, lane: 0 },
  { time: 7000, lane: 0 },
  { time: 8000, lane: 1 },
  { time: 8500, lane: 1 },

  { time: 10000, lane: 0 },
  { time: 11000, lane: 1 },
  { time: 12000, lane: 0 },
  { time: 13000, lane: 1 },

  { time: 14500, lane: 0 },
  { time: 14500, lane: 1 },

  { time: 16000, lane: 0 },
  { time: 17000, lane: 1 },
  { time: 18000, lane: 1 },
  { time: 19000, lane: 0 },

  { time: 20500, lane: 0 },
  { time: 21000, lane: 1 },
  { time: 22000, lane: 0 },
  { time: 23000, lane: 1 },

  { time: 24500, lane: 0 },
  { time: 24500, lane: 1 },
];

const level3Data = [
  { time: 2000, lane: 0 },
  { time: 3000, lane: 1 },
  { time: 4000, lane: 2 },
  { time: 5000, lane: 1 },

  { time: 6500, lane: 0 },
  { time: 7000, lane: 1 },
  { time: 7500, lane: 2 },

  { time: 9000, lane: 2 },
  { time: 10000, lane: 1 },
  { time: 11000, lane: 0 },

  { time: 12500, lane: 0 },
  { time: 12500, lane: 2 },

  { time: 14000, lane: 0 },
  { time: 15000, lane: 1 },
  { time: 16000, lane: 2 },
  { time: 17000, lane: 1 },

  { time: 18500, lane: 0 },
  { time: 19000, lane: 0 },
  { time: 20000, lane: 2 },
  { time: 20500, lane: 2 },

  { time: 22000, lane: 0 },
  { time: 23000, lane: 1 },
  { time: 24000, lane: 2 },

  { time: 25500, lane: 0 },
  { time: 25500, lane: 2 },

  { time: 27000, lane: 2 },
  { time: 28000, lane: 1 },
  { time: 29000, lane: 0 },

  { time: 30500, lane: 0 },
  { time: 31000, lane: 1 },
  { time: 31500, lane: 2 },
];

const level4Data = [
  { time: 6000, lane: 0 },
  { time: 8000, lane: 2 },
  { time: 10000, lane: 1 },
  { time: 10000, lane: 3 },
  { time: 9000, lane: 0 },
];

const level1 = new Level(1, 50, level1Data);
const level2 = new Level(2, 50, level2Data);
const level3 = new Level(3, 50, level3Data);
const level4 = new Level(4, 50, level4Data);

var currentLevel;

const targetCircleWidth = 75;
const noteWidth = 50;
let numLanes = 4;
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

let perfectSound, errorSound, goodSound;

var pressList = [0, 0, 0, 0];

var spawnTime = [];

function preload() {
  perfectSound = loadSound("assets/coin-ding.wav");
  errorSound = loadSound("assets/error.wav");
  goodSound = loadSound("assets/mediumSound.wav");
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
  button1 = createButton("Start Level");
  levelSelectButton = createButton("Level Select");

  button1.position(400, 200);
  levelSelectButton.position(520, 200);

  button1.mousePressed(() => {
    playLevel(targetLevelNum);
    console.log("playing level " + targetLevelNum);
  });
  levelSelectButton.mousePressed(() => {
    currentScreen = Screen.LEVELSELECT;
  });
}

function setup() {
  createCanvas(800, 600);
  startTime = millis();
  currentTime = startTime;
  initColors();
  home = createButton("Homescreen");
  home.position(width - 120, 20);

  home.mousePressed(function () {
    window.location.href = "../index.html";
  });
}

function initColors() {
  redd = color(255, 0, 0);
  greenn = color(0, 255, 0);
  grey = color(112, 99, 98);
  bluee = color(0, 0, 255);
  lightGreen = color(82, 222, 119);
  mix = color(252, 186, 3);
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
      goodSound.play();
    } else if (status == Judgement.PERFECT) {
      makeLane(x, x + targetCircleWidth, lightGreen);
      perfectSound.play();
    } else if (status == Judgement.WRONG_LANE) {
      makeLane(x, x + targetCircleWidth, bluee);
    } else {
      makeLane(x, x + targetCircleWidth, redd);
      errorSound.play();
    }
  }

  //print("time:" + delta);
  clearNotesAtHeight(height - 50);
  drawKeyGuides();
  //checkAndPlaySound();
  print(circleList.length);
  makeTarget(laneStartX + 25, laneStartX + targetCircleWidth * numLanes + 25);
}

function clearNotesAtHeight(yVal) {
  for (let i = circleList.length - 1; i >= 0; i--) {
    circleList[i].update(delta, currentLevel.velocity);
    if (circleList[i].getY() > yVal) {
      circleList.splice(i, 1);
    } else {
      circleList[i].display();
    }
  }
}

function drawKeyGuides() {
  for (let i = 0; i < numLanes; i++) {
    let l = "A";
    if (i == 1) {
      l = "S";
    } else if (i == 2) {
      l = "D";
    } else if (i == 3) {
      l = "F";
    } else if (i == 4) {
      l = "G";
    } else if (i == 5) {
      l = "H";
    }

    drawKey(i * targetCircleWidth + 85, 300, l);
  }
}

function drawKey(x, y, letter) {
  fill(grey);
  textAlign(CENTER, CENTER);
  rect(x, y, 50, 50, 3);
  text(letter, x + 25, y + 25);
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
  //console.log(playStatus);
  if (currentScreen == Screen.LEVELSELECT && prevScreen != Screen.LEVELSELECT) {
    playStatus = PLAYSTATUS.NOTPLAYING;
    drawLevelSelect();
    hidePlayingButtons();
    showLevelSelectButtons();
  } else if (currentScreen == Screen.PLAYING) {
    drawPlaying();
    if (prevScreen != Screen.PLAYING) {
      playStatus = PLAYSTATUS.USERGUIDED;
      hideLevelSelectButtons();
      showPlayingButtons();
    }
    if (playStatus == PLAYSTATUS.PRESET) {
      //console.log("time since button" + (millis() - levelStart));
      drawShapes(1, millis() - levelStart);
      drawLabels();
    }
  }
  prevScreen = currentScreen;
}

function drawShapes(levelNum, time) {
  for (let i = currentLevel.noteData.length - 1; i >= 0; i--) {
    if (time >= spawnTime[i]) {
      createNote(currentLevel.noteData[i].lane);
      currentLevel.noteData.splice(i, 1);
      spawnTime.splice(i, 1);
    }
  }
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
  text("Streak" + streak, 400, 400);
}

function clearNotes() {
  circleList = [];
}

function playLevel(num) {
  playStatus = PLAYSTATUS.PRESET;
  //console.log("level " + num + " start");
  startLevel(num);
}

function startLevel(num) {
  clearNotes();
  if (num == 1) {
    currentLevel = level1.clone();
  }
  if (num == 2) {
    currentLevel = level2.clone();
  }
  if (num == 3) {
    currentLevel = level3.clone();
  }
  if (num == 4) {
    currentLevel = level4.clone();
  }
  loadCurrentLevel();
}

function loadCurrentLevel() {
  levelStart = millis();
  clearNotes();
  console.log("note data: " + currentLevel.noteData);
  for (let i = 0; i < currentLevel.noteData.length; i++) {
    spawnTime[i] =
      currentLevel.noteData[i].time -
      currentLevel.calcTravelTimeOOP(circleEndY - circleStartY);
    console.log(
      "startTime: " +
        (currentLevel.noteData[i].time -
          currentLevel.calcTravelTimeOOP(circleEndY - circleStartY))
    );
  }
  numLanes = currentLevel.numLanes;
}

function keyPressed() {
  if ((key === "w" || key === "W") && playStatus == PLAYSTATUS.USERGUIDED) {
    createNoteRand();
  }

  if (key === "1") {
  }

  if (key === "a" || key === "A") {
    registerKeyPress(0);
  }
  if (key === "s" || key === "S") {
    registerKeyPress(1);
  }
  if (key === "d" || key === "D") {
    registerKeyPress(2);
  }
  if (key === "f" || key === "F") {
    registerKeyPress(3);
  }
}

function registerKeyPress(num) {
  pressList[num] = millis();

  let result = checkDetection(num);
  setLaneStatus(num, result);
}

function setLaneStatus(laneIdx, result) {
  if (result === undefined) {
    statusList[laneIdx] = Judgement.WRONG_LANE;
  } else if (result < -50 || result > 50) {
    statusList[laneIdx] = Judgement.MISS;
    streak = 0;
  } else if (result > 10 || result < -10) {
    statusList[laneIdx] = Judgement.GOOD;
    streak++;
    deleteNoteAtLane(laneIdx);
  } else {
    statusList[laneIdx] = Judgement.PERFECT;
    streak++;
    deleteNoteAtLane(laneIdx);
  }
}

function deleteNoteAtLane(lane) {
  console.log("LANE: " + lane);

  for (let i = 0; i < circleList.length; i++) {
    if (circleList[i].getX() == laneX(lane)) {
      console.log("Deleting note at Y:", circleList[i].getY());
      circleList.splice(i, 1);
      break;
    }
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
  //console.log(diff);
  return diff;
}

function laneX(laneIdx) {
  return (laneIdx + 1) * targetCircleWidth + targetCircleWidth / 2;
}
function createNoteRand() {
  let myColor = color(50, 255, 50);
  let val = randInt(0, 3);
  //console.log(val);
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
