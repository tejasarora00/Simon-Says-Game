let gameSeq = [];       // The sequence array that game will show
let userSeq = [];       // The sequence array entered by the user

let btns = ["red", "green", "yellow", "blue"];          // Array of colors

let highestScore = 0;   // Initializing variable for Highest score value
let started = false;    // First initializing started = false
let level = 0;          // Level initialization with 0

let h2 = document.querySelector(".level-heading");         // Accessing value of h2 where level will be shown
let h3 = document.querySelector(".highest-score");

document.addEventListener("keypress", function () {        // If any key pressed, game started if yet not started by compare with false, and change started to true
    if (started == false) {                                // Checking if game is started or not
        // console.log("Game is started");
        started = true;                                    // Changing started to true
        levelUp();                                         // Level-Up
    }
});

function btnFlash(btn) {                                   // Function for flashing the button
    btn.classList.add("flash");                            // Add Class to the btn that flashes so that we can make a flash effect
    setTimeout(function () {                               // Remove flash class after 250ms so that it should blink only for 250ms
        btn.classList.remove("flash");
    }, 250);
}

function levelUp() {
    userSeq = [];                               // Clearing user sequence array value so that the user have to enter the whole sequence again
    level++;                                    // Incrementing value of Level
    h2.innerText = `Level ${level}`;            // Changing heading to uptated level value

    let randomIdx = Math.floor(Math.random() * 4);                      // Generating a random index in array in which we stored colors above
    let randomColor = btns[randomIdx];                                  // Finding random color which random function generated
    let randomBtn = document.querySelector(`.${randomColor}`);          // Accessing random button with its color
    gameSeq.push(randomColor);
    // console.log(gameSeq);
    btnFlash(randomBtn);                                                // Flashing the button 

    if (level-1 > highestScore) {                                         // If level-1 is greater than highest score, then update the highest score value
        highestScore = level-1;                                           
        h3.innerText = `Highest Score: ${highestScore}`;                // Show it to the user
    }
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {                // It will check user_seq and game_seq acc. to index like if game_seq[1] = "red", then if user_seq[1] = "red" then continue
        if (userSeq.length == gameSeq.length) {         // If user_seq and game_seq length is same (user had entered all properly) then LevelUp
            setTimeout(levelUp, 500);
        }
    } else {
        h2.innerHTML = `GAME OVER! You Scored <b>${level-1}</b> <br>Press any key to Play Again`;     // Display Game over Text
        document.querySelector("body").style.backgroundColor = "red";                               // Make background color red
        setTimeout(function () {                                                                    // Set timeout for changing background color to white again after 150ms
            document.querySelector("body").style.backgroundColor = "white";
        }, 150)
        reset();                                                                                    // Call reset function to initialize 
    }
}

function btnPress() {
    let btn = this;
    btnFlash(btn);                                      // btn flash function 

    userColor = btn.getAttribute("id");                 // Get id of btn pressed (i.e. the name of the color)
    userSeq.push(userColor);                            // Push the color entered by user in userSeq array

    checkAns(userSeq.length - 1);                       // Check Ans of user
}

let allBtns = document.querySelectorAll(".btn");        // Accessing buttons with class btn
for (btn of allBtns) {                                  // Looping over buttons to access all
    btn.addEventListener("click", btnPress)
}

function reset() {                                      // Reset Conditions
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}