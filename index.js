const STORE = [
  {
    question: 'What is the nickname for Baltimore, Maryland?',
    answers: [
      'Rat Town',
      'Charm City',
      'The City by the Harbor',
      'Crab Capital, USA'
    ],
    correctAnswer:
      'Charm City'
  },
  {
    question:
      'What year was Baltimore founded?',
    answers: [
      '1697',
      '1729',
      'Trick question, the city was never formally established'
    ],
    correctAnswer:
      '1729'
  },
  {
    question:
      'What inspired the city\'s NFL team name?',
    answers: [
      'Edgar Allen Poe\'s The Raven',
      'Francis Scott Key\' The Star-Spangled Banner',
      'George Duke\'s The Oriole'
    ],
    correctAnswer: 'Edgar Allen Poe\'s The Raven'
  },
  {
    question: 'What US institution was inaugurated in Baltimore in 1774?',
    answers: [  
      'United States Naval Acadamy',
      'United States department of shipping',
      'United States post office system',
      'United States FBI'
    ],
    correctAnswer: 'United States post office system'
  },
  {
    question:
      'Which famous athlete was born in Baltimore?',
    answers: [
      'Michael Oher',
      'Michael Strahan',
      'Michael Phelps',
      'Michael Jordan',
      'Mike Tyson'
    ],
    correctAnswer:
      'Michael Phelps'
  }
];


// score and q number trackers
let score = 0;
let questionNumber = 0;
let correctIndex;

function restart() {
  $('.quizContainer').on('click', '.restartButton', function (event) {
    console.log('restarting')
    event.preventDefault();
    score = 0;
    questionNumber = 0;
    startLogic();
  });
}

// results page with restart option
function triviaResults() {
  // show results and restart button
  $('.finalBox').show();
}

// next question
function getNextQuestion() {
  // when next question button is clicked, fire
  $('.quizContainer').on('click', '.nextButton', function (event) {
    event.preventDefault();
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);
    $('.questionBox form').replaceWith(getQuestion());
  });
}

// wrong answer logic
function wrongAnswer(selectedIndex) {
  $(`.question${selectedIndex}`).append(`This incorrect`);
  $(`.question${correctIndex}`).append(`This is the right answer`);
}

// correct answer logic
function correctAnswer() {
  score++;
  console.log("score is "+ score);
  console.log("correctIndex is "+ correctIndex);
  $(`.question${correctIndex}`).append(`You got it right`);
}


// checks answer and processes response
function processAnswer() {
  $('.questionBox').on('submit', function (event) {
    console.log('submit button pressed')
    event.preventDefault();
    $('.responseBox').show();
    let selected = $('input:checked');
    if (!selected) {
      alert("Take a guess if you aren't sure!");
      return;
    } 
    let answer = selected.val();
    let selectedIndex = selected.attr('id');
    // console.log(answer);
    let correct = STORE[questionNumber].correctAnswer;
    // console.log(correct);
    STORE[questionNumber].answers.forEach(function (answerValue, answerIndex) {
      if (answerValue === STORE[questionNumber].correctAnswer) {
        correctIndex = answerIndex;
      };
    });
    console.log(correctIndex);
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer(selectedIndex);
    }
    $('.submitButton').attr('class', 'nextButton');
    $('.nextButton').html('Next');
  });
}

// html for question
function getQuestionHTML() {
  // question html
  let questionBlock = $(
    `<form>
      <fieldset>
        <legend class="questionText">${STORE[questionNumber].question}</legend>
      </fieldset>
    </form>`)

  let fieldSelector = $(questionBlock).find('fieldset');

  STORE[questionNumber].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="question${answerIndex}" for="${answerIndex}">
        <input class="radio" type="radio" name="${questionNumber}" id="${answerIndex}" value="${answerValue}" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
  return questionBlock;
}

// question logic
function getQuestion() {
  if (questionNumber < STORE.length) {
    return getQuestionHTML();
  } else {
    // hide question box and show final score 
    $('.questionBox').hide();
    triviaResults();
    // ?
    $('.questionNumber').text(10);
  }
}

// start logic
function startLogic() {
   // hide start section and final section
  $('.start').hide();
  $('.finalBox').hide()
  // update question number text
  $('.questionNumber').text(1); 
  // show questions parent html
  $('.questionBox').show();
  // add question
  $('.questionBox').prepend(getQuestion());
}

// begin
function start() {
  $('.finalBox').hide(); // hide final element
  $('.start').on('click', '.startButton', function (event) {
    startLogic()
  });
}

// initiate js
function quiz() {
  start();
  getQuestion();
  processAnswer();
  getNextQuestion();
  restart();
}

$(quiz);