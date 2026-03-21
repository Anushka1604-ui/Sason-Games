const cards = document.querySelectorAll(".card");
const resetBtn = document.querySelector(".reset-btn");

let firstCard, secondCard;
let lockBoard = false;
let matchedCount = 0;

// Card click
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

function checkMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    matchedCount++;

    resetBoard();

    if (matchedCount === cards.length / 2) {
        setTimeout(() => alert("🎉 You Won!"), 300);
    }
}
  function logoutUser() {
         window.location.href = "/logout";}

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

// Shuffle Cards
function shuffle() {
    cards.forEach(card => {
        let pos = Math.floor(Math.random() * cards.length);
        card.style.order = pos;
    });
}

// Full Reset
function resetGame() {
    matchedCount = 0;

    cards.forEach(card => {
        card.classList.remove("flip");
        card.addEventListener("click", flipCard);
    });

    shuffle();
}

resetBtn.addEventListener("click", resetGame);

shuffle();