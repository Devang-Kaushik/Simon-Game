var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var numberOfClicks = 0;
var buttonColours = ["red", "blue", "green", "yellow"];


function nextSequence() {

  // declaring a random number
  var randomNumber = Math.random();
  // bringing the random number in range 0 to 3
  randomNumber *= 4;
  // bringing number in range to 0 to 3
  randomNumber = Math.floor(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log("Game pattern list: " + gamePattern);
  level += 1;
  $("h1").text("Level " + level);

}

$(document).keydown(function() {
  if (level === 0) {
    nextSequence();
    addAnimationAndSoundToNextSequence();
  }
});

$(".btn").click(function(event) {
  if (level > 0) {

    numberOfClicks += 1;
    // Fetching the id of the button triggered by the user
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    console.log("User clicked pattern at click " + numberOfClicks + " is " + userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    if (checkAnswer() === "success" && numberOfClicks === gamePattern.length) {

      setTimeout(function() {
        numberOfClicks = 0;
        userClickedPattern = [];
        nextSequence();
        addAnimationAndSoundToNextSequence();
      }, 1000);

    } else if (checkAnswer() === "wrong") {

      playSound(checkAnswer());
      $("body").addClass("game-over");

      setTimeout(function() {
        $("body").removeClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
      }, 200);

    }

  }
});

function playSound(name) {
  // Adding sound to be played on the click of the key on keyboard
  var soundToBePlayed = "sounds/" + name + ".mp3";
  var playSound = new Audio(soundToBePlayed);
  playSound.play();
}

function animatePress(currentColour) {
  var elementId = "#" + currentColour
  $(elementId).addClass("pressed");
  setTimeout(function() {
    $(elementId).removeClass('pressed');
  }, 100);
}

function checkAnswer() {
  var output = "wrong";
  if (JSON.stringify(gamePattern[userClickedPattern.length - 1]) === JSON.stringify(userClickedPattern[userClickedPattern.length - 1])) {
    output = "success";
  }
  console.log("Check answer output: " + output);
  return output;
}

function addAnimationAndSoundToNextSequence() {
  var chosenColor = gamePattern[gamePattern.length - 1];
  var buttonId = "#" + chosenColor;
  // Adding a flash effect to the button selected
  $(buttonId).fadeOut(200).fadeIn(200);
  playSound(chosenColor);
}

function startOver() {
  // Reseting the following value for the new game
  level = 0;
  gamePattern = [];
  numberOfClicks = 0;
  userClickedPattern = [];
}
