// global variables
let level, answer, score;
let playerName="";
const levelArr=document.getElementsByName("level");
const scoreArr=[];
const timeArr=[];
const nameArr = [];
monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
let nameInput=document.getElementById("person");



let startTime = 0;      // When the timer starts
let elapsed = 0;        // Time passed (ms)
let timer;              // setInterval reference
let running = false;

date.textContent=time();
//add event listeners
playBtn.addEventListener("click",play);
guessBtn.addEventListener("click",makeGuess);
giveUp.addEventListener("click",give);
nameBtn.addEventListener("click",getPlayerName);

function updateDisplay() {
  let current = new Date().getTime();
  let diff = current - startTime + elapsed;  // total elapsed time in ms
  document.getElementById("display").innerHTML = (diff / 1000).toFixed(2);
}

function start(){
    if (!running) {
    startTime = new Date().getTime(); // capture start
    timer = setInterval(updateDisplay, 10); // update every 10 ms
    running = true;
    }
}
function stopTime() {
  if (running) {
    clearInterval(timer);
    let stopTime = new Date().getTime();
    elapsed += stopTime - startTime; // add time since last start
    running = false;
  }
}

function resetTime() {
  clearInterval(timer);
  startTime = 0;
  elapsed = 0;
  running = false;
  document.getElementById("display").innerHTML = "0.00";
}
function getPlayerName(){

    playerName = nameInput.value.charAt(0).toUpperCase() + nameInput.value.slice(1).toLowerCase();
    if(playerName ==""||!isNaN(Number(playerName))){ 
        msg.textContent="Please enter a valid name.";
        return;
    }
    
    msg.textContent = "Player: " + playerName;
    playBtn.disabled=false;
    nameInput.value = "";
}

function play(){
    score=0; //sets score to 0 every new game
    playBtn.disabled=true;
    guessBtn.disabled=false;
    giveUp.disabled=false;
    guess.disabled=false;

    resetTime();
    start();
    for(let i=0;i<levelArr.length;i++){
        if(levelArr[i].checked){ //sees what difficulty is picked
            level = levelArr[i].value; //goes into html to see value of difficulty picked
        }
        levelArr[i].disabled=true;
    }
    msg.textContent = "Guess a number from 1-"+level;
    msg2.textContent="";
    answer=Math.floor(Math.random()*level)+1;
    guess.placeholder=answer;

}

function getProximityFeedback(diff){
        const lvl = Number(level);
        const hot = Math.max(1, Math.round(lvl * 0.05)); 
        const warm = Math.max(2, Math.round(lvl * 0.15)); 
        const cool = Math.max(5, Math.round(lvl * 0.30)); 

        if (diff === 0) return "Right on target";
        if (diff <= hot) return "Hot";
        if (diff <= warm) return "Warm";
        if (diff <= cool) return "Cool";
        return "Cold";
    }

function makeGuess(){
    let userGuess=parseInt(guess.value);
    if(isNaN(userGuess) || userGuess<1 || userGuess> level){
        msg.textContent="Enter a VALID #1-"+level;
        return;
    }
    score++;

    const diff = Math.abs(userGuess - answer);
    const proximity = getProximityFeedback(diff);
    updateHeatBar(diff);

    if(userGuess<answer){
        msg.textContent = "Too Low, " + proximity;
    }
    else if(userGuess>answer){
        msg.textContent = "Too High — " + proximity;
    }
    else{
        msg.textContent="You  got it after "+score+" tries " +playerName;
        if (score<=level*2.5){
            msg2.textContent+="Nice "+playerName+"! You're pretty good.";
        }
        else if(score>=level*2.5&&score<=level*10){
            msg2.textContent+="You're alright "+playerName+", do better.";
        }
        else{
            msg2.textContent+="Wow "+playerName+", that was pretty bad";
        }
        flashWin();
        stopTime();
        updateScore();
        reset();
    }

}


function flashWin() {
  let flashes = 0;
  const colors = ["#9aaf3cff", "#e2ad39ff"];
  const flasher = setInterval(() => {
    msg.style.color = colors[flashes % 2];
    flashes++;
    if (flashes > 6) {
      clearInterval(flasher);
      msg.style.color = "#000"; // reset color
    }
  }, 200);
}
function reset(){
    playBtn.disabled=false;
    guessBtn.disabled=true;
    guess.disabled=true;
    giveUp.disabled=true;
    guess.value="";
    guess.placeholder="";

    for (let i = 0; i < levelArr.length; i++) {
    levelArr[i].disabled = false;
  }
}


function give(){
    stopTime();
    score=level; //max score if you give up
    updateScore();
    reset();
    score=0;
    msg.textContent = playerName+" how could you do this to me. Unfortunate you could not get it. The answer was "+answer+". Try again later"
    

}

function updateScore(){
    scoreArr.push(score);
    timeArr.push(elapsed/1000);
    nameArr.push(playerName);
    for (let i = 0; i < scoreArr.length - 1; i++) {
        for (let j = i + 1; j < scoreArr.length; j++) {
            if (scoreArr[i] > scoreArr[j] || (scoreArr[i] === scoreArr[j] && timeArr[i] > timeArr[j])) {
                // swap scores
                [scoreArr[i], scoreArr[j]] = [scoreArr[j], scoreArr[i]];
                // swap times
                [timeArr[i], timeArr[j]] = [timeArr[j], timeArr[i]];
                // swap names
                [nameArr[i], nameArr[j]] = [nameArr[j], nameArr[i]];
            }
        }
    }
    let lb=document.getElementsByName("leaderboard");
    wins.textContent="Total wins: "+scoreArr.length;
    let sum=0;
    let sumTime=0;
    for(let i=0;i<scoreArr.length;i++){
        sum+=scoreArr[i];
        sumTime+=timeArr[i];
        if(i<lb.length){
            lb[i].textContent=nameArr[i]+": " +scoreArr[i]+", time of: "+timeArr[i].toFixed(2)+"s";
        }
    }
    const avgScoreVal = sum / scoreArr.length;
    const avgTimeVal = sumTime / timeArr.length;

    avgScore.textContent = "Average Score: " +avgScoreVal.toFixed(2) +", Average Time: " +avgTimeVal.toFixed(2) +"s";
 }
setInterval(time, 1000);
function time(){

    let d =new Date();
    let month=d.getMonth();
    let day=d.getDate();
    let year=d.getFullYear();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    if(day==1){
        day=day+"st";
    }
    else if(day==2){
        day=day+"nd";
    }
    else if(day==3){
        day=day+"rd";
    }
    else{
        day=day+"th";
    }
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    d=monthNames[month]+" "+day+" "+year+"---"+hours+":"+minutes+":"+seconds+" "+ampm;
    document.getElementById("date").textContent = d;

    return d;
}
function updateHeatBar(diff) {
  const heatFill = document.getElementById("heatFill");

  // Calculate how close the guess is (100% = correct)
  const proximityPercent = Math.max(0, 100 - (diff / level) * 100);

  // Change the width based on proximity
  heatFill.style.width = proximityPercent + "%";

  // Change the color smoothly using HSL (Hue, Saturation, Lightness)
  // Red when close (0 hue), Blue when far (240 hue)
  const hue = Math.floor((proximityPercent / 100) * 240);
  heatFill.style.backgroundColor = `hsl(${240 - hue}, 100%, 50%)`;
}
