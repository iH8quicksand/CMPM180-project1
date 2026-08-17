let passageData;
let wordsInPassage = [];
const dials = [];
let dialFont;
let maxWordLength = 0;

const DIALSPACING = 80;
const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.;:!?";
const BACKGROUNDCOLOR = 210;
const LEFTPADDING = 200;
const PAUSELENGTH = 1700;



function preload() {
  passageData = loadStrings("passage.txt");
  dialFont = loadFont("assets/Helvetica.ttf")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  wordsInPassage = parsePassage(passageData.join("\n"));

  logPassageDuration(wordsInPassage);

  textFont(dialFont); // tells p5 what font to use moving forward

  maxWordLength = getMaxWordLength(wordsInPassage);
  createDials(maxWordLength);
  displayWords(wordsInPassage);
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
    const character = word[i] ?? "A";
    // maybe make character uppercase here?
    dials[i].moveTo(character);
  }
}

function getMaxWordLength(words) {
  let largestLength = 0;

  for (const word of words) {
    if (word.length > largestLength) {
      largestLength = word.length;
    }
  }

  return largestLength;
}

function createDials(numberOfDials) {
  for (let i = 1; i <= numberOfDials; i++) {
    const x = LEFTPADDING + i * DIALSPACING;
    const y = height / 2;

    dials.push(new Dial(x, y));
  }
}

async function displayWords(words) {
  for (const word of words) {
    await pause(PAUSELENGTH);
    setDialsToWord(word);
  }
}

// i have no clue how this works
function pause(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function parsePassage(passage) {
  return passage
    .toUpperCase()
    .split(/\s+/)
    .map(word =>
      [...word]
        .filter(character => CHARACTERS.includes(character))
        .join("")
    )
    .filter(word => word.length > 0);
}

function logPassageDuration(words) {
  const totalSeconds = Math.round(words.length * PAUSELENGTH / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  console.log(
    `The whole passage will take ${minutes} minute(s) and ${seconds} second(s) to play.`
  );
}