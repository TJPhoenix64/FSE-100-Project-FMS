class Note {
  constructor(x, y, noteColor, size) {
    this.x = x;
    this.y = y;
    this.noteColor = noteColor;
    this.size = size;
  }

  update(timeElapsed, levelSpeed) {
    let timeSeconds = timeElapsed / 1000;
    let dy = levelSpeed * timeSeconds;
    this.y = this.y + dy;
  }
  display() {
    fill(this.noteColor);
    noStroke();
    circle(this.x, this.y, this.size);
    stroke(0);
    strokeWeight(1);
  }

  getY() {
    return this.y;
  }

  getX() {
    return this.x;
  }
}
