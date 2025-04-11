import { wordsList } from './wordsList.js';


const wordDisplay = document.querySelector(".word-display"); 
const keyboardDiv = document.querySelector(".keyboard"); 

    const getRandomWord = () => {
        const {word, hint} = wordsList[Math.floor(Math.random() * wordsList.length)]; 
        console.log(word); 
        document.querySelector(".hint-text b").innerText = hint;
        wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>` ).join(""); 
    
    
    }
   



// keyboard button 
for (let i=97; i <= 122; i++) {
    const button = document.createElement("button"); 
    button.innerText = String.fromCharCode(i)
    keyboardDiv.appendChild(button); 
}

getRandomWord(); 