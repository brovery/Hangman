/**
 * Created by Brandon on 10/18/2015.
 */
var words = ["library","expensive","divided","transportation","famous","camera"],
    wordCount = 0,
    word = words[wordCount],
    voices,
    wrong = 0,
    guesses = 6,
    right = 0,
    guessed = [],
    wrongLetter = new Speech("Nope!"),
    correct = new Speech("Correct!"),
    currentWord = new Speech(words[wordCount]),
    win = new Speech("You Win! Huzzah!"),
    loser = new Speech("You lose! That poor guy is dead, all because of you!"),
    spellCount = 0;

function nextWord() {
    wordCount++;
    spellCount = 0;
    right = 0;
    clearGuessed();
    guessed = [];
    currentWord = new Speech(words[wordCount]);
    word = words[wordCount];
    $('#nextWord').hide();
    $('#alphabet').hide();
    $('#hangman').hide();
    $('#hangWord').hide();
    $('.spellCont').show();
}

function clearGuessed() {
    for (var i = 0; i < guessed.length; i++) {
        var l = guessed[i];
        document.getElementById(l).style.removeProperty("background-color");
    }
}

function playMe() {
    currentWord.say();
}

function Speech(message) {
    var msg = new SpeechSynthesisUtterance(message);
    msg.lang = 'en';
    window.speechSynthesis.onvoiceschanged = function() {
        voices = window.speechSynthesis.getVoices();
    };
    this.say = function() {
        msg.voice = voices[1];
        window.speechSynthesis.speak(msg);
    }
}

function spellCheck() {
    var spellAttempt = $('#spelledWord').val().toLowerCase();
    spellCount++;
    if(spellAttempt == words[wordCount].toLowerCase()) {
        var correct = new Speech("Correct!");
        correct.say();
    } else {
        var incorrect = new Speech("WRONG!");
        incorrect.say();
    }

    if (spellCount == 3) {
        spaceBuilder();
        $('#spelledWord').val("");
        $('.spellCont').hide();
        $('#hangman').show();
        $('#hangWord').show();
        $('#alphabet').show();
    } else {
        var tryAgain = new Speech("Try Again!");
        $('#spelledWord').val("");
        tryAgain.say();
    }

}

//function to build the word-spaces.
function spaceBuilder() {
    var myDiv = "";
    var len = word.length*70; //Set the width necessary for the word length.
    var lMarg = (1140-len)/2; //Set the left margin such that the word is centered.
    len += "px";

    //Need to build the divs that go into the word space. Class will be space for styling & the lower-case letter.
    for (var i = 0; i<word.length; i++) {
        myDiv += "<div class='" + word[i] + " space'></div>";
    }
    $("#hangWord").html("").html(myDiv).css("width", len).css("margin-left", lMarg);
}

//Function that accepts a letter from a button on the page.
function sendLetter(theletter) {
    document.getElementById(theletter).style.backgroundColor = "#473AFF";
    //This if statement takes care of guessing the same letter multiple times.
    if (guessed.indexOf(theletter) == -1) {
        guessed.push(theletter); //Pushes the guessed letter into an array.
    } else {
        alert("You already guessed that letter! Try again!");
        return;
    }

    //Check if the letter is in the word. Change the letter to lowercase.
    if (word.search(theletter.toLowerCase()) == -1) {
        //if the letter isn't a match, this is what happens.
        wrongLetter.say();
        noMatch();
    } else {
        correct.say();
        match(theletter);
    }
}

//Function determines what happens if the chosen letter is not in the word.
function noMatch() {
    //This changes the image on a wrong guess and progresses the guesses.
    wrong++;
    document.getElementById("hangmanImg").innerHTML = "<img src='images/Hangman-"+wrong+".png'/>";
    //If you've run out of guesses, you lose. Game then resets.
    if (wrong == guesses) {
        loser.say();
        $('#nextWord').show();
        //location.reload();
    }
}

//function that determines what happens if there is a match in the word.
function match(ltr){
    ltr = ltr.toLowerCase();
    var matches = document.getElementsByClassName(ltr);
    for (var i = 0; i < matches.length; i++){
        matches[i].innerHTML = ltr.toUpperCase();
        right++;
    }
    //Need logic to tell us if the word has been guessed correctly.
    if (right == word.length) {
        win.say();
        $('#nextWord').show();
        //location.reload();
    }
}


// TODO: This is all the old code. Refactor and add it back in a little at a time, to make the hangman stuff work.

//var words = ["library","expensive","divided","transportation","famous","camera"],
//    word = "",
//    curWord = 0;
//wrong = 0,
//    guesses = 6,
//    model = "",
//    right = 0,
//
//    win = new Audio('audio/cheer.wav'),
//    correct = new Audio('audio/correct.mp3'),
//    wrongLetter = new Audio('audio/wrong.wav'),
//    loser = new Audio('audio/loser.wav'),
//    apiKey = "30816388-5db8-4a98-8881-34c5d30fe277",
//    apiRequest = "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/",
//    myApiRequest = "",
//    gameStates = {
//        Spelling: 0,
//        Hangman: 1
//    };
//var curState = gameStates.Spelling;
//
////Function to select the word from the array.
//function myWord () {
//    //This is the old code to randomly select the word.
//    //word = words[Math.floor(Math.random()*words.length)];
//
//    //This is the new code, which will rotate through the current words.
//    word = words[curWord];
//    word = word.toLowerCase();
//    myApiRequest = apiRequest + word + "?key=" + apiKey;
//    spaceBuilder();
//}
//
//
