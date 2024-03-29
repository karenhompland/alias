var scoreList;
var numOfPlayers;
var wordList;
var noOfWords;
var wordCount=0;
var usedWords;

function onLoad() {
    checkLocalStorage();
    usedWords=[];
    for (const x of Array(numOfPlayers).keys()) {
        document.getElementById(`player${x + 1}`).style.display = "flex";
    }
}

function checkLocalStorage() {
    localStorage.getItem('numPlayers') != null ? numOfPlayers = parseInt(localStorage.getItem('numPlayers')) : numOfPlayers = 3;
    if (localStorage.getItem('scoreList') != null) {
        scoreList = localStorage.getItem('scoreList').split(",").map(function (item) {
            return parseInt(item);
        })
        updateAllScores();
    }
    else {
        scoreList = Array(numOfPlayers).fill(0);
    }
    if (localStorage.getItem('wordlist') != null) {
        wordList = localStorage.getItem('wordlist').split(",");
        noOfWords = wordList.length;
    }
}

function updateAllScores() {
    for (const x of Array(scoreList.length).keys()) {
        document.getElementById(`score${x + 1}`).innerHTML = scoreList[x];
    }
}

function scoreClickMin(id) {
    scoreList[id - 1] -= 1;
    document.getElementById(`score${id}`).innerHTML = scoreList[id - 1];
    localStorage.setItem('scoreList', scoreList);
}

function scoreClickPlus(id) {
    scoreList[id - 1] += 1;
    document.getElementById(`score${id}`).innerHTML = scoreList[id - 1];
    localStorage.setItem('scoreList', scoreList);
}

function plusPlayer() {
    if (numOfPlayers < 6) {
        numOfPlayers += 1;
        if (numOfPlayers == 1) {
            scoreList = [0];
        }
        else {
            scoreList.push(0);
        }
        document.getElementById(`player${numOfPlayers}`).style.display = "flex";
    }
    if (numOfPlayers == 6) {
        document.getElementById("plusPlayer").disabled = true;
    }
    document.getElementById("minPlayer").disabled = false;
    savePlayers();
}

function minPlayer() {
    if (numOfPlayers > 0) {
        document.getElementById(`player${numOfPlayers}`).style.display = "none";
        numOfPlayers -= 1;
        scoreList.pop();
    }
    if (numOfPlayers == 0) {
        document.getElementById("minPlayer").disabled = true;
    }
    document.getElementById("plusPlayer").disabled = false;
    savePlayers();
}

function savePlayers() {
    localStorage.setItem("numPlayers", numOfPlayers);
    localStorage.setItem("scoreList", scoreList);
}

function changePlayers() {
    document.getElementById("return-to-game").style.display="flex";
    document.getElementById("plusPlayer").style.display="block";
    document.getElementById("minPlayer").style.display="block";
    document.getElementById("change-players").style.display="none";
    document.getElementById("change-words").style.display="none";
    document.getElementById("resetPlayer").style.display="block";
    document.getElementById("restartGameButton").style.display="none";
    const playerNames = document.querySelectorAll('.player-name');
    playerNames.forEach(element => {
        element.contentEditable = "true";
        element.style.textDecoration = "underline 2px #FFFFFF99";
    });
}

function returnToGame() {
    document.getElementById("return-to-game").style.display="none";
    document.getElementById("plusPlayer").style.display="none";
    document.getElementById("minPlayer").style.display="none";
    document.getElementById("change-players").style.display="flex";
    document.getElementById("change-words").style.display="flex";
    document.getElementById("wordSection").style.display="flex";
    document.getElementById("wordListSection").style.display="none";
    document.getElementById("scoreSection").style.display="flex";
    document.getElementById("resetPlayer").style.display="none";
    document.getElementById("restartGameButton").style.display="flex";
    const playerNames = document.querySelectorAll('.player-name');
    playerNames.forEach(element => {
        element.contentEditable = "false";
        element.style.textDecoration = "none";
    });
    localStorage.setItem("wordlist",document.getElementById("textArea").value);
    if (localStorage.getItem('wordlist') != null) {
        wordList = localStorage.getItem('wordlist').split(",");
        noOfWords = wordList.length;
    }
    usedWords = [];
}

function changeWords() {
    document.getElementById("return-to-game").style.display="flex";
    document.getElementById("change-words").style.display="none";
    document.getElementById("change-players").style.display="none";
    document.getElementById("wordSection").style.display="none";
    document.getElementById("wordListSection").style.display="block";
    document.getElementById("scoreSection").style.display="none";
    document.getElementById("restartGameButton").style.display="none";
    
}

function resetPlayers () {
    scoreList = Array(7).fill(0);
    localStorage.setItem('scoreList', scoreList);
    updateAllScores();
}

function nextWord() {
    document.getElementById("currentWord").style.color="#000000";
    document.getElementById("previousWordButton").disabled = false;
    min = Math.ceil(0);
    max = Math.floor(wordList.length-1);
    randomInt= Math.floor(Math.random() * (max - min + 1)) + min;

    if (wordList.length>0 && wordList.at(randomInt).length>=1) {
        usedWords.push(wordList.at(randomInt)); 
        document.getElementById("currentWord").innerText=wordList.at(randomInt);
        wordList.splice(randomInt,1);
        noOfWords--;
    }
    else {
        document.getElementById("currentWord").innerText="Ingen ord igjen";
        document.getElementById("currentWord").style.color="#696969";
        document.getElementById("nextWordButton").disabled = true;
    }
}

function previousWord() {
    document.getElementById("nextWordButton").disabled = false;
    document.getElementById("currentWord").style.color="#000000";
    if (usedWords.length!=0) {
        document.getElementById("currentWord").innerText=usedWords.pop(-1);
    }
    else {
        document.getElementById("currentWord").innerText="Alias";
        document.getElementById("currentWord").style.color="#696969";
        document.getElementById("previousWordButton").disabled = true;
        restartGame();
    }
}

function restartGame() {
    usedWords = [];
    wordList = localStorage.getItem('wordlist').split(",");
    noOfWords = wordList.length;
    document.getElementById("currentWord").innerText="Alias";
    document.getElementById("currentWord").style.color="#696969";
    document.getElementById("previousWordButton").disabled = true;
    document.getElementById("nextWordButton").disabled = false;

}