/**
 * Created by Brandon on 10/18/2015.
 */
var words = ["library","expensive","divided","transportation","famous","camera"],
    wordCount = 0,
    currentWord = new Speech(words[wordCount]),
    spellCount = 0;

//jQuery(document).ready(function(){
//    nextWord();
//});

function nextWord() {
    currentWord = new Speech(words[wordCount]);
    currentWord.build();
}

function playMe() {
    currentWord.say();
}

function Speech(message) {
    var msg = new SpeechSynthesisUtterance(message);
    msg.lang = 'en';

    window.speechSynthesis.onvoiceschanged = function() {
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[1];
    };

    this.say = function() {
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
        $('.spellCont').hide();
        $('#hangman').show();
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
    var len = (word.length*70); //Set the width necessary for the word length.
    var lMarg = (1140-len)/2; //Set the left margin such that the word is centered.
    len += "px";

    //Need to build the divs that go into the word space. Class will be space for styling & the lower-case letter.
    for (var i = 0; i<word.length; i++) {
        myDiv += "<div class='" + word[i] + " space'></div>";
    }
    document.getElementById("hangWord").innerHTML = myDiv;
    $("#hangWord").css("width", len).css("margin-left", lMarg);
}





// TODO: This is all the old code. Refactor and add it back in a little at a time, to make the hangman stuff work.

//var words = ["library","expensive","divided","transportation","famous","camera"],
//    word = "",
//    curWord = 0;
//wrong = 0,
//    guesses = 6,
//    model = "",
//    right = 0,
//    guessed = [],
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
////function to build the word-spaces.
//function spaceBuilder() {
//    var myDiv = "";
//    var len = (word.length*70); //Set the width necessary for the word length.
//    var lMarg = (1140-len)/2; //Set the left margin such that the word is centered.
//    len += "px";
//
//    //Need to build the divs that go into the word space. Class will be space for styling & the lower-case letter.
//    for (var i = 0; i<word.length; i++) {
//        myDiv += "<div class='" + word[i] + " space'></div>";
//    }
//    document.getElementById("hangWord").innerHTML = myDiv;
//    $("#hangWord").css("width", len).css("margin-left", lMarg);
//}
//
////TODO: Add a function that adds an audio file that plays when the "Play" button is pressed.
//function playMe() {
//    getAudio();
//}
//
//
////pulls the audio file from the dictionary api
//function getAudio() {
//    var xhttp = new XMLHttpRequest();
//    xhttp.onreadystatechange = function() {
//        if (xhttp.readyState == 4 && xhttp.status == 200) {
//            model = JSON.parse(xhttp.responseText);
//        }
//    };
//    xhttp.open("GET", myApiRequest, true);
//    xhttp.send();
//}
//
////Function that accepts a letter from a button on the page.
//function sendLetter(theletter) {
//    document.getElementById(theletter).style.backgroundColor = "#473AFF";
//    //This if statement takes care of guessing the same letter multiple times.
//    if (guessed.indexOf(theletter) == -1) {
//        guessed.push(theletter); //Pushes the guessed letter into an array.
//    } else {
//        alert("You already guessed that letter! Try again!");
//        return;
//    }
//
//    //Check if the letter is in the word. Change the letter to lowercase.
//    if (word.search(theletter.toLowerCase()) == -1) {
//        //if the letter isn't a match, this is what happens.
//        wrongLetter.play();
//        noMatch();
//    } else {
//        correct.play();
//        match(theletter);
//    }
//}
//
////Function determines what happens if the chosen letter is not in the word.
//function noMatch() {
//    //This changes the image on a wrong guess and progresses the guesses.
//    wrong++;
//    document.getElementById("hangmanImg").innerHTML = "<img src='images/Hangman-"+wrong+".png'/>";
//    //If you've run out of guesses, you lose. Game then resets.
//    if (wrong == guesses) {
//        loser.play();
//        alert("Poor guy got hung! You lose! The word was: "+word+". Spell this three times, then click OK!");
//        location.reload();
//    }
//}
//
////function that determines what happens if there is a match in the word.
//function match(ltr){
//    ltr = ltr.toLowerCase();
//    //TODO: Need a way to change all of the matches when there are multiples.
//    var matches = document.getElementsByClassName(ltr);
//    for (var i = 0; i < matches.length; i++){
//        matches[i].innerHTML = ltr.toUpperCase();
//        right++;
//    }
//    //Need logic to tell us if the word has been guessed correctly.
//    if (right == word.length) {
//        win.play();
//        alert("HOORAY! YOU WIN! Please spell the word out loud three times, then click OK.");
//        location.reload();
//    }
//}