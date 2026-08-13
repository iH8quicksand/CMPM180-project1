
class Dial {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.position = 0;
    this.target = 0;
    this.velocity = 0;
  }

  moveto(character) {
    // Choose a future target position.
    const index = characters.indexOf(character);
    // Add one or more full rotations.
    this.target =
      this.position -
      (this.position % characters.length) +
      characters.length +
      index;
  }

  update() {
    this.position = lerp(this.position, this.target, 0.12)

    if (abs(this.target - this.position) < 0.001) {
      this.position = this.target;
    }
  }

  display() {

  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let currentWord = 0;
  let dials = [];

  loadfont();
}

function draw() {
  background(220);
  Text('hi', 50, 50);
  for (const dial of dials) {
    dial.update();  // Change position every frame
    dial.display(); // Draw current position
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
