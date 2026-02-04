const statusText = document.getElementById("status");
const cells = Array.from(document.querySelectorAll(".cell"));
const newGameButton = document.getElementById("newGame");
const threeDButton = document.getElementById("threeD");
const themeToggle = document.getElementById("themeToggle");
const hackerToggle = document.getElementById("hackerToggle");

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = "X";
let isGameActive = true;

// Initialize game board state
let boardState = Array(9).fill("");

function updateStatus(message) {
  statusText.textContent = message;
}

// Check if the current player has a winning combination
function checkWinner() {
  return winningCombos.some((combo) => {
    const [a, b, c] = combo;
    return (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    );
  });
}

// Handle a cell click event
function handleCellClick(event) {
  const cell = event.currentTarget;
  const cellIndex = cells.indexOf(cell);

  if (!isGameActive || boardState[cellIndex]) {
    return;
  }

  boardState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer === "X" ? "cell--x" : "cell--o");
  cell.disabled = true;

  if (checkWinner()) {
    updateStatus(`Player ${currentPlayer} Wins!`);
    endGame();
    return;
  }

  if (!boardState.includes("")) {
    updateStatus("It's a Draw!");
    endGame();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus(`Current Turn: ${currentPlayer}`);
}

// Prevent any further moves once the game ends
function endGame() {
  isGameActive = false;
  cells.forEach((cell) => {
    cell.disabled = true;
  });
}

// Reset the board and game state
function resetGame() {
  boardState = Array(9).fill("");
  currentPlayer = "X";
  isGameActive = true;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("cell--x", "cell--o");
    cell.disabled = false;
  });

  updateStatus("Current Turn: X");
}

// Toggle between light and cyberpunk themes
function toggleTheme(event) {
  const isChecked = event.target.checked;
  document.body.classList.toggle("theme-cyberpunk", isChecked);

  if (isChecked) {
    document.body.classList.remove("theme-hacker");
    hackerToggle.checked = false;
  }
}

// Toggle between light and hacker themes
function toggleHackerTheme(event) {
  const isChecked = event.target.checked;
  document.body.classList.toggle("theme-hacker", isChecked);

  if (isChecked) {
    document.body.classList.remove("theme-cyberpunk");
    themeToggle.checked = false;
  }
}

// Toggle 3D visual effect
function toggle3D() {
  const isActive = document.body.classList.toggle("theme-3d");
  threeDButton.classList.toggle("button--active", isActive);
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
newGameButton.addEventListener("click", resetGame);
threeDButton.addEventListener("click", toggle3D);
themeToggle.addEventListener("change", toggleTheme);
hackerToggle.addEventListener("change", toggleHackerTheme);
