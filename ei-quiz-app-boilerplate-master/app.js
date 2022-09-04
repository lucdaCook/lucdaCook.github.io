/**
 * Example store structure
 */
const quiz = [
  // 5 or more questions are required
  
  {
      number: 1 ,
      question : 'What color is broccoli',
      answers: [
        'red',
        'orange',
        'pink',
        'green'
      ],
      correctAnswer: 'green'
    },
    {
      number: 2,
      question: 'What is the current year',
      answers: [
        '1970',
        '2015',
        '2022',
        '2005'
      ],
      correctAnswer: '2022'
    },
    {
      number: 3 ,
      question: 'What is 2+2',
      answers: [
        '4',
        '16',
        '1',
        '2'
      ],
      correctAnswer: '4'

    }, 

    {
      number: 4 ,
      question: 'What is 2 * 2',
      answers: [
        '4',
        '16',
        '1',
        '2'
      ],
      correctAnswer: '4'
    },
    {
      number: 5,
      question: 'What is my favorite animal',
      answers: [
        'monkey',
        'dog',
        'lion',
        'wolf'
      ],
      correctAnswer: 'monkey'
    },
    {
      number: 6,
      question: 'How old am I ',
      answers: [
        '4',
        '16',
        '1',
        '2'
      ],
      correctAnswer: '16'
    }

  
];

let questionNumber = 0;
let userScore = 0;


let randQuestion = quiz[Math.floor(Math.random()*quiz.length)];






/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function renderFirstQuestion() {
  $('#quiz').html(renderQuestion());
}

renderFirstQuestion();

function renderQuestion() {
  return `<div class="container">
  <h1 id="quiz-header">Start the Quiz!</h1>
  <div id="question-container" class="hide">
    <div id="question"></div>
    <h2 id="acc-question">${quiz[questionNumber].question}?</h2>
    <div id ="user-score">
    <span id="number-tracker">${userScore}/${questionNumber}</span>
    </div>
    <div id="answer-buttons" class="btn-grid">
    </div>
  </div>
  <div class="controls">
    <button id="start-btn" class="start-btn btn">Start</button>
    <button id="next-btn" class="next-btn btn hide">Submit</button> 
    </div>
</div>`
}


function renderNextQuestion() {
  changeQuestionNumber();
  $('#main-body').removeClass('correct')
  $('#main-body').removeClass('wrong')
  renderFirstQuestion();
  startQuiz();
  handleSubmitButton();
}


function startQuiz() {
$('#start-btn').addClass('hide');
$('#question-container').removeClass('hide')
$('#quiz-header').addClass('hide');
nextQuestion();
}


function nextQuestion() {
// $('#question').append(`<h2 id="acc-question">${randQuestion.question}?</h2>`)
// quiz[questionNunmber].answer.forEach
quiz[questionNumber].answers.forEach(answer => {
 const button = $('#answer-buttons').append(`
 <form>
  <label class="js-label">
    <input type="radio" name="answer" required>
    <span class="answer-span">${answer}</span>
  </label>
</form>`)
});
$('#next-btn').removeClass('hide');
addBtnClassName();
}

function addBtnClassName (){ 
  const answerButtons = document.getElementById('answer-buttons');
  let answerButtonChildren = Array.from(answerButtons.children);
  // answerButtonChildren.forEach(button => {
  //   button.classList.add('btn-submit'); 
  // });
}

function showNextButton() {
  $('#next-btn').removeClass('hide');
  handleSubmitButton();
  
}

function checkAnswer(event) {
  let correctAnswer = quiz[questionNumber].correctAnswer
  let selectedAnswer = $('input[type="radio"]:checked').siblings('span').text();;
  event.currentTarget.classList.add('btn');
  if(selectedAnswer === correctAnswer) {
    event.currentTarget.classList.add('correct');
    event.currentTarget.classList.add('btn');
    renderCorrectTemplate();
  } else {
    event.currentTarget.classList.add('wrong');
    event.currentTarget.classList.add('btn');
    renderFalseTemplate();
  }
  }


function renderCorrectTemplate() {
  $('.controls').prepend('<img src="images/correct.gif" alt="DJ khaled you smart" class="answer-gif">')
  $('#question-container').addClass('hide')
  $('#main-body').addClass('correct');
  updateScore();
  $('#next-btn').addClass('hide');
  $('.container').prepend('<h3 class="tof-header">Correct!</h3>')
  $('.container').append('<button id="next-question-btn" class="next-btn btn">Next</button>')
  handleNextButton();
}

function renderFalseTemplate() {
  $('.controls').prepend('<img src="images/incorrect.gif" alt="DJ khaled what is that" class="answer-gif">')
  $('#main-body').addClass('wrong');
  $('#next-btn').addClass('hide');
  $('#question-container').addClass('hide')
  $('.container').prepend('<h3 class="tof-header">Incorrect!</h3>')
  $('.container').append('<button id="next-question-btn-wrong" class="next-btn btn">Next</button>')
  handleWrongNextButton();
  
}

function renderResultsPage() {
  let finalPercentage = handleFinalScore();
  // $('#acc-question').remove()
  $('.tof-header').addClass('hide');
$('#next-question-btn').addClass('hide');
$('.answer-gif').addClass('hide');
$('.container').prepend(`<h1 id="results-header">End of Quiz!</h1>
<h3 id="score-header">Your Score Is:${finalPercentage}% `)
$('.container').append('<img src="images/another.gif" alt="DJ khaled another one" id="results-gif">')
$('.next-btn').addClass('hide');
$('answer-gif').addClass('hide');
$('.container').append('<button id="restart-btn" class="next-btn btn">Restart</button>')
handleRestartButton();
}


// Iterators
function changeQuestionNumber() {
  questionNumber++
}

function updateScore() {
  userScore++
}



//Buttons to do 
function handleStartButton() {
  $('#start-btn').on('click', startQuiz);
  }

  //figure how to have submit button check answer not run correctTemplate
  function handleSubmitButton() {
    $('#next-btn').on('click', checkAnswer)
  }

  function handleAnswerSubmit() {
    $('#answer-buttons').on('click', '.btn-submit', showNextButton);
  }

  function handleNextButton() {
    $('#next-question-btn').on('click', function(){
      if(questionNumber + 1 === quiz.length){
        renderResultsPage();
      } else {
        renderNextQuestion();

      }
    })
  }

  function handleWrongNextButton() {
    $('#next-question-btn-wrong').on('click', function(){
      if(questionNumber + 1 === quiz.length){
        renderResultsPage();
      } else {
        renderNextQuestion();

      }
    })
  }

  function handleRestartButton() {
    $('#restart-btn').on('click', function() {
      location.reload();
    });
  }

  function handleFinalScore() {
    let finalScore = Math.floor((userScore / quiz.length) * 100);
    return finalScore;
  }


  // Need a function to check if the user hit next on the last question and pull up the results 



  function renderQuiz() {
    handleRestartButton();
    handleStartButton();
    handleNextButton();
    handleAnswerSubmit();
    handleSubmitButton();
  }


$(renderQuiz);


//fix the next button
//youre doing good


//instead of randQeusiton have the questionNumber act as an incremental index for the quiz array 