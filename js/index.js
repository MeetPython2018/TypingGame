window.onload=function(){
    let keyCon=document.querySelector(".keyCon");
    let screen=document.querySelector(".screen");
    let bgmusic=document.querySelector("#bgmusic")
    let flag=document.querySelector("#flag");
    let life=document.querySelector(".life");
    let score=document.querySelector(".score");
    let death=document.querySelector(".gameover");
    let replay=document.querySelector(".resatrt");
    let key=document.querySelector(".info");
    let mp3=document.querySelector("audio");
    let myflag=false;
    keyCon.ontouchstart=function(e){
        if(!myflag){
            return;
        }
        if(e.target.className=="button"){
            e.target.style.transform="scale(0.8)"
            let words=e.target.innerText;
            gameobj.delKey(words);
        }
    }
    keyCon.ontouchend=function(e){
        if(e.target.className=="button"){
            e.target.style.transform="scale(1)"
        }
    }
    bgmusic.ontouchstart=function(){
        if(bgmusic.className=="Astart"){
            bgmusic.className="Aend"
            mp3.pause()
        }else{
            bgmusic.className="Astart"
            mp3.play()
        }
    }
    flag.ontouchstart=function(){
        if(flag.className=="start"){
            myflag=false;
            flag.className="end"
            gameobj.pause();
            key.style.opacity="1";
        }else{
            myflag=true;
            flag.className="start" ;
            gameobj.dowm();
            key.style.opacity="0.3";
        }
    }
    replay.ontouchstart=function(){
        gameobj.replay();
    }
    let gameobj=new Game(bgmusic,life,score,screen,flag,death);
    gameobj.createLetter(5);
    // gameobj.init();
    // gameobj.dowm();
    // gameobj.pause();
    // gameobj.delKey();
    // gameobj.replay();
}