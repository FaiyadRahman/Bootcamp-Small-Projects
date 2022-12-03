var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStart = 0;
var gameLevel = 0;
var currentUserLevel = 0;

$(document).on("keydown", function () {
  if (gameStart == 0) {
    gameStart = 1;
    nextSequence();
    $("#level-title").text("Level " + gameLevel);
  }
});

$(".btn").on("click", function (event) {
  if (gameStart != 0) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(currentUserLevel);
  }
});

function nextSequence() {
  gameLevel++;
  userClickedPattern = [];
  currentUserLevel = 0;
  $("#level-title").text("Level " + gameLevel);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(300)
    .fadeIn(300);

  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  var button = $("#" + currentColour);
  button.addClass("pressed");
  setTimeout(function () {
    button.removeClass("pressed");
  }, 100);
}

function checkAnswer(currenLevel) {
  if (userClickedPattern[currenLevel] == gamePattern[currenLevel]) {
    currentUserLevel++;
    if (currenLevel == gameLevel - 1) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();

    var body = $("body");
    body.addClass("game-over");
    setTimeout(function () {
      body.removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  gameStart = 0;
  gameLevel = 0;
  gamePattern = [];
}
