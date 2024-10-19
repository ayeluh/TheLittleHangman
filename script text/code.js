const hangmanImg = document.querySelector(".hangman-display img");
const wordDisplay = document.querySelector(".word-display");
const guessText = document.querySelector(".guess-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameEnd = document.querySelector(".game-end");
const playAgainBtn = document.querySelector(".new-game");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImg.src = `hangman images/hangman-${wrongGuessCount}.svg`;
    guessText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => '<li class="letter"></li>').join("");
    gameEnd.classList.remove("show");
}

const gameOver = (isVictory) => {
    setTimeout(() =>{
        const modalText = isVictory ? `You found the word: ` : `The correct word was: `
        gameEnd.querySelector("img").src = `hangman images/${isVictory ? `win` : `lost`}.gif`;
        gameEnd.querySelector("h4").innerText = `${isVictory ? `WOW WATANAYS\nbigyan ng jacket!` : `Bahala ka diha\nnapilde naka!`}`;
        gameEnd.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameEnd.classList.add("show");
    }, 250);
}

const getRandomWord = () => {
    const {word, clue} = wordBox[Math.floor(Math.random() * wordBox.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = clue;
    resetGame();
}

const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, website) => {
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[website].innerText = letter;
                wordDisplay.querySelectorAll("li")[website].classList.add("guessed");
            }
        })
    }
    else{
        wrongGuessCount++;
        hangmanImg.src = `hangman images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if(wrongGuessCount === maxGuesses) return gameOver (false);
    if(correctLetters.length === currentWord.length) return gameOver (true);
}

for (let i = 97; i <= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);