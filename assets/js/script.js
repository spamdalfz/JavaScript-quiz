//containers
var containerStartEl = document.getElementById("start-quiz-container");
var containerQuestionEl = document.getElementById("question-container");
var containerFinalEl = document.getElementById("final-container");
var containerScoreEl = document.getElementById("final-score");
var containerHighScoresEl = document.getElementById("high-score-container");
var viewHighScoreEl = document.getElementById("high-scores")
var listHighScoreEl = document.getElementById("high-score-list")
var correctEl = document.getElementById("correct")
var wrongEl = document.getElementById("wrong")
var formInitials = document.getElementById("initials-form");
var btnStartEl = document.querySelector("#start-game");
var btnGoBackEl = document.querySelector("#go-back")
var btnClearScoresEl = document.querySelector("#clear-high-scores")
var questionEl = document.getElementById("questions")
var answerbuttonsEl = document.getElementById("answer-buttons")
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover
timerEl.innerText = 0;

// High Score Array
var HighScores = [];

// assign array details for questions 
var arrayShuffledQuestions
var QuestionIndex = 0

// array of questions 
var question = [
    {
        q: 'What is the correct way to write a JavaScript array?',
        a: '1. var colors = ["red", "green", "blue"]',
        choices: [{ choice: '1. var colors = ["red", "green", "blue"]  ' }, { choice: '2. var colors = "red", "green", "blue"' }, { choice: '3. var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")' }, { choice: '4. var colors = (1:"red", 2:"green", 3:"blue") ' }]
    },
    {
        q: 'Inside which HTML element do we put the javascript?',
        a: '3. <script>',
        choices: [{ choice: '1. <h1>' }, { choice: '2. <js>' }, { choice: '3. <script>' }, { choice: '4. <head>' }]
    },
    {
        q: 'In the code -- setinterval(time(),1000) -- what is time()?',
        a: '1. callback function',
        choices: [{ choice: '1. callback function' }, { choice: '2. undefined' }, { choice: '3. variable' }, { choice: '4. all of the above' }]
    },
    {
        q: 'How do you find the number with the highest value of x and y?',
        a: '4. Math.max(x, y)',
        choices: [{ choice: '1. ceil(x, y)' }, { choice: '2. Math.ceil(x, y)' }, { choice: '3. top(x, y)' }, { choice: '4. Math.max(x, y)' }]
    },
    {
        q: 'When did javascript first appear?',
        a: '1. 1995',
        choices: [{ choice: '1. 1995' }, { choice: '2. Roaring twenties' }, { choice: '3. 2005' }, { choice: '4. 2000' }]
    },
    {
        q: 'What does DOM stand for?',
        a: '2. Document Object Model',
        choices: [{ choice: '1. Do Overnight Modules' }, { choice: '2. Document Object Model' }, { choice: '3. Divas Obviously Model' }, { choice: '4. Do Oo Mo' }]
    },
    {
        q: 'What is getItem commonly used for?',
        a: '2. local storage',
        choices: [{ choice: '1. adding drama' }, { choice: '2. local storage' }, { choice: '3. online shopping' }, { choice: '4. naming a variable' }]
    },
];

// if go back button is clicked on high score page - back to start-quiz screen
const renderStartPage = () => {
    containerHighScoresEl.classList.add("hide")
    containerHighScoresEl.classList.remove("show")
    containerStartEl.style.visibility = ('visible')
    containerScoreEl.removeChild(containerScoreEl.lastChild)
    QuestionIndex = 0
    gameover = ""
    timerEl.textContent = 0
    score = 0

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide")
    }
    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }
}

// every second, check if game-over is true, or if there is time left. 
const setTime = () => {
    timeleft = 30;

    var timercheck = setInterval(function () {
        timerEl.innerText = timeleft;
        timeleft--

        if (gameover) {
            clearInterval(timercheck)
        }

        if (timeleft < 0) {
            showScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }

    }, 1000)
}

const startGame = () => {
    // add classes to show/hide quiz container
    containerStartEl.style.visibility = ('hidden')
    containerQuestionEl.classList.remove('hide');
    containerQuestionEl.classList.add('show');
    // randomizes the questions 
    arrayShuffledQuestions = question.sort(() => Math.random() - 0.5)
    setTime()
    getQuestion()
}

// get next question for quiz
const getQuestion = () => {
    resetAnswers()
    displayQuestion(arrayShuffledQuestions[QuestionIndex])
}

//remove answer buttons
const resetAnswers = () => {
    while (answerbuttonsEl.firstChild) {
        answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
    };
};

// display question information (including answer buttons)
const displayQuestion = (index) => {
    questionEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add('btn')
        answerbutton.classList.add('answerbtn')
        answerbutton.addEventListener("click", answerCheck)
        answerbuttonsEl.appendChild(answerbutton)
    }
};
// display correct! on screen
const answerCorrect = () => {
    if (correctEl.className = "hide") {
        correctEl.classList.remove("hide")
        correctEl.classList.add("banner")
        wrongEl.classList.remove("banner")
        wrongEl.classList.add("hide")
    }
}
// display wrong! on screen
const answerWrong = () => {
    if (wrongEl.className = "hide") {
        wrongEl.classList.remove("hide")
        wrongEl.classList.add("banner")
        correctEl.classList.remove("banner")
        correctEl.classList.add("hide")
    }
}

// check if answer is correct    
const answerCheck = (event) => {
    var selectedanswer = event.target
    if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText) {
        answerCorrect()
        score = score + 2
    }

    else {
        answerWrong()
        timeleft = timeleft - 3;
    };

    // go to next question, check if there is more questions
    QuestionIndex++
    if (arrayShuffledQuestions.length > QuestionIndex + 1) {
        getQuestion()
    }
    else {
        gameover = "true";
        showScore();
    }
}

// display total score screen at end of game
const showScore = () => {
    containerQuestionEl.classList.add("hide");
    containerQuestionEl.classList.remove("show");
    containerFinalEl.classList.remove("hide");
    containerFinalEl.classList.add("show");
    wrongEl.classList.add("hide");
    correctEl.classList.add("hide");
    wrongEl.classList.remove("banner");
    correctEl.classList.remove("banner");

    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your score is " + score + "!");
    containerScoreEl.appendChild(scoreDisplay);
}

// create high score values
const createHighScore = (event) => {
    event.preventDefault()
    var initials = document.querySelector("#initials").value;
    if (!initials) {
        alert("Enter your intials!");
        return;
    }

    formInitials.reset();

    var HighScore = {
        initials: initials,
        score: score
    }

    // push and sort scores
    HighScores.push(HighScore);
    HighScores.sort((a, b) => { return b.score - a.score });

    // clear visibile list to resort
    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild)
    }
    // create elements in order of high scores
    for (var i = 0; i < HighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "high-score";
        highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);
    }

    saveHighScore();
    displayHighScores();

}
// save high score
const saveHighScore = () => {
    localStorage.setItem("HighScores", JSON.stringify(HighScores))

}

// load values/ called on page load
const loadHighScore = () => {
    var LoadedHighScores = localStorage.getItem("HighScores")
    if (!LoadedHighScores) {
        return false;
    }

    LoadedHighScores = JSON.parse(LoadedHighScores);
    LoadedHighScores.sort((a, b) => { return b.score - a.score })


    for (var i = 0; i < LoadedHighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "high-score";
        highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);

        HighScores.push(LoadedHighScores[i]);

    }
}

// display high score screen from link or when intiials entered
// renders things all things hidden but the high score screen
const displayHighScores = () => {

    containerHighScoresEl.classList.remove("hide");
    containerHighScoresEl.classList.add("show");
    gameover = "true"

    if (containerFinalEl.className = "show") {
        containerFinalEl.classList.remove("show");
        containerFinalEl.classList.add("hide");
    }
    if (containerStartEl.className = "show") {
        containerStartEl.classList.remove("show");
        containerStartEl.classList.add("hide");
    }

    if (containerQuestionEl.className = "show") {
        containerQuestionEl.classList.remove("show");
        containerQuestionEl.classList.add("hide");
    }

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide");
    }

    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }
}
// clears high scores
const clearScores = () => {
    HighScores = [];

    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild);
    }

    localStorage.clear(HighScores);
}

loadHighScore()

// on start click, start game
btnStartEl.addEventListener("click", startGame)
// submit button -- enter and/or click
formInitials.addEventListener("submit", createHighScore)
// view high-scores when clicked
viewHighScoreEl.addEventListener("click", displayHighScores)
// go back button
btnGoBackEl.addEventListener("click", renderStartPage)
// clear scores button
btnClearScoresEl.addEventListener("click", clearScores)