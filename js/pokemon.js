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
      question: 'Qual é o nome do Pokémon número 25 na Pokédex nacional?',
      answers: [
        {
          answer: 'Pikachu',
          correct: true,
        },
        {
          answer: 'Charmander',
          correct: false,
        },
        {
          answer: 'Bulbasaur',
          correct: false,
        },
        {
          answer: 'Squirtle',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o tipo primário do Pokémon Charizard?',
      answers: [
        {
          answer: 'Fogo',
          correct: true,
        },
        {
          answer: 'Dragão',
          correct: false,
        },
        {
          answer: 'Voador',
          correct: false,
        },
        {
          answer: 'Inseto',
          correct: false,
        },
      ],
    },
    {
      question: 'Quem é conhecido como o mestre Pokémon na região de Kanto?',
      answers: [
        {
          answer: 'Professor Carvalho',
          correct: false,
        },
        {
          answer: 'Gary Carvalho',
          correct: false,
        },
        {
          answer: 'Red',
          correct: true,
        },
        {
          answer: 'Ash Ketchum',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o Pokémon inicial da região de Johto?',
      answers: [
        {
          answer: 'Cyndaquil',
          correct: true,
        },
        {
          answer: 'Totodile',
          correct: false,
        },
        {
          answer: 'Chikorita',
          correct: false,
        },
        {
          answer: 'Pikachu',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o nome do professor na região de Alola?',
      answers: [
        {
          answer: 'Carvalho',
          correct: false,
        },
        {
          answer: 'Sycamore',
          correct: false,
        },
        {
          answer: 'Kukui',
          correct: true,
        },
        {
          answer: 'Elm',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o tipo primário do Pokémon Gyarados?',
      answers: [
        {
          answer: 'Água',
          correct: true,
        },
        {
          answer: 'Dragão',
          correct: false,
        },
        {
          answer: 'Voador',
          correct: false,
        },
        {
          answer: 'Inseto',
          correct: false,
        },
      ],
    },
    {
      question: 'Quem é o líder do ginásio da cidade de Pewter?',
      answers: [
        {
          answer: 'Misty',
          correct: false,
        },
        {
          answer: 'Brock',
          correct: true,
        },
        {
          answer: 'Lt. Surge',
          correct: false,
        },
        {
          answer: 'Sabrina',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o Pokémon lendário da região de Sinnoh associado ao tempo?',
      answers: [
        {
          answer: 'Palkia',
          correct: true,
        },
        {
          answer: 'Dialga',
          correct: false,
        },
        {
          answer: 'Giratina',
          correct: false,
        },
        {
          answer: 'Arceus',
          correct: false,
        },
      ],
    },
    {
      question: 'Quem é o rival de Ash na região de Unova?',
      answers: [
        {
          answer: 'Gary',
          correct: false,
        },
        {
          answer: 'Bianca',
          correct: false,
        },
        {
          answer: 'Paul',
          correct: false,
        },
        {
          answer: 'Trip',
          correct: true,
        },
      ],
    },
    {
      question: 'Qual é o tipo primário do Pokémon Scyther?',
      answers: [
        {
          answer: 'Inseto',
          correct: true,
        },
        {
          answer: 'Voador',
          correct: false,
        },
        {
          answer: 'Grama',
          correct: false,
        },
        {
          answer: 'Lutador',
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