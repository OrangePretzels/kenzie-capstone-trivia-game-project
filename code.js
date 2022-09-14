let playerTopScore = 0;
const topScoreText = document.querySelector(".topscore")
topScoreText.innerHTML = playerTopScore;

let playerMistakesLeft = 1;
const mistakesLeftText = document.querySelector(".score")
mistakesLeftText.innerHTML = playerMistakesLeft

let playerCurrentScore = 0;
const currentScoreText = document.querySelector(".currentscore")
currentScoreText.innerHTML = playerCurrentScore

let hiddenAnswer = '';

const checkButton = document.querySelector('.check')
const retryButton = document.querySelector('.retry')

let questionText = document.querySelector('#question')
questionText.innerHTML = ''

let categoryText = document.querySelector('#category')
categoryText.innerHTML = ''

const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
  };

function generateRandomColor(){
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}

const triviaGenerator = async () => {
  const res = await axios.get(`https://jservice.kenzie.academy/api/random-clue`)
  const question = res.data.question;
  const category = res.data.category.title;
  hiddenAnswer = res.data.answer.toLowerCase().replace("'","").replace('"','');
  questionText.innerHTML = question;
  categoryText.innerHTML = category;
  console.log(hiddenAnswer)
}

console.log(triviaGenerator())

checkButton.addEventListener('click', function(){

  const currentGuess = (document.querySelector('.guess').value.toLowerCase().replace("'","").replace('"',''));

  if (!currentGuess) {
    displayMessage('You did not type anything')
  } 

  else if(currentGuess === hiddenAnswer){
    playerCurrentScore++;
    currentScoreText.innerHTML = playerCurrentScore
    triviaGenerator();
    displayMessage('Correct')
      
      if (playerCurrentScore >= playerTopScore){
        topScoreText.innerHTML = playerCurrentScore;
        playerTopScore = playerCurrentScore;
        setTimeout(()=>{
          topScoreText.style.color = generateRandomColor();
        },1000)
      }
  } 

  else if (currentGuess != hiddenAnswer) {
    playerMistakesLeft--;
    mistakesLeftText.innerHTML = playerMistakesLeft
    checkButton.disabled = true
    displayMessage('You Lose!');
    setTimeout(() => {displayMessage('Click Retry to start over')}, 1000);
  }


})

retryButton.addEventListener('click', function(){
  checkButton.disabled = false
  playerMistakesLeft = 1;
  playerCurrentScore = 0;
  currentScoreText.innerHTML = playerCurrentScore
  mistakesLeftText.innerHTML = playerMistakesLeft
  displayMessage('Try for a better score!');
  triviaGenerator();
})
