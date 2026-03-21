let stone = document.querySelector(".stn");
let paper = document.querySelector(".ppr");
let scissor = document.querySelector(".sc");

let yourScore = 0;
let compScore = 0;

let youText = document.querySelector(".you");
let compText = document.querySelector(".comp");
let resultBtn = document.querySelector(".resultbtn .res");
let restartBtn = document.querySelector(".restart");

// 👉 NEW: choice display elements
let youChoiceText = document.querySelector(".you-choice");
let compChoiceText = document.querySelector(".comp-choice");

// ---- Computer Random Choice ----
function computerChoice() {
    let options = ["stone", "paper", "scissor"];
    return options[Math.floor(Math.random() * 3)];
}

// ---- Decide Winner ----
function checkWinner(user, comp) {
    if (user === comp) return "DRAW";

    if (
        (user === "stone" && comp === "scissor") ||
        (user === "paper" && comp === "stone") ||
        (user === "scissor" && comp === "paper")
    ) {
        yourScore++;
        return "YOU WIN!";
    }

    compScore++;
    return "COMPUTER WINS!";
}

// ---- Update UI ----
function updateScores() {
    youText.textContent = yourScore;
    compText.textContent = compScore;
}

// ---- When user clicks any option ----
function playGame(userChoice) {
    let comp = computerChoice();
    let result = checkWinner(userChoice, comp);

    // 👉 show choices
    youChoiceText.textContent = userChoice.toUpperCase();
    compChoiceText.textContent = comp.toUpperCase();

    resultBtn.textContent = "Result: " + result;
    updateScores();

    restartBtn.style.display = "inline-block";
}

// ---- Listeners ----
stone.addEventListener("click", () => playGame("stone"));
paper.addEventListener("click", () => playGame("paper"));
scissor.addEventListener("click", () => playGame("scissor"));

// ---- Restart Game ----
restartBtn.addEventListener("click", () => {
    yourScore = 0;
    compScore = 0;

    updateScores();
    resultBtn.textContent = "Result:";

    // 👉 reset choices
    youChoiceText.textContent = "-";
    compChoiceText.textContent = "-";

    restartBtn.style.display = "none";
});
 function logoutUser() {
    window.location.href = "/logout";}