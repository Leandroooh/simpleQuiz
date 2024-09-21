const quiz = [
    {
        question: "Quanto é 1 + 1?",
        questions: [
            { text: 2, isCorrect: true },
            { text: 22, isCorrect: false },
            { text: 11, isCorrect: false },
            { text: 1, isCorrect: false },
        ],
    },
    {
        question: "Qual a capital do Brasil?",
        questions: [
            { text: "Rio de Janeiro", isCorrect: false },
            { text: "Campinas", isCorrect: false },
            { text: "Bahia", isCorrect: false },
            { text: "Brasilia", isCorrect: true },
        ],
    },
    {
        question: "O que é PIB?",
        questions: [
            { text: "Produto Interno Brasileiro", isCorrect: false },
            { text: "Produto Interno Politico", isCorrect: false },
            { text: "Produto Interno Bruto", isCorrect: true },
            { text: "Produto Interno Básico", isCorrect: false },
        ],
    },
];

const answerTitle = document.getElementById("answer-title");
const nextButton = document.getElementById("next-button");

const pointsScreen = document.getElementById("points-area");
const answerList = Array.from(document.getElementsByTagName("li"));

let points = 0;
let currentId = 0;


const updateQuestion = () => {
    answerTitle.textContent = quiz[currentId].question;

    answerList.forEach((item, i) => {
        item.textContent = quiz[currentId].questions[i].text; // Ok
    });
};

updateQuestion();

const nextQuestion = () => {

    if (quiz.length <= currentId) {

        alert("Você está no final!");
        return;

    } else {

        currentId++;
        updateQuestion();

        console.log(`Tamanho: ${quiz.length}`);
        console.log(`Id: ${currentId}`);
        console.log(quiz[currentId]);
    }
};

nextButton.addEventListener("click", nextQuestion);
