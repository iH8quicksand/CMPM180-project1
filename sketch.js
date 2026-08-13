let passageData;
let words = [];
const dials = [];
let dialFont;

const DIALSPACING = 80;
const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BACKGROUNDCOLOR = 200;

function preload() {
  passageData = loadJSON("passage.json");
  dialFont = loadFont("assets/Helvetica.ttf")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  words = passageData.passage.split(/\s+/);
  textFont(dialFont); // tells p5 what font to use moving forward
}

function draw() {
  background(220);
  for (const dial of dials) {
    dial.update();  // Change position every frame
    dial.display(); // Draw current position
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
