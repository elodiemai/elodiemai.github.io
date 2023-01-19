
const numberOfRounds = 3;
//game(numberOfRounds);

let playerScore = 0;
let compScore = 0;

const outputDiv = document.querySelector('.score-details');
const tipKey = document.querySelector('.press-key');
const subtitle = document.querySelector('.subtitle');
const iconCards = document.querySelectorAll('.icon-card');

document.addEventListener('click',playGame);
iconCards.forEach(card => card.addEventListener('mouseover',updateSubtitle));

function updateSubtitle(e) {
    console.log(this);
    subtitle.innerText = `${this.id}`;
}

function playGame(e) {
    if (e.target.classList.contains('rock')
     || e.target.classList.contains('paper')
     || e.target.classList.contains('scissors')) {
        outputDiv.innerText = playRoundGame(e.target.classList[0],getComputerChoice());

        writeScore();
    }

    if (playerScore >= numberOfRounds || compScore >= numberOfRounds) {
        endGame();
        //pauses to see if replay
        document.removeEventListener('click',playGame);
        document.addEventListener('keydown',resetGame);
    }
}

//launches the game
function game (numberOfRounds) {
    for (let i=1; i <= numberOfRounds; i++) {
        let playChoice = prompt('Please type ROCK, PAPER or SCISSORS (case insensitive):',"").toUpperCase();
            if(['PAPER','ROCK','SCISSOR'].indexOf(playChoice) < 0)  {
                console.log('Invalid input, please try again.');
                i--;
            } else {
                const compChoice = getComputerChoice();
                console.log(playRoundGame(playChoice, compChoice));
            };
    }
}

//lets the computer choose between Rock Paper or Scissors
function getComputerChoice() {
    const choiceArray = ['Rock', 'Paper', 'Scissors'];
    return choiceArray[Math.floor(Math.random() * 3)];
}

//plays one round of Rock Paper Scissors
function playRoundGame(playerSelection, computerSelection) {
    const playerSelectionUpper = playerSelection.toUpperCase();
    const compSelectionUpper = computerSelection.toUpperCase();

    if (
        (playerSelectionUpper === 'PAPER' && compSelectionUpper === 'ROCK')
        || (playerSelectionUpper === 'ROCK' && compSelectionUpper === 'SCISSORS')
        || (playerSelectionUpper === 'SCISSORS' && compSelectionUpper === 'PAPER')
    ) {
        playerScore++;
        console.log(`playerScore: ${playerScore} / computerScore: ${compScore}`);
        return `You Win! ${playerSelectionUpper} beats ${compSelectionUpper}.`;
    } else if (
        (playerSelectionUpper === 'PAPER' && compSelectionUpper === 'SCISSORS')
        || (playerSelectionUpper === 'ROCK' && compSelectionUpper === 'PAPER')
        || (playerSelectionUpper === 'SCISSORS' && compSelectionUpper === 'ROCK')
    ) {
        compScore++;
        console.log(`playerScore: ${playerScore} / computerScore: ${compScore}`);
        return `You Lose ... ${compSelectionUpper} beats ${playerSelectionUpper}.`;
    } else if (playerSelectionUpper === compSelectionUpper) {
        return `You both chose ${playerSelectionUpper}. It's a tie.`;
    } else {
        return 'Error: Invalid inputs.';
    }

}

function endGame() {
    if (compScore ===3) {
        outputDiv.style.backgroundImage = 'linear-gradient(-60deg, transparent 0%, rgb(96, 34, 34) 3%, rgb(96, 34, 34) 97%, transparent 100%)';
        outputDiv.innerText ='Sorry, you won\'t be the Champion this time. Try again next year!';
    } else if (playerScore ===3) {
        outputDiv.style.backgroundImage = 'linear-gradient(-60deg, transparent, rgb(31, 172, 73) 3%, rgb(31, 172, 73) 97%, transparent)';
        outputDiv.innerText ='Congratulations! You are the new Champion!';
    }

    tipKey.classList.toggle('inactive');
}

function resetGame() {
    document.addEventListener('click',playGame);
    playerScore = 0;
    compScore = 0;
    writeScore();
    tipKey.classList.toggle('inactive');
    outputDiv.innerText ='Let\'s Go!';
    outputDiv.style.backgroundImage = 'linear-gradient(60deg, rgb(0, 0, 0), rgb(60, 60, 60))';
}

function writeScore() {
    const Scores = document.getElementsByClassName('score');
    for(score of Scores) {
        if (score.id === 'player-score') {
            score.innerText = `Player: ${playerScore}`;
        }
        else if (score.id === 'comp-score') {
            score.innerText = `Computer: ${compScore}`;
        }
    }
}


