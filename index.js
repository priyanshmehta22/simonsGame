var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  console.log(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(index) {
  if (userClickedPattern[index] === gamePattern[index]) {
    console.log("Success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    startOver();
  }
}

function startOver() {
  console.log("wrong");
  animatePress(gamePattern.length - 1);
  $("#level-title").text("Wrong Answer - Game over");
  level = 0;
  started = false;
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("#level-title").text("Press any button to start");
  }, 2000);
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  gamePattern = [];
}

function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 300);
}
