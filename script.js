
// Perguntas que serão utilizadas no Quiz 
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

// Elemento do HTML
const answerTitle = document.getElementById("answer-title");
const nextButton = document.getElementById("next-button");

const pointsScreen = document.getElementById("points-area");
const answerList = Array.from(document.getElementsByTagName("li"));

// Elementos do Modal

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("dialog-h1");
const modalDesc = document.getElementById("dialog-p");
const resetButton = document.getElementById("dialog-button");

// Pontos Adquiridos
let points = 0;

// Pergunta atual
let currentId = 0;

// atualização as Perguntas
const updateQuestion = () => {

    // Tamanho do Quiz é menor que a pergunta atual?
    if (quiz.length < currentId) {
        console.log('Você finalizou o Quiz!');
        return;
    }

    // Pegando o titulo da Questão, com base no currentID;
    answerTitle.textContent = quiz[currentId].question;

    // Percorrendo todos os itens de AnswerList ( li )
    answerList.forEach((item, i) => {

        // Adicionando as respostas no LI
        item.style.color = '#C6ADFF'
        item.textContent = quiz[currentId].questions[i].text; // Ok


    });
};

// Próxima Questão ( Geralmente no Botão )
const nextQuestion = () => {

    // Tamanho do Quiz é menor ou igual a pergunta atual?
    if (quiz.length <= currentId + 1) {
        resetQuiz();
    } else {

        // Aumenta +1 na pergunta atual
        currentId++;
        // Atualiza a questão chamando a função
        updateQuestion();

        // Debug para controle
        console.log(`Id: ${currentId}\n`);
        console.log(`Questão Atual: ${currentId}`);
        console.log(`Tamanho do Quiz: ${quiz.length}`);
    }

    // Remove a class 'Respondida' dos itens!
    answerList.forEach(answer => answer.classList.remove('respondida'));
};

// Questão Correta
const correctAnswer = () => {
    answerList.forEach((item, i) => {
        item.addEventListener('click', () => {

            if (item.classList.contains('respondida')) {
                return;
            }

            if (currentId > quiz.length) {
                console.log('Você finalizou o Quiz!');
                return;
            }

            const clickedAnswer = quiz[currentId].questions[i].isCorrect;

            if (clickedAnswer) {

                // adiciona 15 pontos
                updatePoints(15);
                // Altera a cor para Verde Claro
                item.style.color = 'lightGreen';

                // Adicionando a classe em todos os itens, para não ter novas respostas após acertas!
                answerList.forEach(answer => answer.classList.add('respondida'));

            } else {

                // remove 5 pontos
                updatePoints(-5);

                // Altera a cor para Vermelho
                item.style.color = 'red';
            }

            // Adiciona a classe Respondida no item clicado
            item.classList.add('respondida');

        })

    });
}

// Atualização dos Pontos
const updatePoints = (values) => {

    // Soma os pontos com o values fornecido
    points = points + values;

    // Adiciona os pontos na tela juntamente com o texto
    pointsScreen.textContent = `Pontução: ${points}`;

}

// Reiniciando o Quiz
const resetQuiz = () => {

    modalTitle.textContent = `PARABÉNS!`
    modalDesc.textContent = `Você finalizou o Quiz! 
                            Sua pontuação total foi de ${points}`
    
    // Reiniciando Pontuação e a Pergunta
    points = 0;
    currentId = 0;

    // Verificando se o modal NÃO está aberto
    if (!modal.open) {
        // Abrindo Modal
        modal.showModal();
        modal.open = true;

        // Definindo o Flex para estilização
        modal.style.display = 'flex'
    } else {
        // Atualizando questões
        updateQuestion();

        // Removendo display flex para o modal sumir
        modal.style.display = 'none'

        // Definindo a pontuação para 0
        pointsScreen.textContent = `Pontuação: ${points}`

        // Fechando o modal
        modal.close()
    }
}

// Chamando o evento para o Quiz iniciar quando a página for carregada
updateQuestion();

// Chamando a função responsável por permitir a interação com os itens
correctAnswer();

nextButton.addEventListener("click", nextQuestion);
resetButton.addEventListener("click", resetQuiz);
