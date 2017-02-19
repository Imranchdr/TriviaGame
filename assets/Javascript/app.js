var panel = $('#quiz-area');
var countStartNumber = 10;


$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});


var questions = [{
  question: "What is the name of Jon Snow's Direwolf?",
  answers: ["Grey Wind", "Graham", "Ghost", "Gargamel"],
  correctAnswer: "Ghost",
  image:"assets/images/ghost.jpg"
}, {
  question: "Name the other Stark child: Robb, Brandon, Sansa, Arya. Jon Snow and?",
  answers: ["Rickon", "Dickon", "Ramsay", "Eddard"],
  correctAnswer: "Rickon",
  image:"assets/images/rickon.jpg"
}, {
  question: "What's the name of Lysa Arryn's way-too-old-to-be-nursing son?",
  answers: ["Edmore", "Hoster", "Robin", "Nedwell"],
  correctAnswer: "Robin",
  image:"assets/images/robin.jpg"
}, {
  question: "What's the name of the explosive that gave the Lannisters the edge in the Battle of Blackwater?",
  answers: ["Wildfire", "Dragonfire", "Godsfire", "Pantsonfire"],
  correctAnswer: "Wildfire",
  image:"assets/images/wildfire.jpg"
}, {
  question: "How is The Queen Of Thorns more commonly known?",
  answers: ["Cersei Lannister", "Margaery Tyrell", "Olenna Tyrell", "Jarvis Thribb"],
  correctAnswer: "Olenna Tyrell",
  image:"assets/images/olenna.gif"
}, {
  question: "What does Daenerys mean when she says 'Shekh ma shieraki anni' to Khal Drogo?",
  answers: ["Moon of my life", "Get in me wheelbarrow, love", "Sound did silence me", "My sun and stars"],
  correctAnswer: "My sun and stars",
  image:"assets/images/drogo.jpg"
}, {
  question: "Which Lannister song signalled doom at the Red Wedding?",
  answers: ["The Rains Of Castermere", "A Golden Crown", "The Assassin's Dagger", "Tales Of Topographic Oceans"],
  correctAnswer: "The Rains Of Castermere",
  image:"assets/images/redwedding.png"
}, {
  question: "What piece of fencing advice did Jon Snow give to Arya Stark? Stick them with the?",
  answers: ["Prickly end", "Sharp end", "Futtocks End", "Pointy end"],
  correctAnswer: "Pointy end",
  image:"assets/images/arya.jpg"
}];




var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>Game Over</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};