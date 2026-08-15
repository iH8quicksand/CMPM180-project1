let passageData;
let words = [];
const dials = [];
let dialFont;
let maxWordLength = 0;

const DIALSPACING = 80;
const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BACKGROUNDCOLOR = 200;
const LEFTPADDING = 400;
const PAUSELENGTH = 100;

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
      maxWordLength = currentLength;
    }
  }

  // make an amount of dials equal to the size of the largerst word
  for (let i = 1; i <= maxWordLength; i++) {
    const x = LEFTPADDING + i * DIALSPACING;
    const y = height / 2;

    dials.push(new Dial(x, y));
  }

  // just testing
  dials[0].moveTo("N");
  dials[1].moveTo("V");
  dials[2].moveTo("I");
  dials[3].moveTo("D");
  dials[4].moveTo("I");
  dials[5].moveTo("A");

  setDialsToWord("HELLO")

}

function draw() {
  background(BACKGROUNDCOLOR);
  for (const dial of dials) {
    dial.update();  // Change position every frame
    dial.display(); // Draw current position
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setDialsToWord(word) {
  for (let i = 0; i < word.length; i++) {
    const character = word[i] ?? " ";
    dials[i].moveTo(character);
  }
}