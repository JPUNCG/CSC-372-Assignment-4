const images = ["rock", "paper", "scissors"];
let wins = 0;
let losses = 0;
let ties = 0;

const playerImgs = document.querySelectorAll(".choice-img");
const computerImg = document.getElementById("computer-img");
const resultText = document.getElementById("result-text");
const winsDisplay = document.getElementById("wins");
const lossesDisplay = document.getElementById("losses");
const tiesDisplay = document.getElementById("ties");
const resetBtn = document.getElementById("reset-btn");

function handlePlayerChoice(event) {

    playerImgs.forEach(img => img.classList.remove("selected"));
    

    const selectedImg = event.target;
    selectedImg.classList.add("selected");
    const playerThrow = selectedImg.id;

    startComputerThinking(playerThrow);
}

function startComputerThinking(playerThrow) {
    resultText.textContent = "Throwing randomly";
    let counter = 0;
    
    const interval = setInterval(() => {
        const randomFakeMove = images[Math.floor(Math.random() * 3)];
        computerImg.src = "images/" + randomFakeMove + ".png";
        counter += 500;

        if (counter >= 3000) {
            clearInterval(interval);
            determineWinner(playerThrow);
        }
    }, 500);
}

function determineWinner(playerMove) {
    const computerMove = images[Math.floor(Math.random() * 3)];
    computerImg.src = "images/" + computerMove + ".png";

    if (playerMove === computerMove) {
        resultText.textContent = "It's a Tie!";
        ties++;
    } else if (
        (playerMove === "rock" && computerMove === "scissors") ||
        (playerMove === "paper" && computerMove === "rock") ||
        (playerMove === "scissors" && computerMove === "paper")
    ) {
        resultText.textContent = "You Win!";
        wins++;
    } else {
        resultText.textContent = "Computer Wins!";
        losses++;
    }

    updateScoreboard();
}

function updateScoreboard() {
    winsDisplay.textContent = wins;
    lossesDisplay.textContent = losses;
    tiesDisplay.textContent = ties;
}

function resetGame() {
    wins = 0;
    losses = 0;
    ties = 0;
    updateScoreboard();
    resultText.textContent = "Choose your move to start!";
    computerImg.src = "images/question-mark.png";
    playerImgs.forEach(img => img.classList.remove("selected"));
}

playerImgs.forEach(img => {
    img.addEventListener("click", handlePlayerChoice);
});

resetBtn.addEventListener("click", resetGame);