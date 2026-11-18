let levelButtons = [];

function drawLevelSelect() {
  background(220);

  fill(0);
  textSize(32);
  textAlign(CENTER);

  text("Level Select", width / 2, height / 2);
  text("GUITAR HERO", width / 2, height / 5);
}

function loadLSButtons() {
  for (let i = 0; i < levelArr.length; i++) {
    let button = createButton("Level " + (i + 1));
    if (i < levelArr.length / 2) {
      button.position(200 + i * 100, 200);
    } else {
      button.position(200 + (i - levelArr.length / 2) * 100, 250);
    }

    button.mousePressed(() => {
      currentScreen = Screen.PLAYING;
      clearNotes();
      targetLevelNum = i + 1;
    });

    levelButtons.push(button);
  }
}

function hideLevelSelectButtons() {
  for (let button of levelButtons) {
    button.hide();
  }
}

function showLevelSelectButtons() {
  for (let button of levelButtons) {
    button.show();
  }
}
