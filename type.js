const paragraphs = ["The comedian Bill Hicks said the world was tainted with fevered egos. In Ego Is the Enemy. Ryan Holiday writes us all a prescription: humility. This book is packed with stories and quotes that will help you get out of your own way. Whether you are starting out or starting over, you will find something to steal here.",
"I see the toxic vanity of ego at play every day and it never ceases to amaze me how often it wrecks promising creative endeavors. Read this book before it wrecks you or the projects and people you love. Consider it as urgently as you do a proper workout regimen and eating right. Ryan's insights are priceless.", 
"In his new book Ryan Holiday attacks the greatest obstacle to mastery and true success in life, our insatiable ego. In an inspiring yet practical way, he teaches us how to manage and tame this beast within us so that we can focus on what really matters, producing the best work possible.",
"This sudden movement to Linux is our desire to revisit the idea that a professional engineer can and should be able to do the one thing that is most basic to our work: examine the code, the actual program, the real and unvarnished representation of the system. I exaggerate only a little if I say it is a reassertion of our dignity as humans working with mere machines; a return, quite literally, to the source.",
"Oculus is my tilt at trying to change that. The tech has improved, and we can build hardware and software that is better, stronger, and faster than the old guard, companies that create niche, wildly expensive products. Don't get me wrong, these companies are important, and they have to solve some very tough engineering challenges to satisfy their customers. But the reality is that as gamers and dreamers, we have a different set of challenges to meet.",
"Massive field of view to engulf your visual senses, low latency tracking to maximize presence, light weight and comfortable for long term use, and perhaps most importantly, prices measured in the hundreds of dollars, not tens of thousands. I have worked long and hard with a lot of brilliant people to try and meet those challenges, and now it is time to put it in your hands."];


const textParagraph = document.getElementById('text');
const textBox = document.getElementById('textbox');
const buttons = document.querySelectorAll('.play');
const gameScore = document.getElementById('score');
const gameMistake = document.getElementById('mistake');
const wordsPerSecond = document.getElementById('wpm');
let seconds = document.getElementById('seconds');
let minutes = document.getElementById('minutes');
let min = 1, sec = 0;
let timeSec, timeMin;
let wordNum = 0;
let wpsOutput;
textBox.disabled = true;
textParagraph.style.opacity = 1;

let num = 0, score = 0; mistake = 0;
let index = Math.floor(Math.random() * 6);

// Game Setup

// Pre game
let countdown = setTimeout(() => {
    textBox.placeholder = 'Ready?';
}, 1000)

let kickoff = setTimeout(() => {
    textBox.placeholder = 'Type!';
    textBox.focus();
    timeSec =  setInterval(timerSec, 1000);
    timeMin =  setInterval(timerMin, 1000);
    textBox.disabled = false;
}, 3000)

// Gameplay
let words = paragraphs[index].split(" ");

words.forEach(span => {
    let spanTag = `<span class="span">${span} </span>`;
    textParagraph.innerHTML += spanTag;
})

let parWord = document.querySelectorAll('.span');

textBox.addEventListener('input', () => {
    textBox.style.fontSize = '16px';
    if(textBox.value == parWord[num].textContent) {
        parWord[num].style.color = 'blue';
        textBox.value = '';
        num++;
        score++;
        wordNum++;
    }

    if (textBox.value != parWord[num].textContent && textBox.value.length == parWord[num].textContent.length) {
        parWord[num].style.color = 'red';
        textBox.value = '';
        mistake++;
        num++;
        score--;
    }

    if(num == parWord.length) {
        clearInterval(timeMin);
        clearInterval(timeSec);
        textBox.disabled = true;
        textBox.value = "Test Complete!";
        textBox.style.fontSize = '20px';
        wordPerMin(wordNum, 60-sec);
    }
    if (score < 0) {
        score = 0;
    }
    gameScore.textContent = score;
    gameMistake.textContent = mistake;
})

// Play again and new game function

function gameEnd(e) {
    textBox.disabled = false;
    textBox.placeholder = '';
    if (e.target == buttons[0]) {
        clearTimeout(countdown);
        clearTimeout(kickoff);
        clearInterval(timeMin);
        clearInterval(timeSec);
        let restartIndex = index;
        textParagraph.style.opacity = 0;
        textBox.value = '';
        textParagraph.innerHTML = '';
        gameScore.textContent = 0;
        gameMistake.textContent = 0;
        wordsPerSecond.textContent = 0;
        minutes.textContent = `0${1}`;
        seconds.textContent =  `00`;
        parWord = '';
        min = 1;
        num = score = mistake = sec = wordNum = 0;
        words = paragraphs[restartIndex].split(" ");
        words.forEach(span => {
            let spanTag = `<span class="span">${span} </span>`;
            textParagraph.innerHTML += spanTag;
        })
        parWord = document.querySelectorAll('.span');
        setTimeout(() => {
            textParagraph.style.opacity = 1;
        }, 500)
        countdown = setTimeout(() => {
            textBox.placeholder = 'Ready?';
        }, 1000)
        
        kickoff = setTimeout(() => {
            textBox.placeholder = 'Type!';
            textBox.focus();
            timeSec = setInterval(timerSec, 1000);
            timeMin = setInterval(timerMin, 1000);
        }, 3000)

    }
    else {
        buttons[1].disabled = true;
        buttons[1].style.cursor = 'not-allowed';
        clearTimeout(countdown);
        clearTimeout(kickoff);
        clearInterval(timeMin);
        clearInterval(timeSec);
        index = Math.floor(Math.random() * 6);
        textParagraph.style.opacity = 0;
        textBox.value = '';
        textParagraph.innerHTML = '';
        gameScore.textContent = 0;
        gameMistake.textContent = 0;
        wordsPerSecond.textContent = 0;
        minutes.textContent = `0${1}`;
        seconds.textContent =  `00`;
        parWord = '';
        num = score = mistake = sec = wordNum = 0;

        setTimeout(() => {
            textParagraph.style.opacity = 1;
            words = paragraphs[index].split(" ");
            words.forEach(span => {
              let spanTag = `<span class="span">${span} </span>`;
              textParagraph.innerHTML += spanTag;
            })
        parWord = document.querySelectorAll('.span');
        }, 500)
        setTimeout(() => {
            textParagraph.style.opacity = 1;
        }, 500)
        countdown = setTimeout(() => {
            textBox.placeholder = 'Ready?';
        }, 1000)
        
        kickoff = setTimeout(() => {
            textBox.placeholder = 'Type!';
            textBox.focus();
            timeSec = setInterval(timerSec, 1000);
            timeMin = setInterval(timerMin, 1000);
            buttons[1].disabled = false;
            buttons[1].style.cursor = 'pointer';
        }, 3000)
    }
}

buttons.forEach(button => {
    button.addEventListener('click', gameEnd);
})

// timer

function timerSec() {
    if (seconds.textContent == '00') {
        sec = 59;
    }
    if (sec < 10) {
        seconds.textContent = `0${sec--}`;
    }
    else {
      seconds.textContent = sec--;
    }

    if (sec < 0) {
        clearInterval(timeSec);
        clearInterval(timeMin);
        textBox.disabled = true;
        textBox.value = "Time's up!";
        textBox.style.fontSize = '20px';
        wordPerMin(wordNum, 60);
    }
};

function timerMin() {
    if (seconds.textContent == '59') {
         minutes.textContent = `0${min-1}`;
    }
};

// calculate words per minute
function wordPerMin(data1, data2) {
    wpsOutput =  data1 / data2;
    wpsOutput = wpsOutput.toFixed(2);
    wordsPerSecond.textContent = wpsOutput;
}