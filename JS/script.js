/*Array med objekt som innehåller frågor och svar*/ 
const questions = [
    {
        question: "What group do bees belong to along with ants and wasps?",
        answers: 
        [
            {text:"Hydmenoptera", correct: true },
            {text:"Diptera", correct: false },
            {text:"Celeoptera", correct: false },

        ]
    },
    {
        question: "How do bumblebees typically indicate that they want to be left alone?",
        answers: 
        [
            {text:"They sting", correct: false },
            {text:"They make buzzing sound", correct: false },
            {text:"They wave a leg", correct: true },

        ]
    },
    {
        question: "Why are bees important for the production of fruits and seeds?",
        answers: 
        [
            {text:"They help in photosynthesis", correct: false },
            {text:"They play a crucial roll in pollination", correct: true },
            {text:"They aid in the absorption of nutrients", correct: false },


        ]
    }

];
// Kodraden markerar ett HTML element med ID "question"
// Det tilldelar det till variabeln questionElement.
// Detta gör så att elementet som den aktuella frågan visas.
const questionElement = document.getElementById("question");

//detta markerar ett HTML element med ID "answer-buttons" och 
//tilldelar det till variabeln answerButtons
//Detta element innehåller knapparna som representerar svarsalternativ.
const answerButtons = document.getElementById("answer-buttons");

//Väljer ett element "next-btn" och 
//tilldelar det till variabeln nexButton.
//Representerar knappen som användaren klickar på 
//för att gå vidare till nästa fråga eller starta om quizet.
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

$(function()
{
    $("#progress-bar").progressbar(); //initierar progress bar
});

// //Återställer quiz i ursprung tillstånd
function startQuiz() 
{   
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

//Visar nuvarande frågor och svar
function showQuestion() 
{  
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct )
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        
    });
}
//Återställer användarsnittets tillstånd
function resetState() 
{
    nextButton.style.display = "none";
    while(answerButtons.firstChild) 
    {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}
//hanterar användarens val
function selectAnswer(e)
{
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) 
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else 
    {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => 
        {
            if(button.dataset.correct === "true")
            {
                button.classList.add("correct");                
            }
            button.disabled = true;
        });
        nextButton.style.display = "block";
}

//Visar slutresultat
function showScore() 
{
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
// Hanterar Next klickKnappen 
function handleNextButton() 
{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();
    }
    else
    {
        showScore();
    }
    updateProgressBar();
}
// visar framsteg i quizet
function updateProgressBar()
{
    const progress = (currentQuestionIndex / questions.length) * 100;
    $("#progress-bar").progressbar("value", progress);
}
// Hanterar click on Next 
nextButton.addEventListener("click", ()=>
{
    if(currentQuestionIndex < questions.length)
    {
        handleNextButton();
    }
    else 
    {
        startQuiz();
    }

})
// startar quizet
startQuiz();
