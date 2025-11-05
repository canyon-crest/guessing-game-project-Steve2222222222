// global variables
let level, answer, score;
let playerName="";
const levelArr=document.getElementsByName("level");
const scoreArr=[];
monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
let nameInput=document.getElementById("person");



date.textContent=time();
//add event listeners
playBtn.addEventListener("click",play);
guessBtn.addEventListener("click",makeGuess);
giveUp.addEventListener("click",give);
nameBtn.addEventListener("click",getPlayerName);






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
    for(let i=0;i<levelArr.length;i++){
        if(levelArr[i].checked){ //sees what difficulty is picked
            level = levelArr[i].value; //goes into html to see value of difficulty picked
        }
        levelArr[i].disabled=true;
    }
    msg.textContent = "Guess a number from 1-"+level;
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
    if(userGuess<answer){
        msg.textContent = "Too Low, " + proximity;
    }
    else if(userGuess>answer){
        msg.textContent = "Too High — " + proximity;
    }
    else{
        msg.textContent="You  got it after "+score+" tries " +playerName+". Press play to play again";
        updateScore();
        reset();
    }

}
function reset(){
    playBtn.disabled=false;
    guessBtn.disabled=true;
    guess.disabled=true;
    giveUp.disabled=true;
    guess.value="";
    guess.placeholder="";
    for(let i=0;i<levelArr.length;i++){
        levelArr[i].disabled=false;
    }
}
function give(){
    score=level; //max score if you give up
    updateScore();
    score=0;
    reset();
    msg.textContent = playerName+" how could you do this to me. Unfortunate you could not get it. The answer was "+answer+". Try again later"

}
function updateScore(){
    scoreArr.push(score);
    scoreArr.sort((a,b)=>a-b);//sort increasing order
    let lb=document.getElementsByName("leaderboard");
    wins.textContent="Total wins: "+scoreArr.length;
    let sum=0;
    for(let i=0;i<scoreArr.length;i++){
        sum+=scoreArr[i];
        if(i<lb.length){
            lb[i].textContent=playerName+": " +scoreArr[i];
        }
    }
    let avg=sum/scoreArr.length;
    avgScore.textContent="Average Score: " + avg.toFixed(2);
}
function time(){
    let d =new Date();
    let month=d.getMonth();
    let day=d.getDate();
    let year=d.getFullYear();
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
    d=monthNames[month]+" "+day+" "+year;
    //use set interval to have time tick
    return d;
}
