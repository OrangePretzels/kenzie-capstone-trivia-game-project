let playerTopScore = 0;
let playerMistakesLeft = 1;
let playerCurrentScore = 0;

const tst = document.querySelector(".topscore")
tst.innerHTML = playerTopScore;

const mistakesLeft = document.querySelector(".score")
mistakesLeft.innerHTML = playerMistakesLeft

const currentScore = document.querySelector(".currentscore")
currentScore.innerHTML = playerCurrentScore

const button = document.querySelector('.check')
const retryButton = document.querySelector('.again')

const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
  };


const url = `https://jservice.kenzie.academy/api/random-clue`



async function getTrivia(){
    let response = await fetch(url);
    let data = response.json();
    return data;
}


function generateNewQuestion(){

} 

let question = getTrivia().then((data) => {
  let currentQuestion = data.question
  let currentCategory = data.category.title
  let currentAnswer = data.answer.toLowerCase().replace("'","").replace('"','')
  let currentData = data;

  document.getElementById('question').innerHTML = currentQuestion
  document.getElementById('category').innerHTML = currentCategory

  console.log(currentAnswer);
  console.log(currentData); 



getTrivia().then((data) => {
document.querySelector('.check').addEventListener('click', function () {



  const currentGuess = (document.querySelector('.guess').value.toLowerCase().replace("'","").replace('"',''));
  console.log(currentGuess);


     if (!currentGuess) {
      displayMessage('You did not type anything')
    } else if(currentGuess === currentAnswer){
      playerCurrentScore++;
      currentScore.innerHTML = playerCurrentScore;
      document.getElementById('question').innerHTML = currentQuestion
      document.getElementById('category').innerHTML = currentCategory
      displayMessage('Correct')
      setTimeout(() => {getTrivia().then(data)
        let currentQuestion = data.question
        let currentCategory = data.category.title
        let currentAnswer = data.answer.toLowerCase().replace("'","").replace('"','')
        document.getElementById('question').innerHTML = currentQuestion
        document.getElementById('category').innerHTML = currentCategory
        console.log(currentAnswer);}, 3000);
        if (currentScore > tst){
          currentScore = tst;
        }
    } else if (currentGuess != currentAnswer){
      playerMistakesLeft--;
      mistakesLeft.innerHTML = playerMistakesLeft
      button.disabled = true
      displayMessage('You Lose!');
      setTimeout(() => {displayMessage('Click Retry to start over')}, 2000);
    }
  
})
})
getTrivia().then((data) => {
  document.querySelector('.again').addEventListener('click', function () {
      button.disabled = false
  
      score = 1;
      displayMessage('Try for a better score!');
      document.querySelector('.score').textContent = score;
 
      let clues = data.question
      document.getElementById('question').innerHTML = clues

      let hiddenAnswer = data.answer.toLowerCase().replace("'","").replace('"','')
      console.log(hiddenAnswer)

      let category = data.category.title
      document.getElementById('category').innerHTML = category
  
   });
  })

})
























