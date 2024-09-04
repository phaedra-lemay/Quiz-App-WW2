const questions = [
    {
        question: "The policy of avoiding war with an aggressive nation by giving into its demands is called",
        answers: [
            { text: "Blitzkrieg", correct: false},
            { text: "Brinkmanship", correct: false},
            { text: "Luftwaffe", correct: false},
            { text: "Appeasement", correct: true},
        ]
    },
    {
        question: "Totalitarianism is a political system in which the government",
        answers: [
            { text: "has one monarch that rules the country.", correct: false},
            { text: "controls every aspect of citizens' lives.", correct: true},
            { text: "is a combination of socialism and fascism", correct: false},
            { text: "elects religious leaders to rule the country", correct: false},
        ]
    },
    {
        question: "The United States was expected to be responsible for postwar rebuilding because the United States",
        answers: [
            { text: " had to make reparations for dropping atom bombs on Hiroshima and Nagasaki.", correct: false},
            { text: "escaped much destruction and was the strongest power in the world at the time.", correct: true},
            { text: "was given millions of dollars by Germany after Germany surrendered.", correct: false},
            { text: "was the richest country and much of the war was fought on its soil.", correct: false},
        ]
    },
    {
        question: " Germany's surrender on May 8, 1945, was known as",
        answers: [
            { text: "D-Day", correct: false},
            { text: "Peace Day.", correct: false},
            { text: "V-E Day.", correct: true},
            { text: "Ardennes Day.", correct: false},
        ]
    },
    {
        question: "Which fact about the Nazi death camps does Moritz Vegh's account support?",
        answers: [
            { text: "Hitler called the genocide of the Jewish people 'the final solution.'", correct: false},
            { text: "Bodies of murdered Jews were disposed of in mass graves, or cremated", correct: false},
            { text: "Most children who arrived at the death camps were executed immediately.", correct: true},
            { text: "Dachau, Auschwitz, Treblinka, and Bergen-Belsen were death camps.", correct: false},
        ]
    },
    {
        question: "What was the strategy behind the last German offensive at the Battle of the Bulge?",
        answers: [
            { text: "German forces would circle northwest of the Allied lines and attack Paris, driving the Allies into German troops in eastern France.", correct: false},
            { text: "German forces would attack the Allied lines head-on and hope to force a surrender.", correct: false},
            { text: "German forces would drive through a weak spot in the Allied lines and capture the city of Antwerp, Belgium.", correct: true},
            { text: "German forces would attack Italy, drawing Allied forces away from France and leaving Paris open to attack and recapture.", correct: false},
        ]
    },

];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

   let currentQuestionIndex = 0;
   let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
   
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
        if (isCorrect){
            selectedBtn.classList.add("correct");
            score++;
        } else {
            selectedBtn.classList.add("incorrect");
        }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display ="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = `Play Again!`;
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();