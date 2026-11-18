let mazes = [
  // ---------- Level 1 ----------
  {
    start: { x: 100, y: 520, s: 80 }, 
    finish: {  x: 520, y: 100, s: 80 }, 
    walls: [
      [300, 500, 300, 300],
      [350, 600, 350, 500],
      [200, 400, 300, 400],
      [400, 350, 300, 350],
      [200, 200, 200, 280],
      [300, 200, 200, 200],
      [300, 250, 300, 300],
      [200, 350, 200, 550],
      [500, 300, 400, 300],
      [500, 300, 500, 200],
      [400, 200, 400, 250],
      [150, 200, 150, 100],
      [300, 100, 300, 200],
      [300, 150, 400, 150],
      [450, 300, 450, 550],
      [400, 150, 400, 200],
      [400, 200, 500, 200],
      [400, 500, 450, 500],
      [450, 500, 500, 500],
      [500, 400, 600, 400],
      [500, 350, 500, 300]
    ]
  },

  //  Level 2
  {
    start: { x: 260, y: 493, s: 40 },
    finish: { x: 455, y: 420, s: 40 },
    walls: [
    [450,510,450,410],
    [450,410,500,410],
    [500,410,500,540],
    [560,540,560,150],
    [450,510,450,600],
    [500,540,560,540],
    [500,150,560,150],
    [450,100,450,260],
    [400,190,500,190],
    [400,190,400,150],
    [400,150,330,150],
    [450,350,525,350],
    [450,350,450,300],
    [450,300,380,300],
    [380,300,380,220],
    [380,220,300,220],
    [525,230,525,470],
    [525,230,560,230],
    [445,540,345,540],
    [345,540,345,470],
    [375,470,410,470],
    [410,470,410,380],
    [410,380,370,380],
    [370,380,370,410],
    [370,410,130,410],
    [130,410,130,380],
    [130,380,100,380],
    [305,415,305,540],
    [305,540,255,540],
    [255,540,255,480],
    [255,480,220,480],
    [185,480,135,480],
    [135,480,135,540],
    [185,480,185,540],
    [185,540,220,540],
    [160,600,160,560],
    [225,540,225,600],
    [130,150,130,300],
    [130,300,180,300],
    [180,300,180,350],
    [180,350,330,350],
    [330,350,330,300],
    [260,300,350,300],
    [180,150,220,150],
    [220,150,220,100],
    [135,220,235,220],
    [235,220,235,180],
    [235,180,300,180],
    [300,180,300,220],
    [300,100,300,140],
    [340,190,340,220],
    [410,250,380,250],
    [235,200,235,270],
    [235,270,200,270],
    [490,250,520,250],
      ]
  },
  // Level 3 
  {
    start: { x: 205, y: 510, s: 30 }, 
    finish: {  x: 110, y: 110, s: 30 }, 
    walls: [ 
    [100,150,200,150],
    [200,150,200,250],
    [200,250,130,250],
    [130,200,130,500],
    [130,500,165,500],
    [165,500,165,535],
    [130,225,160,225],
    [160,150,160,185],
    [130,540,130,565],
    [130,565,230,565],
    [200,565,200,350],
    [200,350,230,350],
    [230,350,230,220],
    [165,470,165,300],
    [165,300,230,300],
    [230,150,230,100],
    [230,150,425,150],
    [200,180,275,180],
    [275,180,275,400],
    [275,400,360,400],
    [360,400,360,450],
    [360,450,400,450],
    [400,450,400,500],
    [280,500,500,500],
    [280,500,280,460],
    [235,460,330,460],
    [235,460,235,420],
    [200,500,240,500],
    [330,500,330,560],
    [330,560,390,560],
    [425,600,425,535],
    [425,530,390,530],
    [240,500,240,510],
    [240,510,240,530],
    [240,530,280,530],
    [280,530,280,600],
    [320,150,320,250],
    [280,290,320,290],
    [320,250,360,250],
    [360,250,360,330],
    [360,330,320,330],
    [320,330,320,370],
    [320,370,400,370],
    [400,250,440,250],
    [440,250,440,290],
    [440,290,400,290],
    [400,290,400,410],
    [400,410,500,410],
    [500,410,500,370],
    [445,410,445,460],
    [445,370,445,330],
    [445,330,555,330],
    [555,330,555,540],
    [555,540,500,540],
    [500,540,500,570],
    [500,570,470,570],
    [470,570,470,540],
    [600,570,570,570],
    [500,330,500,200],
    [500,200,380,200],
    [450,200,450,180],
    [500,100,500,150],
    [500,150,540,150],
    [540,150,540,180],
    [500,250,550,250],
    [500,450,500,500],
    [500,450,550,450],
    [600,290,550,290],
      ]
  }
];

let level = 0;
let gameState = "waiting"; // "waiting", "playing", "lost", "nextLevel", "allDone"

function setup() {
  createCanvas(700, 700);
}

function draw() {
  background(0);
  drawMaze();

  // Check for wall hits BEFORE drawing any text, so the text isn't read as a wall
  if (gameState === "playing") {
    checkPath();
  }

  showMessage();
}

function drawMaze() {
  let m = mazes[level];

  // White maze floor
  noStroke();
  fill(255);
  rect(100, 100, 500);

  // Start (green) and finish (red) boxes, no outline so leaving the
  // start box doesn't count as hitting a wall
  fill(0, 200, 0);
  rect(m.start.x, m.start.y, m.start.s);
  fill(220, 50, 50);
  rect(m.finish.x, m.finish.y, m.finish.s);

  // Outer border + walls
  stroke(0);
  strokeWeight(7);
  noFill();
  rect(100, 100, 500);

  for (let w of m.walls) {
    line(w[0], w[1], w[2], w[3]);
  }
}

// Checks every point between last frame's mouse position and this one,
// so moving the mouse fast can't "jump" over a wall.
function checkPath() {
  let d = dist(pmouseX, pmouseY, mouseX, mouseY);
  let steps = max(1, ceil(d / 2));

  for (let i = 0; i <= steps; i++) {
    let x = lerp(pmouseX, mouseX, i / steps);
    let y = lerp(pmouseY, mouseY, i / steps);
    if (isWall(x, y)) {
      gameState = "lost";
      return;
    }
  }

  if (insideBox(mouseX, mouseY, mazes[level].finish)) {
    if (level < mazes.length - 1) {
      level++;
      gameState = "nextLevel";
    } else {
      gameState = "allDone";
    }
  }
}

// A pixel counts as a wall if it's black (walls and the area outside the maze)
function isWall(x, y) {
  let c = get(round(x), round(y));
  return c[0] < 60 && c[1] < 60 && c[2] < 60;
}

function insideBox(x, y, box) {
  return x > box.x && x < box.x + box.s && y > box.y && y < box.y + box.s;
}

function mousePressed() {
  if (gameState === "allDone") {
    // Start over from level 1
    level = 0;
    gameState = "waiting";
    return;
  }

  if (gameState !== "playing" && insideBox(mouseX, mouseY, mazes[level].start)) {
    gameState = "playing";
  }
}

function showMessage() {
  noStroke();
  textAlign(CENTER, CENTER);

  // Level counter
  fill(180);
  textSize(18);
  text("Level " + (level + 1) + " of " + mazes.length, width / 2, 20);

  // Status message
  textSize(24);
  fill(255);
  if (gameState === "waiting") {
    text("Click the green box to start", width / 2, 55);
  } else if (gameState === "playing") {
    text("Get to the red box without touching the walls!", width / 2, 55);
  } else if (gameState === "lost") {
    fill(255, 80, 80);
    text("You hit a wall! Click the green box to try again", width / 2, 55);
  } else if (gameState === "nextLevel") {
    fill(80, 255, 80);
    text("Level complete! Click the green box for the next maze", width / 2, 55);
  } else if (gameState === "allDone") {
    fill(80, 255, 80);
    text("You beat every maze! Click anywhere to play again", width / 2, 55);
  }
}