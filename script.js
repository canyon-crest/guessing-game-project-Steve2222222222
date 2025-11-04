// global variables
let level, answer, score;
const levelArr=document.getElementsByName("level");
const scoreArr=[];

date.textContent=time();
//add event listeners
playBtn.addEventListener("click",play);
guessBtn.addEventListener("click",makeGuess);
giveUp.addEventListener("click",give);
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
function makeGuess(){
    let userGuess=parseInt(guess.value);
    if(isNaN(userGuess) || userGuess<1 || userGuess> level){
        msg.textContent="Enter a VALID #1-"+level;
        return;
    }
    score++;//valid guess add one to score
    if(userGuess<answer){
        msg.textContent="Too Low";
    }
    else if(userGuess>answer){
        msg.textContent="Too High";
    }
    else{
        msg.textContent="You finally got it after "+score+" tries. Press play to play again";
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
    reset()
    msg.textContent = "Unfortunate you could not get it. The answer was "+answer+". Try again later"
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
            lb[i].textContent=scoreArr[i];
        }
    }
    let avg=sum/scoreArr.length;
    avgScore.textContent="Average Score:" + avg.toFixed(2);
}
function time(){
    let d =new Date();
    //concatenate a string with all the date information here
    //d=d.getFullYear()+" "+d.getTime();
    //use set interval to have time tick
    return d;
}