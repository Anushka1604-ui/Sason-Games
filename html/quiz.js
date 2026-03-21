let score = 0;
let totalQuestions = 0;
let round = 1;
let time = 20;
let correctAnswer;
let quizRunning = false;

const scoreBox = document.getElementById("score");
const timeBox = document.getElementById("time");
const questionBox = document.getElementById("question");
const answerInput = document.getElementById("answer");
const resultBox = document.getElementById("result");
const resultSummary = document.getElementById("summary");

const gameBox = document.getElementById("game-box");
const finalBox = document.getElementById("final-box");

const btnSubmit = document.getElementById("submit");
const btnNext = document.getElementById("next");
const btnReset = document.getElementById("reset");

const btnStart = document.getElementById("start");
const btnStop = document.getElementById("stop");

let timer;

// Generate a question
function generateQuestion() {
    if (!quizRunning) return;

    if (totalQuestions >= 10) {
        endRound();
        return;
    }

    resultBox.textContent = "";
    answerInput.value = "";

    let a = Math.floor(Math.random() * 20) + 1;
    let b = Math.floor(Math.random() * 20) + 1;

    const ops = ["+", "-", "×", "÷"];
    const op = ops[Math.floor(Math.random() * ops.length)];

    if (op === "+") {
        correctAnswer = a + b;
    } else if (op === "-") {
        correctAnswer = a - b;
    } else if (op === "×") {
        correctAnswer = a * b;
    } else {
        a = a * b;
        correctAnswer = a / b;
    }

    questionBox.textContent = `Round ${round} - Q${totalQuestions + 1}:
     ${a} ${op} ${b}`;

    totalQuestions++;
    updateSummary();
    resetTimer();
}

// Timer
function resetTimer() {
    clearInterval(timer);
    time = 15;
    timeBox.textContent = time;

    timer = setInterval(() => {
        if (!quizRunning) return;

        time--;
        timeBox.textContent = time;

        if (time <= 0) {
            clearInterval(timer);
            resultBox.textContent = "⏳ Time Up!";
            setTimeout(() => generateQuestion(), 800);
        }
    }, 1000);
}

// End round
function endRound() {
    quizRunning = false;
    clearInterval(timer);

    gameBox.style.display = "none";
    finalBox.style.display = "block";

    finalBox.innerHTML = `
        <h2>Round ${round} Completed!</h2>
        <p>Your Score: <strong>${score} / 10</strong></p>
        <button id="restart-btn">Start Next Round</button>
    `;

    document.getElementById("restart-btn").addEventListener("click", restartRound);
}

// Update Score Summary
function updateSummary() {
    resultSummary.textContent = `Score: ${score} / ${totalQuestions}`;
}

// Submit answer
btnSubmit.addEventListener("click", () => {
    if (!quizRunning) return;

    let userAnswer = Number(answerInput.value);

    if (userAnswer === correctAnswer) {
        score++;
        scoreBox.textContent = score;
        resultBox.textContent = "✔ Correct!";
    } else {
        resultBox.textContent = "✘ Wrong!";
    }

    updateSummary();
    clearInterval(timer);
});

// Next
btnNext.addEventListener("click", () => {
    if (quizRunning) generateQuestion();
});

// Reset
btnReset.addEventListener("click", restartRound);

// Restart Round
function restartRound() {
    score = 0;
    totalQuestions = 0;
    round++;

    scoreBox.textContent = score;
    updateSummary();
    resultBox.textContent = "";

    finalBox.style.display = "none";
    gameBox.style.display = "block";

    quizRunning = true;
    generateQuestion();
}

// Start
btnStart.addEventListener("click", () => {
    quizRunning = true;
    generateQuestion();
    resultBox.textContent = "Game Started!";
});

// Stop
btnStop.addEventListener("click", () => {
    quizRunning = false;
    clearInterval(timer);
    resultBox.textContent = "⛔ Game Paused!";
});