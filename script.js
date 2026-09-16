const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const player1Input = document.getElementById('player1Name');
const player2Input = document.getElementById('player2Name');
const confirmBtn = document.getElementById('confirmBtn');
const board = document.getElementById('board');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let namesConfirmed = false;
let gameActive = false;

let boardState = ['', '', '', '', '', '', '', '', ''];

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function getPlayerName(mark) {
  if (mark === 'X') {
    return player1Input.value.trim() || 'Player 1';
  } else {
    return player2Input.value.trim() || 'Player 2';
  }
}

function checkWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return boardState[a];
    }
  }
  return null;
}

function checkDraw() {
  return boardState.every(cell => cell !== '');
}

board.classList.add('disabled');

confirmBtn.addEventListener('click', () => {
  namesConfirmed = true;
  gameActive = true;

  player1Input.disabled = true;
  player2Input.disabled = true;
  confirmBtn.disabled = true;

  board.classList.remove('disabled');
  statusText.textContent = `${getPlayerName('X')}'s turn`;
});

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (!namesConfirmed || !gameActive) return;

    const index = cell.dataset.index;
    if (boardState[index] !== '') return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'x-mark' : 'o-mark');

    const winner = checkWinner();

    if (winner) {
      statusText.textContent = `${getPlayerName(winner)} wins!`;
      gameActive = false;
      resetBtn.style.display = 'inline-block';
      return;
    }

    if (checkDraw()) {
      statusText.textContent = `It's a draw!`;
      gameActive = false;
      resetBtn.style.display = 'inline-block';
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${getPlayerName(currentPlayer)}'s turn`;
  });
});

resetBtn.addEventListener('click', () => {
  boardState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x-mark', 'o-mark');
  });
  currentPlayer = 'X';
  gameActive = true;
  resetBtn.style.display = 'none';
  statusText.textContent = `${getPlayerName('X')}'s turn`;
});