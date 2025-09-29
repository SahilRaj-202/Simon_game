let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let btns = ["red", "green", "yellow", "blue"];
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game is Started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 1000);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 1000);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randbtn);
}

function checkAns() {
    let idx = userSeq.length - 1;
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br> Press any key to start`;
        highScore();
        
        resetGame();
    }
}

function btnPass() {
    userFlash(this);
    let userColor = this.getAttribute("id");
    userSeq.push(userColor);
    checkAns();

}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPass);

}

function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
function highScore() {
    let highScore = localStorage.getItem("highScore") || 0;
    if (level > highScore) {
        localStorage.setItem("highScore", level);
        h2.innerHTML += `<br>New High Score: <b>${level}</b>`;
    }
}
