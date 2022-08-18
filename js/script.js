let x = document.querySelector(".x");
let o = document.querySelector(".o");
let boxes = document.querySelectorAll(".box");
let boxContainer = document.querySelector('#container');
let versusInfo = document.querySelector('#versus-info');
let btn1 = document.querySelector('#player-1');
let btn2 = document.querySelector('#players-2');
let menubtn = document.querySelector('#menu-button')
let clearbtn = document.querySelector('#clear-button')
let messageContainer = document.querySelector("#message");
let messageText = document.querySelector("#message p");
let randomGuess = false;

menubtn.addEventListener('click', ()=>{
    menubtn.classList.add("hide");
    versusInfo.classList.add('hide');
    clearbtn.classList.add("hide");
    btn1.classList.remove("hide");
    btn2.classList.remove("hide");
    boxContainer.classList.add("hide");
    let scoreboardX = document.querySelector('#scoreboard-1');
    let scoreboardY = document.querySelector('#scoreboard-2');
    scoreboardX.textContent = 0;
    scoreboardY.textContent = 0;
    clearBoard()
})

clearbtn.addEventListener('click', ()=>{
    clearBoard()
})

btn1.addEventListener('click', ()=>{
    menubtn.classList.remove('hide');
    clearbtn.classList.remove('hide');
    versusInfo.innerHTML = "Player vs I.A.";
    versusInfo.classList.remove('hide');
    btn1.classList.add("hide");
    btn2.classList.add("hide");
    boxContainer.classList.remove("hide");
    randomGuess = true;
})
btn2.addEventListener('click', ()=>{
    boxContainer.classList.remove("hide")
    versusInfo.innerHTML = "Player 1 vs Player 2";
    versusInfo.classList.remove('hide');
    clearbtn.classList.remove('hide');
    btn1.classList.add("hide");
    btn2.classList.add("hide");
    menubtn.classList.remove('hide');
    randomGuess = false;
})

// Count how many turn
let turnCount = 0;

// Listeners of blocks
for(let i=0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', buttonsFunction);
}

// Buttons Funtion
function buttonsFunction() {
    let el = checkEl();
        // Verify if the space is empty
        if(this.childNodes.length == 0) {
            let cloneEl = el.cloneNode(true);
            this.appendChild(cloneEl);

            // Save next turn
            turnCount++;
            checkForWinner(); // After the Player Choice
            if(randomGuess == true && (turnCount%2)==1) {
                machineChoice();
            }
        }
}
function machineChoice() {
    let emptySpaces = document.querySelectorAll('.box:empty');

    let emptyBox = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
    let el = checkEl();
    let cloneEl = el.cloneNode(true);
    emptyBox.appendChild(cloneEl);

    // Save next turn
    turnCount++;
    checkForWinner();// After random choice
}

// Who is the player?
function checkEl() {
    if((turnCount%2)==0) {
        return x; // X
    } else {
        return o; // O
    }
}

// Reset board
function clearBoard() {
    // Reset players turn
    turnCount = 0;

    // Reset Boxes
    let boxesToRemove = document.querySelectorAll('.box div');

    for (let i = 0; i < boxesToRemove.length; i++) {
        boxesToRemove[i].parentNode.removeChild(boxesToRemove[i]);
    }
}

// Identify who is the winner
function checkForWinner() {
    let b1 = document.querySelector('#block-1');
    let b2 = document.querySelector('#block-2');
    let b3 = document.querySelector('#block-3');
    let b4 = document.querySelector('#block-4');
    let b5 = document.querySelector('#block-5');
    let b6 = document.querySelector('#block-6');
    let b7 = document.querySelector('#block-7');
    let b8 = document.querySelector('#block-8');
    let b9 = document.querySelector('#block-9');

    if (b5.childNodes.length != 0) {
        let b5class = b5.childNodes[0].className;
        if (b1.childNodes.length != 0 && b1.childNodes[0].className == b5class) {
            if (b9.childNodes.length != 0 && b9.childNodes[0].className == b5class) {
                return announceWinner(b5class);
            }
        } if (b2.childNodes.length != 0 && b2.childNodes[0].className == b5class ) {
            if (b8.childNodes.length != 0 && b8.childNodes[0].className == b5class) {
                return announceWinner(b5class);
            }
        } if (b3.childNodes.length != 0 && b3.childNodes[0].className == b5class) {
            if (b7.childNodes.length != 0 && b7.childNodes[0].className == b5class) {

                return announceWinner(b5class);
            }
        } if (b4.childNodes.length != 0 && b4.childNodes[0].className == b5class) {
            if (b6.childNodes.length != 0 && b6.childNodes[0].className == b5class) {
                return announceWinner(b5class);
            }
        }
    } if (b1.childNodes.length != 0) {
        let b1class = b1.childNodes[0].className;
        if (b2.childNodes.length != 0 && b2.childNodes[0].className == b1class) {
            if (b3.childNodes.length != 0 && b3.childNodes[0].className == b1class) {
                return announceWinner(b1class);
            }
        } if (b4.childNodes.length != 0 && b4.childNodes[0].className == b1class) {
            if (b7.childNodes.length != 0 && b7.childNodes[0].className == b1class) {
                return announceWinner(b1class);
            }
        }
    } if (b9.childNodes.length != 0) {
        let b9class = b9.childNodes[0].className;
        if (b8.childNodes.length != 0 && b8.childNodes[0].className == b9class) {
            if (b7.childNodes.length != 0 && b7.childNodes[0].className == b9class) {
                return announceWinner(b9class);
            }
        } if (b6.childNodes.length != 0 && b6.childNodes[0].className == b9class) {
            if (b3.childNodes.length != 0 && b3.childNodes[0].className == b9class) {
                return announceWinner(b9class);
            }
        }
    } if (turnCount == 9) {
        return announceWinner(null)
    }
}

// Clear game and Show the winner

function announceWinner(winner) {
    let msg = '';
    if (winner == 'x') {
        let scoreboardX = document.querySelector('#scoreboard-1')
        scoreboardX.textContent = parseInt(scoreboardX.textContent) + 1;
        msg = "The winner is Player 1!";
    } else if (winner == 'o') {
        let scoreboardY = document.querySelector('#scoreboard-2')
        scoreboardY.textContent = parseInt(scoreboardY.textContent) + 1;
        msg = "The winner is Player 2!";
    } else {
        msg = "Draw";
    }

    // Show message
    messageText.innerHTML = msg;
    messageContainer.classList.remove("hide")

    // Hidde msg
    setTimeout(()=> {
        messageContainer.classList.add('hide');
    }, 2500)

    clearBoard();
}