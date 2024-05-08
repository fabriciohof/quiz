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
      question: 'Qual é o maior animal terrestre?',
      answers: [
        {
          answer: 'Elefante africano',
          correct: true,
        },
        {
          answer: 'Rinoceronte',
          correct: false,
        },
        {
          answer: 'Girafa',
          correct: false,
        },
        {
          answer: 'Hipopótamo',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o animal mais rápido do mundo?',
      answers: [
        {
          answer: 'Guepardo',
          correct: false,
        },
        {
          answer: 'Leopardo',
          correct: false,
        },
        {
          answer: 'Falcão peregrino',
          correct: true,
        },
        {
          answer: 'Lebre',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o animal que tem a maior população na Terra?',
      answers: [
        {
          answer: 'Formiga',
          correct: true,
        },
        {
          answer: 'Rato',
          correct: false,
        },
        {
          answer: 'Mosquito',
          correct: false,
        },
        {
          answer: 'Barata',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o maior réptil do mundo?',
      answers: [
        {
          answer: 'Iguana',
          correct: false,
        },
        {
          answer: 'Tartaruga-verde',
          correct: false,
        },
        {
          answer: 'Crocodilo-de-água-salgada',
          correct: true,
        },
        {
          answer: 'Píton-reticulada',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o animal mais venenoso do mundo?',
      answers: [
        {
          answer: 'Vespa assassina',
          correct: false,
        },
        {
          answer: 'Medusa-vespa-do-mar',
          correct: true,
        },
        {
          answer: 'Ariranha',
          correct: false,
        },
        {
          answer: 'Escorpião-amarelo',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o maior primata do mundo?',
      answers: [
        {
          answer: 'Bonobo',
          correct: false,
        },
        {
          answer: 'Orangotango',
          correct: false,
        },
        {
          answer: 'Chimpanzé',
          correct: false,
        },
        {
          answer: 'Gorila',
          correct: true,
        },
      ],
    },
    {
      question: 'Qual é o animal mais resistente do mundo?',
      answers: [
        {
          answer: 'Tardígrado',
          correct: true,
        },
        {
          answer: 'Besouro da Namíbia',
          correct: false,
        },
        {
          answer: 'Cockroach',
          correct: false,
        },
        {
          answer: 'Rato-toupeira-pelado',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o maior animal marinho do mundo?',
      answers: [
        {
          answer: 'Baleia-jubarte',
          correct: false,
        },
        {
          answer: 'Tubarão-baleia',
          correct: false,
        },
        {
          answer: 'Baleia-azul',
          correct: true,
        },
        {
          answer: 'Baleia-cinzenta',
          correct: false,
        },
      ],
    },
    {
        question: 'Qual animal é símbolo de sabedoria?',
        answers: [
          {
            answer: 'Coruja',
            correct: true,
          },
          {
            answer: 'Gato',
            correct: false,
          },
          {
            answer: 'Cachorro',
            correct: false,
          },
          {
            answer: 'Rato',
            correct: false,
          },
        ],
      },
    {
      question: 'Qual destes animais é conhecido por sua capacidade de camuflagem?',
      answers: [
        {
          answer: 'Coelho',
          correct: false,
        },
        {
          answer: 'Tigre',
          correct: false,
        },
        {
          answer: 'Faisão-dourado',
          correct: false,
        },
        {
          answer: 'Camaleão',
          correct: true,
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