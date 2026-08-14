let passageData;
let words = [];
const dials = [];
let dialFont;
let maxWordLength = 0;

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

  // compute length of largest word in passage
  for (const word of words) {
    const currentLength = word.length;

    if (currentLength > maxWordLength) {
      maxwordLength = currentLength;
    }
  }

  // make an amount of dials equal to the size of the largerst word
  for (let i = 1; i <= maxWordLength; i++) {
    const x = 100 + i * DIALSPACING;
    const y = height / 2;

    dials.push(new Dial(x, y));
    dials[0].moveTo("B");
  }
}

function draw() {
  background(220);
  for (const dial of dials) {
    dial.update();  // Change position every frame
    dial.display(); // Draw current position
  }
  // just testing
  //text(words, 50, 50);
  //let i = 80;
  //for (const j in words) {
  //  text(words[j], i, 80);
  //  i += 50;
  //}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}