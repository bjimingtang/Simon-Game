var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  animatePress(this.id);
  checkAnswer(this.id);
});

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  buttonAnimate(randomChosenColour);
  gamePattern.push(randomChosenColour);
  userPattern = [];
}

function buttonAnimate(button_) {
  var button_id = "#".concat(button_);
  $(button_id).fadeOut(100).fadeIn(100);
  buttonSound(button_);
}

function animatePress(currentColour) {
  var button_id = "#".concat(currentColour);
  $(button_id).addClass("pressed");
  setTimeout(function() {
    $(button_id).removeClass("pressed");
  }, 100);
  buttonSound(currentColour);
}

function buttonSound(file_name_) {
  var mp3_file = "sounds/".concat(file_name_).concat(".mp3");
  var audio = new Audio(mp3_file);
  audio.play();
}

function checkAnswer(color) {
  userPattern.push(color);
  var index_to_check = userPattern.length - 1;
  if (userPattern[index_to_check] == gamePattern[index_to_check]) {
    if (index_to_check == (gamePattern.length - 1)) {
      setTimeout(nextSequence, 500);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  buttonSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  gamePattern = [];
  level = 0;
  started = false;
}
