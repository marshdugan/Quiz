var startButton = document.querySelector("#start-button");
var myH1 = document.querySelector("h1");
var mainEl = document.querySelector(".main");
var i = 0;
var totalTime = 60;
var score = 0;
var gameOver = false;
var nameCount = 0;
var question = document.createElement("section");

var quiz = [{
    q: "The Elder Scrolls V: ",
    c1: "Oblivion",
    c2: "Skyrim",
    c3: "Odyssey",
    c4: "World",
    a: "Skyrim"
},
{
    q: "What is the name of Mario's Brother?",
    c1: "Bowser",
    c2: "Anthony",
    c3: "Luigi",
    c4: "Jeremy",
    a: "Luigi"
},
{
    q: "Who is Nintendo's mascot?",
    c1: "Rocket",
    c2: "Sonic",
    c3: "Ellie",
    c4: "Mario",
    a: "Mario"
},
{
    q: "Which of these is not a rouge-like?",
    c1: "Binding of Isaac",
    c2: "Enter the Gungeon",
    c3: "Slay the Spire",
    c4: "The Last of Us",
    a: "The Last of Us"
},
{
    q: "Which company does not publish video games?",
    c1: "Sony",
    c2: "Microsoft",
    c3: "Dell",
    c4: "Activision",
    a: "Dell"
},
{
    q: "Which console generation are we entering in 2020?",
    c1: "Tenth",
    c2: "Third",
    c3: "Fifth",
    c4: "Ninth",
    a: "Ninth"
},
{
    q: "Choose the game that does not belong:",
    c1: "The Legend of Zelda",
    c2: "Grand Theft Auto",
    c3: "Red Dead Redemption",
    c4: "Bully",
    a: "The Legend of Zelda"
},
{
    q: "What was the first commercially successful video game?",
    c1: "Pac-Man",
    c2: "Street FIghter",
    c3: "Pong",
    c4: "Super Mario Bros.",
    a: "Pong"
}];

function startQuiz() {
    startButton.style.display = "none";
    timer();
    setQuestion(i);
}

function setQuestion(i) {
    console.log(i);
    //if you make it past the final question, end game
    if (i === quiz.length) {
        endQuiz();
        return;
    }
    question.style.textAlign = "center";
    question.textContent = quiz[i].q;
    mainEl.appendChild(question);
    //displays each question
    for (var j = 1; j < Object.keys(quiz[i]).length - 1; j++) {
        var choices = Object.keys(quiz[i])[j];
        var sectionChoice = document.createElement("section");
        var buttonChoice = document.createElement("button");

        sectionChoice.setAttribute("class", "text-center");
        buttonChoice.setAttribute("class", "btn btn-primary options");

        buttonChoice.textContent = quiz[i][choices];
        sectionChoice.appendChild(buttonChoice);
        question.appendChild(sectionChoice);
    }
    
    //runs through all of the options
    var myOptions = document.querySelectorAll(".options");
    for (var temp = 0; temp < myOptions.length; temp++) {
        myOptions[temp].addEventListener("click", function () {
            
            console.log(event.target.innerText);
            if (event.target.innerText !== quiz[i].a) {
                totalTime -= 10;
            } else {
                score++;
            }
            
            question.remove();
            setQuestion(++i);
        });
    }   
}

//timer runs universally
function timer() {
    var myH2 = document.createElement("h2");
    myH2.textContent = totalTime;
    myH2.style.textAlign = "right";
    myH1.appendChild(myH2);
    var countdown = setInterval(function() {
        totalTime--;
        myH2.textContent = totalTime;
        myH2.style.textAlign = "right";
        myH1.appendChild(myH2);

        //game end condition
        if (totalTime <= 0) {
            clearInterval(countdown);
            question.remove();
            var endText = document.createElement("div");
            endText.textContent = "You ran out of time!"
            mainEl.append(endText);
        }
        if (gameOver) {
            clearInterval(countdown);
        }
    }, 1000);
}

//creating end screen
function endQuiz() {
    gameOver = true;
    question.textContent = "Thanks for playing! Here is your score: " + score;
    mainEl.appendChild(question);
    
    var myInput = document.createElement("INPUT");
    myInput.setAttribute("type", "text");
    myInput.setAttribute("class", "form-control");
    myInput.setAttribute("placeholder", "Enter your name for leaderboard");
    mainEl.appendChild(myInput);
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("class", "btn btn-primary submit");
    submitBtn.textContent = "Submit";
    mainEl.appendChild(submitBtn);

    
    //adds name to local storage
    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();
        var userName = document.querySelector("input").value;
        localStorage.setItem(userName, score);
        
    })
}


startButton.addEventListener("click", startQuiz);