/**
 * Created by Brandon on 10/18/2015.
 */
var words = ["Word","liar","Terrible"];
var word = "";
var wrong = 0;
var guesses = 6;
var right = 0;
var guessed = [];

//Function to select the word from the array.
function myWord () {
    word = words[Math.floor(Math.random()*words.length)];
    word = word.toLowerCase();
    spaceBuilder();
}

//function to build the word-spaces.
function spaceBuilder() {
    var myDiv = "";
    //Need to build the divs that go into the word space. Class will be space for styling & the lower-case letter.
    for (var i = 0; i<word.length; i++) {
        myDiv += "<div class='" + word[i] + " space'></div>";
    }
    document.getElementById("hangWord").innerHTML = myDiv;
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
        noMatch();
    } else {
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
        alert("Poor guy got hung! You lose! The word was: "+word);
        location.reload();
    }
}

//function that determines what happens if there is a match in the word.
function match(ltr){
    ltr = ltr.toLowerCase();
    //TODO: Need a way to change all of the matches when there are multiples.
    var matches = document.getElementsByClassName(ltr);
    for (var i = 0; i < matches.length; i++){
        matches[i].innerHTML = ltr.toUpperCase();
        right++;
    }
    //Need logic to tell us if the word has been guessed correctly.
    if (right == word.length) {
        alert("HOORAY! YOU WIN! Please spell the word out loud three times, then click OK.");
        location.reload();
    }
}



myWord();
