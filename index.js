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
      '1679',
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
      'Henri Rousseau\'s Tiger in a Tropical Storm',
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

function updateTracker() {
  $(".tracker").html(`<span>Question: ${questionNumber} | Score: ${score}/5</span>`);
}

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
  $('.finalScore').text(`You scored ${score}/5!`);
}

// next question
function getNextQuestion() {
  // when next question button is clicked, fire
  $('.quizContainer').on('click', '.nextButton', function (event) {
    event.preventDefault();
    questionNumber++;
    updateTracker();
    $('.questionNumber').text(questionNumber + 1);
    $('.questionBox form').replaceWith(getQuestion());
  });
}

// wrong answer logic
function wrongAnswer(selectedIndex) {
  $(`.question${selectedIndex}`).append(`<span class='wrongAnswer'>This selction is incorrect.</span>`);
  $(`.question${correctIndex}`).append(`<span class='correctAnswer'>This is the right answer.</span>`);
}

// correct answer logic
function correctAnswer() {
  score++;
  updateTracker();
  console.log("score is "+ score);
  console.log("correctIndex is "+ correctIndex);
  // $(`.question${correctIndex}`).append(`This is the right answer`);
  // $(`.question${correctIndex}`).attr('class', 'correctAnswer');
  $(`.question${correctIndex}`).append(`<span class='correctAnswer'>You answered correctly!</span>`);
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
    $('.start').hide();
    $('.questionBox').hide();
    triviaResults();
  }
}

// start logic
function startLogic() {
   // hide start section and final section
  $('.start').show();
  $('.tracker').remove();
  $(`<h2 class="tracker"><span>Question: ${questionNumber} | Score: ${score}/5</span></h2>`).appendTo($('.start'));
  $('.startButton').hide();
  $('.finalBox').hide();
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