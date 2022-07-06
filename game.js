var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level=0;


$(document).keypress(function(){
    if(started === false)       // condition such that nextsequence will not be called everytime a key is pressed unless user is wrong and game has ended 
    {
        $("#level-title").text("level " + level);
        nextSequence();
         started = true;
    }
    
});

// --------On clicking------------

$(".btn").on("click", function(){
    var userChosenColor =  $(this).attr("Id");  //getting the user clicked color

    userClickedPattern.push(userChosenColor); // adding the obtained color to the user pattern array 
    console.log(userClickedPattern);

    playSound(userChosenColor); 
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);  // checking for the current answer of the user
});

        
function checkAnswer(currentLevel){

    // Checking for matching of the user choosen color to the game genreated color for current level
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])   
    {
        console.log("success");   
    }

    //upon Wrong Answer
    else{
        var wrong = new Audio("sounds/wrong.mp3");  //Adding wrong audio upon wrong answer
        wrong.play();

        $("body").addClass("game-over");     // Adding and removing flickering bg for wrong answer
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");  // restart game heading
        
        startOver();
    }

    // Checking if the sequence is completed or not then triggering the nextSequence function likewise 
    if(userClickedPattern.length === gamePattern.length)
    {
        setTimeout(function () {
            nextSequence();
        }, 1000); 
    }
    
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
  }


// function for generating random colors at each level with level counter 
function nextSequence(){

    userClickedPattern = [];  //Resetting the user pattern array after every level for new sequence

    level++;
    $("#level-title").text("level " + level);  // Updating the h1 heading as per level

    var randomNumber = Math.floor(Math.random() * 4) ;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeIn(100).fadeOut(90).fadeIn(90); //Animation
    
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
   
}



// ----------Playing Sound----------

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//----------- Animation------------

function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 110);
}


