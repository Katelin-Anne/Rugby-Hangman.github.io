// List of rugby team names
const teams = [
  "ALL BLACKS",
  "SPRINGBOKS",
  "WALLABIES",
  "ENGLAND",
  "FRANCE",
  "IRELAND",
  "SCOTLAND",
  "WALES",
  "FIJI",
  "JAPAN"
];

// DOM Elements
const wordDisplay = document.getElementById("wordDisplay");
const wrongGuessesDisplay = document.getElementById("wrongGuesses");
const attemptsLeftDisplay = document.getElementById("attemptsLeft");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const restartButton = document.getElementById("restartButton");

// Game variables
let selectedTeam = "";
let correctGuesses = [];
let wrongGuesses = [];
let maxAttempts = 6;

// Initialize the game
function initializeGame() {
  selectedTeam = teams[Math.floor(Math.random() * teams.length)];
  correctGuesses = [];
  wrongGuesses = [];
  maxAttempts = 6;
  message.textContent = "";
  restartButton.style.display = "none";

  // Display the blank word
  displayWord();

  // Reset wrong guesses and attempts
  wrongGuessesDisplay.textContent = "";
  attemptsLeftDisplay.textContent = maxAttempts;

  // Create the keyboard
  createKeyboard();
}

// Display the word with blanks and correct guesses
function displayWord() {
  wordDisplay.textContent = selectedTeam
    .split("")
    .map(letter => (correctGuesses.includes(letter) || letter === " " ? letter : "_"))
    .join(" ");
}

// Create a clickable keyboard
function createKeyboard() {
  keyboard.innerHTML = "";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  letters.split("").forEach(letter => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.onclick = () => handleGuess(letter);
    keyboard.appendChild(button);
  });
}

// Handle a letter guess
function handleGuess(letter) {
  if (correctGuesses.includes(letter) || wrongGuesses.includes(letter)) return;

  if (selectedTeam.includes(letter)) {
    correctGuesses.push(letter);
    displayWord();
    checkWin();
  } else {
    wrongGuesses.push(letter);
    wrongGuessesDisplay.textContent = wrongGuesses.join(", ");
    maxAttempts--;
    attemptsLeftDisplay.textContent = maxAttempts;
    checkLose();
  }
}

// Check if the player has won
function checkWin() {
  if (selectedTeam.split("").every(letter => correctGuesses.includes(letter) || letter === " ")) {
    message.textContent = "You Win! 🎉";
    endGame();
  }
}

// Check if the player has lost
function checkLose() {
  if (maxAttempts === 0) {
    message.textContent = `You Lose! The team was "${selectedTeam}".`;
    endGame();
  }
}

// End the game
function endGame() {
  keyboard.innerHTML = "";
  restartButton.style.display = "block";
}

// Restart the game
restartButton.onclick = initializeGame;

// Start the game on page load
initializeGame();
