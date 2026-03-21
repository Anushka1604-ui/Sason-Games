let blocks = document.querySelectorAll(".box");
let win = document.querySelector(".msg-container-hide");
let new_btn = document.querySelector("#ng");
let reset_btn = document.querySelector("#reset-btn");
let winner = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns  = [
  [0,1,2],[0,3,6],[0,4,8],
  [1,4,7],[2,5,8],[2,4,6],
  [3,4,5],[6,7,8]
];

// 🟦 Hide block area (container)
let board = document.querySelector(".game-container"); 
// ⚠️ Add class "game-container" to your block parent in HTML

// filling boxes properly
blocks.forEach((box)=> {
  box.addEventListener("click", ()=> {

    if(turnO){
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if(count === 9 && !isWinner){
      gameDraw();
    }
  });
});


// IF GAME IS DRAW
const gameDraw = () => {
  winner.innerText = `Game was a draw`;
  win.classList.remove("hide");

  hideBoard();   // 🟦 Hide blocks
};


// HIDE ALL BLOCKS (complete board)
const hideBoard = () => {
  board.classList.add("hide");
};

// SHOW BLOCKS BACK
const showBoard = () => {
  board.classList.remove("hide");
};

// DISABLE ALL BOXES
const disabledBoxes = () => {
  blocks.forEach(box => box.disabled = true);
};

// ENABLE ALL BOXES
const enabledBoxes = () => {
  blocks.forEach(box => {
    box.disabled = false;
    box.innerText = "";
  });
};


// PRINT WINNER 
const showWinner = (winnerplay)=> {
  winner.innerText = `Congratulations! Winner is ${winnerplay}`;
  win.classList.remove("hide");

  hideBoard(); // 🟦 Hides the game board
};


// CHECK WINNER
const checkWinner = () => {
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
};


// RESET GAME 
const resetGame = () => {
  turnO = true;
  count = 0;

  enabledBoxes();
  win.classList.add("hide");
  showBoard();    // 🟦 Show game board again
};

new_btn.addEventListener("click", resetGame);
reset_btn.addEventListener("click", resetGame);
function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
}