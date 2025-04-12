import { wordsList } from './wordsList.js';


const wordDisplay = document.querySelector(".word-display"); 
const guessesText = document.querySelector(".lives b");
const keyboardDiv = document.querySelector(".keyboard"); 


let currentWord, correctLetters =[];
let  livesLeft = 9;  

// get random word from list 
const getRandomWord = () => {
        const {word, hint} = wordsList[Math.floor(Math.random() * wordsList.length)]; 
        currentWord = word; 
        console.log(word); 
        document.querySelector(".hint-text b").innerText = hint;
        wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>` ).join(""); 
    
    
}

const gameOver  = (isVictory) => {
    setTimeout(() => {
       if (isVictory) {
        window.location.href = "gameWon.html"; 
       } else {
        window.location.href = "gameLost.html"; 
        }
    }, 300);
}
// check if letter is part of the word or not 
const initGame = (button, clickedLetter) => {
    if ( currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter ===clickedLetter) {
                correctLetters.push(letter); 
                wordDisplay.querySelectorAll("li")[index].innerText = letter; 
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed"); 
            }
        }); 
    } else {
        livesLeft--; 
    }
    guessesText.innerText = `${livesLeft}`; 

    if (livesLeft === 0) return gameOver(false); 
    if (correctLetters.length === currentWord.length) return gameOver(true); 
}


// keyboard button 
for (let i=97; i <= 122; i++) {
    const button = document.createElement("button"); 
    button.innerText = String.fromCharCode(i)
    keyboardDiv.appendChild(button); 
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)) ); 
}

getRandomWord(); 