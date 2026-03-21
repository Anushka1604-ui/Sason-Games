let blocks = document.querySelectorAll(".box");
let winBox = document.querySelector(".msg-container-hide");
let newBtn = document.querySelector("#ng");
let resetBtn = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg");

let board = document.querySelector(".game-container");

let turnO = true;  // user = O
let count = 0;     // move counter

// All win patterns
const winPatterns  = [
  [0,1,2], [0,3,6], [0,4,8],
  [1,4,7], [2,5,8], [2,4,6],
  [3,4,5], [6,7,8]
];


// ------------------------------
// USER MOVE
// ------------------------------
blocks.forEach((box) => {
  box.addEventListener("click", () => {

    if(turnO) {
      box.innerText = "O";   // player move
      box.disabled = true;
      turnO = false;
      count++;

      let win = checkWinner();
      if(win) return;

      if(count < 9) {
        setTimeout(computerMove, 500); // slight delay for realism
      }
    }

    if(count === 9 && !checkWinner()) {
      gameDraw();
    }
  });
});


// ------------------------------
// COMPUTER MOVE
// ------------------------------
function computerMove() {
  let empty = [];

  blocks.forEach((box, index) => {
    if(box.innerText === "") empty.push(index);
  });

  if(empty.length === 0) return;

  let rand = empty[Math.floor(Math.random() * empty.length)];

  blocks[rand].innerText = "X";
  blocks[rand].disabled = true;

  count++;

  let win = checkWinner();
  if(win) return;

  turnO = true;
}



// ------------------------------
// CHECK WINNER
// ------------------------------
function checkWinner() {
  for(let pattern of winPatterns){
    let p1 = blocks[pattern[0]].innerText;
    let p2 = blocks[pattern[1]].innerText;
    let p3 = blocks[pattern[2]].innerText;

    if(p1 !== "" && p2 !== "" && p3 !== ""){
      if(p1 === p2 && p2 === p3){

        showWinner(p1);
        return true;
      }
    }
  }
  return false;
}



// ------------------------------
// SHOW RESULT
// ------------------------------
function showWinner(winner) {
  msg.innerText = `Winner is ${winner}`;
  winBox.classList.remove("hide");
  hideBoard();
}

function gameDraw() {
  msg.innerText = "Game Draw!";
  winBox.classList.remove("hide");
  hideBoard();
}



// ------------------------------
// BOARD CONTROL
// ------------------------------
function hideBoard() {
  board.classList.add("hide");
}

function showBoard() {
  board.classList.remove("hide");
}



// ------------------------------
// RESET GAME
// ------------------------------
function resetGame() {
  turnO = true;
  count = 0;

  blocks.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });

  winBox.classList.add("hide");
  showBoard();
}

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
}