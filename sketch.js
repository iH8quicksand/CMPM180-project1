let passageData;
let wordsInPassage = [];
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
  wordsInPassage = passageData.passage.split(/\s+/);
  textFont(dialFont); // tells p5 what font to use moving forward

  // compute length of largest word in passage
  for (const word of wordsInPassage) {
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

  setDialsToArrayOfWords(wordsInPassage);
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
    // maybe make character uppercase here?
    dials[i].moveTo(character);
  }
}

function setDialsToArrayOfWords(words) {
  setDialsToWord("HELLO")
  // sleep PAUSELENGTH
  setDialsToWord("WORLD")
}