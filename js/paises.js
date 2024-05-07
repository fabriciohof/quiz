const question = document.querySelector('#question');
const answerBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd', 'e'];
let points = 0;
let actualQuestion = 0;

// perguntas
const questions = [
    {
      question: 'Qual é o país mais populoso do mundo?',
      answers: [
        {
          answer: 'China',
          correct: true,
        },
        {
          answer: 'Índia',
          correct: false,
        },
        {
          answer: 'Estados Unidos',
          correct: false,
        },
        {
          answer: 'Brasil',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o país com a maior área territorial do mundo?',
      answers: [
        {
          answer: 'Rússia',
          correct: true,
        },
        {
          answer: 'Canadá',
          correct: false,
        },
        {
          answer: 'China',
          correct: false,
        },
        {
          answer: 'Estados Unidos',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é a capital da França?',
      answers: [
        {
          answer: 'Paris',
          correct: true,
        },
        {
          answer: 'Londres',
          correct: false,
        },
        {
          answer: 'Roma',
          correct: false,
        },
        {
          answer: 'Berlim',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o menor país do mundo em área territorial?',
      answers: [
        {
          answer: 'Vaticano',
          correct: true,
        },
        {
          answer: 'Mônaco',
          correct: false,
        },
        {
          answer: 'Nauru',
          correct: false,
        },
        {
          answer: 'Maldivas',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o país conhecido como "Terra do Sol Nascente"?',
      answers: [
        {
          answer: 'Japão',
          correct: true,
        },
        {
          answer: 'Coreia do Sul',
          correct: false,
        },
        {
          answer: 'China',
          correct: false,
        },
        {
          answer: 'Austrália',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o país com o maior número de ilhas do mundo?',
      answers: [
        {
          answer: 'Suécia',
          correct: false,
        },
        {
          answer: 'Indonésia',
          correct: true,
        },
        {
          answer: 'Filipinas',
          correct: false,
        },
        {
          answer: 'Japão',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o país que possui a maior porcentagem da Amazônia em seu território?',
      answers: [
        {
          answer: 'Brasil',
          correct: true,
        },
        {
          answer: 'Peru',
          correct: false,
        },
        {
          answer: 'Colômbia',
          correct: false,
        },
        {
          answer: 'Venezuela',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o país que possui a cidade de Istambul, localizada em dois continentes?',
      answers: [
        {
          answer: 'Turquia',
          correct: true,
        },
        {
          answer: 'Grécia',
          correct: false,
        },
        {
          answer: 'Espanha',
          correct: false,
        },
        {
          answer: 'Itália',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o país que possui o maior número de Patrimônios Mundiais da UNESCO?',
      answers: [
        {
          answer: 'Itália',
          correct: true,
        },
        {
          answer: 'França',
          correct: false,
        },
        {
          answer: 'Espanha',
          correct: false,
        },
        {
          answer: 'China',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o país conhecido como "País das Mil Ilhas"?',
      answers: [
        {
          answer: 'Canadá',
          correct: true,
        },
        {
          answer: 'Austrália',
          correct: false,
        },
        {
          answer: 'Noruega',
          correct: false,
        },
        {
          answer: 'Nova Zelândia',
          correct: false,
        },
      ],
    },
  ];


// substituição do quizz para a primeira pergunta
function init() {
  // criar primeira pergunta
  createQuestion(0);
}

// cria uma pergunta
function createQuestion(i) {
  // limpar questão anterior
  const oldButtons = answerBox.querySelectorAll('button');
  oldButtons.forEach((btn) => {
    btn.remove();
  });
  // alterar texto da pergunta
  const questionText = question.querySelector('#question-text');
  const questionNumber = question.querySelector('#question-number');

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // inserir alternativas
  questions[i].answers.forEach((answer, i) => {
    // cria template botão quizz
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

    const letterBtn = answerTemplate.querySelector('.btn-letter');
    const answerText = answerTemplate.querySelector('.question-answer');

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute('correct-answer', answer['correct']);

    // remover hide e template class
    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    // inserir alternativa na tela
    answerBox.appendChild(answerTemplate);

    // inserir evento click no botão
    answerTemplate.addEventListener('click', function () {
      checkAnswer(this);
    });
  });

  // incrementar o número da questão
  actualQuestion++;
}

// verificar resposta do usuário
function checkAnswer(btn) {
  // seleciona todos os botões
  const buttons = answerBox.querySelectorAll('button');

  // verifica se resposta correta e add classe
  buttons.forEach((button) => {
    if (button.getAttribute('correct-answer') == 'true') {
      button.classList.add('correct-answer');

      // checa se usuário acertou a pergunta
      if (btn === button) {
        // incremento dos pontos
        points++;
      }
    } else {
      button.classList.add('wrong-answer');
    }
  });

  // exibir próxima pergunta
  nextQuestion();
}

// exibe a pŕoxima pergunta no quizz
function nextQuestion() {
  // timer para usuário ver as respostas
  setTimeout(function () {
    // verifica se ainda há perguntas
    if (actualQuestion >= questions.length) {
      // apresenta mensagem de sucesso
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);
  }, 1200);
}

// exibe a tela final
function showSuccessMessage() {
    hideOrShowQuizz();

    // Calcular score
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector('#display-score span');
    displayScore.textContent = score.toString();

    // Alterar o número de perguntas corretas
    const correctAnswers = document.querySelector('#correct-answers');
    correctAnswers.textContent = points;

    // Alterar o total de perguntas
    const totalQuestions = document.querySelector('#questions-qty');
    totalQuestions.textContent = questions.length;

    // Exibir mensagem de desempenho
    const performanceMessage = document.querySelector('#performance-message');
    if (parseFloat(score) < 60) {
        performanceMessage.classList.remove('hide');
    } else {
        performanceMessage.classList.add('hide');
    }
}


// mostra ou esonde o score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

// reiniciar quizz
const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', function () {
  //zerar jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// inicialização do quizz
init();