let randomNumber = Math.floor(Math.random() * 100) + 1;
const guesses = document.querySelector('.guesses');
const result = document.querySelector('.result');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
const resetButton = document.querySelector('.resetButton');
let guessCount = 1;
const time=0;
// timer(time);
let isover=true;
// let resetButton;

function checkGuess() {
  let User = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
  }

  guesses.textContent += User + ' ';

  if (User === randomNumber) {
    result.textContent = 'Congratulations! You got it right!';
    result.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    isover=false;
    setGameOver();
  } else if (guessCount === 10) {
    result.textContent = '!!!GAME OVER!!!';
    lowOrHi.textContent = '';
    setGameOver();
  } else {
    result.textContent = 'Wrong!';
    result.style.backgroundColor = 'red';
    if(User < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!' ;
    } else if(User > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }

  guessCount++;
  guessField.value = '';
}
resetButton.addEventListener('click', resetGame);
guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.appendChild(resetButton);
  
}

// while (isover) {
//     if (time<60) {
//       console.log(time);
//     }else{
//       result.textContent = '!!!GAME OVER!!!';
//       lowOrHi.textContent = '';
//       setGameOver();
//     }
//      time++;
//   }
  

function resetGame() {
  guessCount = 1;
  const resetParas = document.querySelectorAll('.resultParas p');
  for(let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();
  time=0;
  
  randomNumber = Math.floor(Math.random() * 100) + 1;

}