let playerScore = 0;
let computerScore = 0;
let currentGameMode = 3; // Default to best of 3

const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
const resultMessage = document.getElementById("result-message");
const finalResult = document.getElementById("final-result");
const gameOverSection = document.getElementById("game-over");
const restartButton = document.getElementById("restart");
const mode3Button = document.getElementById("mode-3");
const mode5Button = document.getElementById("mode-5");

const choices = ["rock", "paper", "scissors"];

// Add event listeners for buttons
document.querySelectorAll(".choice").forEach((button) => {
  button.addEventListener("click", () => playRound(button.id));
});

restartButton.addEventListener("click", restartGame);

// Add event listeners for game mode buttons
mode3Button.addEventListener("click", () => setGameMode(3));
mode5Button.addEventListener("click", () => setGameMode(5));

function setGameMode(mode) {
  if (playerScore > 0 || computerScore > 0) {
    if (!confirm("Changing game mode will restart the game. Continue?")) {
      return;
    }
    restartGame();
  }
  
  currentGameMode = mode;
  mode3Button.classList.toggle("active", mode === 3);
  mode5Button.classList.toggle("active", mode === 5);
}

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function playRound(playerChoice) {
  const winningScore = Math.ceil(currentGameMode / 2);
  if (playerScore >= winningScore || computerScore >= winningScore) return;

  const computerChoice = getComputerChoice();
  if (playerChoice === computerChoice) {
    resultMessage.textContent = `It's a tie! You both chose ${playerChoice}.`;
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    playerScore++;
    resultMessage.textContent = `You win! ${playerChoice} beats ${computerChoice}.`;
  } else {
    computerScore++;
    resultMessage.textContent = `You lose! ${computerChoice} beats ${playerChoice}.`;
  }

  updateScores();
  checkGameOver();
}

function updateScores() {
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
}

function checkGameOver() {
  const winningScore = Math.ceil(currentGameMode / 2);
  if (playerScore === winningScore || computerScore === winningScore) {
    gameOverSection.classList.remove("hidden");
    if (playerScore === winningScore) {
      finalResult.textContent = "Congratulations! You won the game!";
    } else {
      finalResult.textContent = "Game Over! The computer won.";
    }
  }
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  updateScores();
  resultMessage.textContent = "Make your move!";
  gameOverSection.classList.add("hidden");
}
