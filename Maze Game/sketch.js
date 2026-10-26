// Maze game: click the green box to start, guide the mouse to the red box
// without touching any black wall. Beat a maze to unlock the next one.
//
// To add a maze: copy one of the objects in the `mazes` list, give it its own
// start/finish boxes and walls. Each wall is [x1, y1, x2, y2], same as line().
// Keep walls from touching the start/finish boxes.

let mazes = [
  // ---------- Level 1 (your original maze) ----------
  {
    start: { x: 100, y: 520, s: 80 },
    finish: {  x: 515, y: 100, s: 80 }, 
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
    start: { x: 100, y: 100, s: 80 },
    finish: { x: 520, y: 520, s: 80 },
    walls: [
      [250, 100, 250, 500], // opening at the bottom
      [400, 200, 400, 600], // opening at the top
      [100, 300, 180, 300],
      [250, 400, 330, 400],
      [320, 250, 400, 250],
      [400, 350, 520, 350]
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