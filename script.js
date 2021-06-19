var masterQuizBody = document.getElementById("masterQuiz");
var resultsEl = document.getElementById("result");
var finalpointsEl = document.getElementById("finalpoints");
var theEndDiv = document.getElementById("theEnd");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timeRemaining");
var beginQuizButton = document.getElementById("beginbtn");
var beginQuizDiv = document.getElementById("beginQuiz");
var topcoreContainer = document.getElementById("topscoreContainer");
var topscoreDiv = document.getElementById("top-scorePage");
var topscoreInputName = document.getElementById("initals");
var topscoreDisplayName = document.getElementById("topscore-initials");
var finshGameBtns = document.getElementById("finishGameBtns");
var enterScoreBtn = document.getElementById("enterScore");
var topscoreDisplayScore = document.getElementById("top-score");
var startDiv = document.getElementById("start");

var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var buttonA = document.getElementById("a");
var buttonC = document.getElementById("c");
var buttonB = document.getElementById("b");

var quizQuestions = [{
    question: "Which of the following is a valid type of function javascript supports?",
    choiceA: "anonymous function",
    choiceB: "named function",
    choiceC: "Both A & B",
    choiceD: "neither A or B",
    correctAnswer: "c"},
  {
    question: "Which built-in method returns the length of the string?",
    choiceA: "length()",
    choiceB: "index()",
    choiceC: "size()",
    choiceD: "none",
    correctAnswer: "a"},
   {
    question: "Which built-in method returns the calling string value converted to lower case?",
    choiceA: "toLower()",
    choiceB: "changeCase",
    choiceC: "toLowerCase()",
    choiceD: "none of the above",
    correctAnswer: "c"},
    {
    question: "What String object returns the index within the calling String object of the last occurrence of the specified value?",
    choiceA: "lastindexof()",
    choiceB: "indexOf()",
    choiceC: "search()",
    choiceD: "subsstr()",
    correctAnswer: "a"},
    {
    question: "Which of the following is a primitive date type in JS?",
    choiceA: "All of the below",
    choiceB: "number",
    choiceC: "string",
    choiceD: "boolean",
    correctAnswer: "a"},  
    {
    question: "Which of the following variable in JavaScript is declared with a keyword?",
    choiceA: "string",
    choiceB: "new",
    choiceC: "var",
    choiceD: "init",
    correctAnswer: "c"},
    {
    question: "What is null in JS",
    choiceA: "zero value",
    choiceB: "absence of value",
    choiceC: "empty string value",
    choiceD: "unknown value",
    correctAnswer: "b"},
        
    
    ];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeRemaining = 200;
var timerInterval;
var score = 0;
var correct;


function generateQuizQuestion(){
    finshGameBtns.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonB.innerHTML = currentQuestion.choiceB;
};

function beginQuiz(){
    theEndDiv.style.display = "none";
    beginQuizDiv.style.display = "none";
    startDiv.style.display="none";
    generateQuizQuestion();

    timerInterval = setInterval(function() {
        timeRemaining--;
        quizTimer.textContent = "Time Remaining: " + timeRemaining;
    
        if(timeRemaining === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    beginQuizDiv.style.display = "block";
}

function showScore(){
    beginQuizDiv.style.display = "none"
    theEndDiv.style.display = "flex";
    clearInterval(timerInterval);
    topscoreInputName.value = "";
    finalpointsEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}


enterScoreBtn.addEventListener("click", function topscore(){
    
    
    if(topscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedTopscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = topscoreInputName.value.trim();
        var currentTopscore = {
            name : currentUser,
            score : score
        };
    
        theEndDiv.style.display = "none";
        topscoreContainer.style.display = "flex";
        topscoreDiv.style.display = "block";
        finishGameBtns.style.display = "flex";
        
        savedtopscores.push(currentTopscore);
        localStorage.setItem("savedTopscores", JSON.stringify(savedTopscores));
        generateTopscores();

    }
    
});


function generateTopscores(){
    topscoreDisplayName.innerHTML = "";
    topscoreDisplayScore.innerHTML = "";
    var topscores = JSON.parse(localStorage.getItem("savedTopscores")) || [];
    for (i=0; i<topscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        topscoreDisplayName.appendChild(newNameSpan);
        topscoreDisplayScore.appendChild(newScoreSpan);
    }
}


function showTopscore(){
    beginQuizDiv.style.display = "none"
    theEndDiv.style.display = "none";
    topscoreContainer.style.display = "flex";
    topscoreDiv.style.display = "block";
    finishGameBtns.style.display = "flex";

    generateTopscores();
}




function startAgain(){
    topscoreContainer.style.display = "none";
    theEndDiv.style.display = "none";
    beginQuizDiv.style.display = "flex";
    timeRemaining = 200;
    score = 0;
    currentQuestionIndex = 0;
}

 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        currentQuestionIndex++;
        generateQuizQuestion();
      
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        currentQuestionIndex++;
        generateQuizQuestion();
        
    }else{
        showScore();
    }
}


beginQuizButton.addEventListener("click",beginQuiz);