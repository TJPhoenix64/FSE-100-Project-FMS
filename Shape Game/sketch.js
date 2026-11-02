var baseX = 300;
var baseY = 250;
var baseChoice;
var baseStartAngle;
var baseStopAngle;
var size;
var number;
var difficulty = 30;
var points = 0;
var score = 0;
var highScore = 0;

let optionShapes = [];
let selectedShape = null;
let gameState = "instructions";

let success = false;

let newShape, home, newGame;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  noLoop();
  rectMode(CENTER);
  stroke(0);
  strokeWeight(1);
  
  newShape = createButton("New Shape");
  newShape.position(20,20);
  newShape.mousePressed(newRound);
  newShape.style('background-color','#e6f4e1');
  newShape.hide();

  home = createButton("Homescreen");
  home.position(windowWidth - 120, 20);
  home.style('background-color', '#e6f4e1');
  home.mousePressed(function () {
    window.location.href = "../index.html";
    gameState = "instructions";
  });

  newGame = createButton("New Game");
  newGame.position(windowWidth/2 - 40, windowHeight - 80);
  newGame.style('background-color','#e6f4e1');
  newGame.mousePressed(function(){
    gameState = "playing";
    newGame.hide();
    endGame.show();
    newShape.show();
    points = 0;
    newRound();
  })
  
  let endGame = createButton("End Game");
  endGame.hide();
  endGame.position(windowWidth/2 - 40, windowHeight - 80);
  endGame.style('background-color','#e6f4e1');
  endGame.mousePressed(function(){
    score = points;
    updateHighScore();
    gameState = "endScreen"
    endGame.hide();
    newShape.hide();
    newGame.show();
    redraw();
  })
  
  newRound();
}

function newRound(){
  generateBaseShape();
  generateShape();
  redraw();
}

function generateBaseShape(){
  size = random(125,250);
  number = random(100,200);
  
  baseChoice = floor(random(5));
  baseStartAngle = random(0, 360);
  baseStopAngle = baseStartAngle + random(90, 180);
}

function generateShape(){
  optionShapes = [];
  for(let i = 0; i < 5; i++){
    let sAngle = random(0,360);
    let eAngle = sAngle + random(90,180);
    
    if(i === 4 && baseChoice === 4){
      sAngle = baseStartAngle;
      eAngle = baseStopAngle;
    }
    
    optionShapes.push({
      x: random(500, 700),
      y: random(100, 400),
      choice: i,
      startAngle: sAngle,
      stopAngle: eAngle
    });
  }
}

function drawSpecificShape(x, y, choice, size, startAngle, stopAngle){
  if(choice === 0){
    square(x, y, size);
  }
  else if(choice === 1){
    circle(x, y, size);
  }
  else if(choice === 2){
    rect(x, y, size, size + 50);
  }
  else if(choice === 3){
    let x1 = x;
    let y1 = y - size / 2;
    let x2 = x + size / 3;
    let y2 = y + size / 2;
    let x3 = x - size / 3;
    let y3 = y + size / 2;
    triangle(x1, y1, x2, y2, x3, y3);
  }
  else if(choice === 4){
    arc(x, y, size, size + 50, startAngle, stopAngle, PIE);
  }
}

function mousePressed(){
  if (gameState !== "playing") return;
  for (let i = optionShapes.length - 1; i >= 0; i--) {
    let shape = optionShapes[i];
    let d = dist(mouseX, mouseY, shape.x, shape.y);
    if (d < size / 2) {
      selectedShape = shape; 
      optionShapes.splice(i, 1);
      optionShapes.push(selectedShape);
      break;
    }
  }
}

function mouseDragged(){
  if (gameState !== "playing") return;
  if(selectedShape != null){
    selectedShape.x = mouseX;
    selectedShape.y = mouseY;
    redraw();
  }
}

function mouseReleased(){
  if(selectedShape !== null){
    successCheck();
    selectedShape = null;
    redraw();
  }
}

function draw() {
  background(220);
  if(gameState === "instructions"){
    textAlign(CENTER, CENTER);
    textSize(28);
    text(`Instructions:\n \nClick on New Game to start the game.\n \nDrag the matching pink shape to the blue shape\n to earn a point, strive for a higher score each time!\n \nClick End Game to conclude your playing session.\n \nIf you run into any difficulties,\nyou can click New Shape for a different set of shapes!\n `, windowWidth/2, windowHeight/2 - 30);
  }
  else if(gameState === "playing"){
    fill('#cee4e9');
    drawSpecificShape(baseX, baseY, baseChoice, size, baseStartAngle, baseStopAngle);
  
    fill('#f0dbdb');
    for(let i = 0; i < 5; i++){
      let shape = optionShapes[i];
      drawSpecificShape(shape.x, shape.y, shape.choice, size, shape.startAngle, shape.stopAngle);
    }
    
    //Score Board
    fill('#e6f4e1');
    stroke(0);
    rect(windowWidth/2, 35, 200, 50); 
    fill(0); 
    textSize(16);
    textAlign(CENTER,CENTER);
    text(`Current Score: ${points} points`, windowWidth/2, 35);
  }
  
  else if (gameState === "endScreen"){
    textAlign(CENTER, CENTER);
    textSize(28);
    text(`High Score: ${highScore} points\n Current Score: ${score} points`, windowWidth/2, windowHeight/2);
  }
}

function successCheck(){
  if(selectedShape != null){
    let sameShape = (selectedShape.choice === baseChoice);
    let d = dist(selectedShape.x, selectedShape.y, baseX, baseY);
    let location = (d < difficulty);
    if(sameShape && location){
      success = true;
      console.log("Success!");
      points++;
      newRound();
    }
  }
}

function updateHighScore(){
  if(score > highScore){
    highScore = score;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  home.position(windowWidth - 120, 20);
  newGame.position(windowWidth / 2 - 40, windowHeight - 80);
  endGame.position(windowWidth / 2 - 40, windowHeight - 80);
  redraw();
}