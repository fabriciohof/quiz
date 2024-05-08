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
      question: 'Quanto é 2 + 2?',
      answers: [
        {
          answer: '4',
          correct: true,
        },
        {
          answer: '3',
          correct: false,
        },
        {
          answer: '5',
          correct: false,
        },
        {
          answer: '6',
          correct: false,
        },
      ],
    },
    {
        question: 'Qual é o resultado da expressão log₂(16)?',
        answers: [
          {
            answer: '16',
            correct: false,
          },
          {
            answer: '2',
            correct: false,
          },
          {
            answer: '8',
            correct: false,
          },
          {
            answer: '4',
            correct: true,
          },
        ],
      },
    {
      question: 'Qual é a raiz quadrada de 25?',
      answers: [
        {
          answer: '10',
          correct: false,
        },
        {
          answer: '4',
          correct: false,
        },
        {
          answer: '5',
          correct: true,
        },
        {
          answer: '7',
          correct: false,
        },
      ],
    },
    {
      question: 'Quanto é 100 elevado a 0?',
      answers: [
        {
          answer: '0',
          correct: false,
        },
        {
          answer: '10',
          correct: false,
        },
        {
          answer: '100',
          correct: false,
        },
        {
          answer: '1',
          correct: true,
        },
      ],
    },
    {
        question: 'Qual é o valor de sen(π/2)?',
        answers: [
          {
            answer: '1',
            correct: true,
          },
          {
            answer: '0',
            correct: false,
          },
          {
            answer: '-1',
            correct: false,
          },
          {
            answer: 'π/2',
            correct: false,
          },
        ],
      },
    {
      question: 'Quanto é o seno de 90 graus?',
      answers: [
        {
          answer: '0',
          correct: false,
        },
        {
          answer: '1',
          correct: true,
        },
        {
          answer: '0.5',
          correct: false,
        },
        {
          answer: '-1',
          correct: false,
        },
      ],
    },
    {
      question: 'Quanto é 30% de 200?',
      answers: [
        {
          answer: '60',
          correct: true,
        },
        {
          answer: '50',
          correct: false,
        },
        {
          answer: '70',
          correct: false,
        },
        {
          answer: '40',
          correct: false,
        },
      ],
    },
    {
      question: 'Quanto é o logaritmo de 100 na base 10?',
      answers: [
        {
          answer: '1',
          correct: false,
        },
        {
          answer: '10',
          correct: false,
        },
        {
          answer: '2',
          correct: true,
        },
        {
          answer: '1000',
          correct: false,
        },
      ],
    },
    {
      question: 'Quanto é 3! (fatorial de 3)?',
      answers: [
        {
          answer: '6',
          correct: true,
        },
        {
          answer: '3',
          correct: false,
        },
        {
          answer: '9',
          correct: false,
        },
        {
          answer: '12',
          correct: false,
        },
      ],
    },
    {
        question: 'Qual é a derivada de sen(x)?',
        answers: [
          {
            answer: 'tg(x)',
            correct: false,
          },
          {
            answer: '-sen(x)',
            correct: false,
          },
          {
            answer: 'cos(x)',
            correct: true,
          },
          {
            answer: 'csc(x)',
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