let level1Button;
let level2Button;
let level3Button;
let level4Button;
function drawLevelSelect() {
  background(220);

  fill(0); // Text color (0 = black)
  textSize(32); // Font size in pixels
  textAlign(CENTER); // Align text horizontally (LEFT, CENTER, or RIGHT)

  // 2. Draw the text
  // Syntax: text("your message", xPosition, yPosition);
  text("Level Select", width / 2, height / 2);
}

function loadLSButtons() {
  level1Button = createButton("Level 1");
  level2Button = createButton("Level 2");
  level3Button = createButton("Level 3");
  level4Button = createButton("Level 4");

  level1Button.position(200, 200);
  level2Button.position(300, 200);
  level3Button.position(400, 200);
  level4Button.position(500, 200);

  level1Button.mousePressed(() => {
    currentScreen = Screen.PLAYING;
    targetLevelNum = 1;
  });

  level2Button.mousePressed(() => {
    currentScreen = Screen.PLAYING;
    targetLevelNum = 2;
  });

  level3Button.mousePressed(() => {
    currentScreen = Screen.PLAYING;
    targetLevelNum = 3;
  });
  level4Button.mousePressed(() => {
    currentScreen = Screen.PLAYING;
    targetLevelNum = 4;
  });
}

function hideLevelSelectButtons() {
  level1Button.hide();
  level2Button.hide();
  level3Button.hide();
  level4Button.hide();
}

function showLevelSelectButtons() {
  level1Button.show();
  level2Button.show();
  level3Button.show();
  level4Button.show();
}
