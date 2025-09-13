let gameseq=[];
let userseq=[];

let btns=["pink", "green", "purple", "blue"];
let started=false;
let level=0;
let highscore=0;


let h2=document.querySelector("h2");

document.addEventListener("keypress" , function () {
    if(started==false){
        console.log("game started");

        reset();
        started=true;   

        levelUp();           // when game is started call function levelUp
    }
});

function gameFlash(btn) {
      btn.classList.add("flash");
      setTimeout ( function() {
        btn.classList.remove("flash");
      },250)
}

function userFlash(btn) {
      btn.classList.add("userflash");
      setTimeout ( function() {
        btn.classList.remove("userflash");
      },250)
}
function levelUp()
{
    userseq =[];
    level++;
    h2.innerText=`Level ${level}`;

    //random button choose
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    console.log(gameseq);
    gameFlash(randBtn);
}

function checkAns(idx){
    
    if(userseq[idx] === gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{

        let wrong= new Audio("game-over-deep-male-voice-clip-352695.mp3");
        wrong.play();

        if (level > highscore) {
            highscore = level;
        }
        h2.innerHTML=`Game over ! your score is <b>${level}</b> <br> Press any key to start again <br> Highest Score: ${highscore}`;
        document.querySelector("body").style.backgroundColor="red";
        // setTimeout(function() {
        //     document.querySelector("body").style.backgroundColor="black";
        // },150)
    
        //reset();

        started=false;
    }
}


function btnPress() {
    //console.log(this);
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userseq.push(userColor);

   checkAns(userseq.length - 1);

}

let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns)
{
    btn.addEventListener("click",btnPress);
}

function reset(){
   // started=false;
    gameseq=[];
    userseq=[];
    level=0;

    document.querySelector("body").style.backgroundColor="black";

}