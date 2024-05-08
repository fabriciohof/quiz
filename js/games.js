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
      question: 'Qual é o nome do protagonista da série de jogos "The Witcher"?',
      answers: [
        {
          answer: 'Geralt de Rivia',
          correct: true,
        },
        {
          answer: 'Ezio Auditore',
          correct: false,
        },
        {
          answer: 'Nathan Drake',
          correct: false,
        },
        {
          answer: 'Joel',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o nome do estúdio de desenvolvimento por trás da série de jogos "The Elder Scrolls"?',
      answers: [
        {
          answer: 'Bethesda Game Studios',
          correct: true,
        },
        {
          answer: 'CD Projekt Red',
          correct: false,
        },
        {
          answer: 'Naughty Dog',
          correct: false,
        },
        {
          answer: 'Ubisoft',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o jogo mais vendido da franquia "Call of Duty"?',
      answers: [
        {
          answer: 'Call of Duty: Modern Warfare',
          correct: false,
        },
        {
          answer: 'Call of Duty: Black Ops',
          correct: true,
        },
        {
          answer: 'Call of Duty: World War II',
          correct: false,
        },
        {
          answer: 'Call of Duty: Ghosts',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o nome do planeta onde se passa a maior parte do jogo "Mass Effect"?',
      answers: [
        {
          answer: 'Terra',
          correct: false,
        },
        {
          answer: 'Marte',
          correct: false,
        },
        {
          answer: 'Noveria',
          correct: false,
        },
        {
          answer: 'Tuchanka',
          correct: true,
        },
      ],
    },
    {
      question: 'Qual é o nome do estúdio que desenvolveu o jogo "The Last of Us"?',
      answers: [
        {
          answer: 'Naughty Dog',
          correct: true,
        },
        {
          answer: 'CD Projekt Red',
          correct: false,
        },
        {
          answer: 'Rockstar Games',
          correct: false,
        },
        {
          answer: 'Blizzard Entertainment',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o nome do protagonista da série de jogos "Metal Gear Solid"?',
      answers: [
        {
          answer: 'Big Boss',
          correct: false,
        },
        {
          answer: 'Master Chief',
          correct: false,
        },
        {
          answer: 'Sam Fisher',
          correct: false,
        },
        {
          answer: 'Solid Snake',
          correct: true,
        },
      ],
    },
    {
      question: 'Qual é o nome do mundo fictício onde se passa a maioria dos jogos da série "The Legend of Zelda"?',
      answers: [
        {
          answer: 'Mushroom Kingdom',
          correct: false,
        },
        {
          answer: 'Hyrule',
          correct: true,
        },
        {
          answer: 'Skyrim',
          correct: false,
        },
        {
          answer: 'Azeroth',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o nome do protagonista da série de jogos "Assassin\'s Creed"?',
      answers: [
        {
          answer: 'Ezio Auditore',
          correct: false,
        },
        {
          answer: 'Connor Kenway',
          correct: false,
        },
        {
          answer: 'Altair Ibn-La\'Ahad',
          correct: false,
        },
        {
          answer: 'Desmond Miles',
          correct: true,
        },
      ],
    },
    {
      question: 'Qual é o jogo que popularizou o gênero "Battle Royale"?',
      answers: [
        {
          answer: 'H1Z1',
          correct: false,
        },
        {
          answer: 'PlayerUnknown\'s Battlegrounds (PUBG)',
          correct: true,
        },
        {
          answer: 'Fortnite',
          correct: false,
        },
        {
          answer: 'Apex Legends',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o nome do personagem principal da série de jogos "God of War"?',
      answers: [
        {
          answer: 'Kratos',
          correct: true,
        },
        {
          answer: 'Ares',
          correct: false,
        },
        {
          answer: 'Zeus',
          correct: false,
        },
        {
          answer: 'Odin',
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