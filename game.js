var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var gameStart = false;
var lost = "wrong";
var gameMode = true;

$("#mode").hide();
$("#mode").on("click", function() {
  gameMode = !gameMode;
  if(gameMode){
    $("#mode").text("Change to Easy");
    $("#mode").css({ 'background-color': '#fff', 'color': 'black', 'border': 'solid #000'});
  } else {
    $("#mode").text("Change to Hard");
    $("#mode").css({ 'background-color': 'black', 'color': '#fff' , 'border': 'solid #fff'});
  }
});

function nextSequence() {
  level++;
  $("#level-title").text("level " + level);
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  if (gameMode) {
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  } else {
  playPattern(0, gamePattern.length);
  }
}




$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


$("body").on("keypress", function(event) {
  if (gameStart === false) {
    nextSequence();
    gameStart = true;
    $("#mode").show();
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound(lost);
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key or Reload to Restart");
    startOver();
  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
}



function playPattern(i, arrLength) {
  setTimeout(function() {
    $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
    playSound(gamePattern[i]);
    if (i < arrLength-1) {
      playPattern(i + 1, arrLength);
    }
  }, 500);

}

var mq = window.matchMedia( "(max-width: 450px)" );
if (mq.matches) {
  $("#level-title").text("Click here to start");
  $("#level-title").click(function(){
    nextSequence();
    gameStart = true;
    $("#mode").show();
  });
}
