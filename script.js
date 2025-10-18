const board = document.getElementById("board");
const resultScreen = document.getElementById("resultScreen");
const resultMessage = document.getElementById("resultMessage");
const newGameBtn = document.getElementById("newGameBtn");

let currentPlayer = "X";
let gameActive = true;
let cells = Array(9).fill("");

function createBoard() {
  board.innerHTML = "";
  cells.fill("");
  gameActive = true;
  currentPlayer = "X";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || cells[index] !== "") return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    showResult(`${currentPlayer} Wins!`);
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell !== "")) {
    showResult("It's a Draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
  const winningCombos = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];

  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function showResult(message) {
  resultMessage.textContent = message;
  resultScreen.classList.remove("hidden");
}

newGameBtn.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  createBoard();
});

createBoard();
