let gameStatusDisplay = document.querySelector('.game-status')
const cells = document.querySelectorAll('.cells')
const restartBtn = document.querySelector('#restart-btn')

const playerX = 'X'
const playerO = 'O'
let currentPlayer = playerX
let gameActive = true
let gameState = ['', '', '', '', '', '', '', '', '']

const winningStates = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
]

function checkGameStatus() {
  let roundWon = false
  for (let i = 0; i < winningStates.length; i++) {
    const winState = winningStates[i]
    let tic = gameState[winState[0]]
    let tac = gameState[winState[1]]
    let toe = gameState[winState[2]]
    if (tic === '' || tac === '' || toe === '') {
      continue
    }

    if (tic === tac && tac === toe) {
      roundWon = true
      break
    }
  }

  if (roundWon) {
    gameStatusDisplay.innerHTML = `The winner is ${currentPlayer}`
    gameActive = false
    return
  }

  let roundTie = !gameState.includes('')
  if (roundTie) {
    gameStatusDisplay.innerHTML = "It's a tie"
    gameActive = false
    return
  }
}

function currentPlayerDisplay() {
  gameStatusDisplay.innerHTML = `The current player is ${currentPlayer}`
}

function switchPlayer() {
  if (!gameActive) {
    return
  }

  if (currentPlayer === playerX) {
    currentPlayer = playerO
  } else {
    currentPlayer = playerX
  }
  currentPlayerDisplay()
}

function handleCellClick(event) {
  const clickedCell = event.target
  const clickedCellIndex = parseInt(clickedCell.id)

  if (clickedCell.innerHTML !== '' || !gameActive) {
    return
  }

  clickedCell.innerHTML = currentPlayer
  gameState[clickedCellIndex] = currentPlayer

  checkGameStatus()
  switchPlayer()
}

function handleRestart() {
  gameActive = true
  currentPlayer = playerX
  gameState = ['', '', '', '', '', '', '', '', '']
  currentPlayerDisplay()
  document.querySelectorAll('.cells').forEach((i) => (i.innerHTML = ''))
}

;(function startGame() {
  currentPlayerDisplay()
  cells.forEach((i) => i.addEventListener('click', handleCellClick))
  restartBtn.addEventListener('click', handleRestart)
})()

module.exports = { gameState }
