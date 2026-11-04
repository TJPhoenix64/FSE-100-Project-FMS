class Level {
  constructor(numLanes, velocity, noteData) {
    this.numLanes = numLanes;
    this.velocity = velocity;
    this.noteData = noteData;
  }
  /**
   *
   * @param {number} distance - pixels the note will travel from start time to perfect hit
   * @returns time in milliseconds it will take to fall
   */
  calcTravelTimeOOP(distance) {
    return (distance / this.velocity) * 1000;
  }

  length() {
    return this.noteData.length;
  }

  clone() {
    return new Level(
      this.numLanes,
      this.velocity,
      structuredClone(this.noteData)
    );
  }
}
