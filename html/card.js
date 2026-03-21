const cards = document.querySelectorAll(".card");
const resetBtn = document.querySelector(".reset-btn");
const timerDisplay = document.getElementById("timer");

const GAME_TIME = 40; // 40 seconds
let firstCard, secondCard;
let lockBoard = false;
let matchedCount = 0;
let timer;
let timeLeft = GAME_TIME;

// ------------------------------
// CARD CLICK
// ------------------------------
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkMatch();
}

// ------------------------------
// CHECK MATCH
// ------------------------------
function checkMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    matchedCount++;
    resetBoard();

    // WIN CHECK
    if (matchedCount === cards.length / 2) {
        clearInterval(timer);
        setTimeout(() => alert("🎉 You Won!"), 300);
    }
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// ------------------------------
// SHUFFLE CARDS
// ------------------------------
function shuffle() {
    cards.forEach(card => {
        let pos = Math.floor(Math.random() * cards.length);
        card.style.order = pos;
    });
}

// ------------------------------
// FULL RESET GAME
// ------------------------------
function resetGame() {
    matchedCount = 0;
    timeLeft = GAME_TIME;
    clearInterval(timer);

    cards.forEach(card => {
        card.classList.remove("flip");
        card.addEventListener("click", flipCard);
    });

    shuffle();
    startTimer();
}

// ------------------------------
// LOGOUT FUNCTION
// ------------------------------
function logoutUser() {
    window.location.href = "/logout";
}

// ------------------------------
// TIMER FUNCTION
// ------------------------------
function startTimer() {
    timerDisplay.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("⏰ Time's up! You lost the game.");
            resetGame();
        }
    }, 1000);
}

// ------------------------------
// INITIALIZE GAME
// ------------------------------
resetBtn.addEventListener("click", resetGame);
shuffle();
startTimer();