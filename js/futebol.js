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
      question: 'Qual é o jogador que detém o recorde de mais gols marcados em uma única edição da Copa do Mundo?',
      answers: [
        {
          answer: 'Pelé',
          correct: true,
        },
        {
          answer: 'Miroslav Klose',
          correct: false,
        },
        {
          answer: 'Ronaldo Nazário',
          correct: false,
        },
        {
          answer: 'Gerd Müller',
          correct: false,
        },
      ],
    },
    {
      question: 'Quantos títulos da Copa do Mundo a seleção brasileira de futebol já conquistou?',
      answers: [
        {
          answer: '5',
          correct: true,
        },
        {
          answer: '3',
          correct: false,
        },
        {
          answer: '4',
          correct: false,
        },
        {
          answer: '2',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o jogador que ganhou o prêmio de Melhor Jogador do Mundo da FIFA mais vezes?',
      answers: [
        {
          answer: 'Lionel Messi',
          correct: true,
        },
        {
          answer: 'Cristiano Ronaldo',
          correct: false,
        },
        {
          answer: 'Diego Maradona',
          correct: false,
        },
        {
          answer: 'Pelé',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o único país que participou de todas as edições da Copa do Mundo?',
      answers: [
        {
          answer: 'Brasil',
          correct: true,
        },
        {
          answer: 'Alemanha',
          correct: false,
        },
        {
          answer: 'Itália',
          correct: false,
        },
        {
          answer: 'Argentina',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual jogador marcou o gol mais rápido na história das Copas do Mundo?',
      answers: [
        {
          answer: 'Hakan Şükür',
          correct: true,
        },
        {
          answer: 'Ronaldo Nazário',
          correct: false,
        },
        {
          answer: 'Clint Dempsey',
          correct: false,
        },
        {
          answer: 'Tim Cahill',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual país venceu a Copa do Mundo de 2018?',
      answers: [
        {
          answer: 'França',
          correct: true,
        },
        {
          answer: 'Brasil',
          correct: false,
        },
        {
          answer: 'Alemanha',
          correct: false,
        },
        {
          answer: 'Argentina',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o maior artilheiro da história da Liga dos Campeões da UEFA?',
      answers: [
        {
          answer: 'Cristiano Ronaldo',
          correct: true,
        },
        {
          answer: 'Lionel Messi',
          correct: false,
        },
        {
          answer: 'Raúl',
          correct: false,
        },
        {
          answer: 'Karim Benzema',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o nome do estádio onde aconteceu a final da Copa do Mundo de 2014?',
      answers: [
        {
          answer: 'Estádio do Maracanã',
          correct: false,
        },
        {
          answer: 'Estádio Mineirão',
          correct: false,
        },
        {
          answer: 'Arena Corinthians',
          correct: false,
        },
        {
          answer: 'Estádio do Maracanã',
          correct: true,
        },
      ],
    },
    {
      question: 'Qual seleção nacional de futebol é conhecida como "La Albiceleste"?',
      answers: [
        {
          answer: 'Argentina',
          correct: true,
        },
        {
          answer: 'Uruguai',
          correct: false,
        },
        {
          answer: 'Espanha',
          correct: false,
        },
        {
          answer: 'Chile',
          correct: false,
        },
      ],
    },
    {
      question: 'Qual é o nome do troféu dado ao campeão da Copa do Mundo?',
      answers: [
        {
          answer: 'Taça FIFA',
          correct: true,
        },
        {
          answer: 'Taça Jules Rimet',
          correct: false,
        },
        {
          answer: 'Taça UEFA',
          correct: false,
        },
        {
          answer: 'Taça Libertadores',
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