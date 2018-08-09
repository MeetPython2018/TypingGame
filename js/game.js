class Game{
    constructor(bgmusic,life,score,screen,flag,death){
        //构造函数自动运行
        this.screen=screen;
        this.bgmusic=bgmusic;
        this.score=score;
        this.flag=flag;
        this.life=life;
        this.keyCon="";
        this.letterWidth="0.53";
        this.letterBox=[];
        this.left="";
        this.scoreNow=0;
        this.sudu=0.1;
        this.lifeNow=10;
        this.death=death;
        this.init();
    }
    createLetter(num=1){
        for(let i=0;i<num;i++){
            //创建字母 1.保存到数据中  2.插入到页面中
            let obj={};
            let letter="";
            do{
                let ascll=Math.floor(Math.random()*26+65);
                letter=String.fromCharCode(ascll);
            }while(this.IFhas(letter))
            obj.name=letter;
            let left="";
            do{
                left=Math.random()*5.7+0.6;
            }while(this.isRepeat(left))
            //创建存放字母的块
            let div=document.createElement("div");
            div.className="letter";
            div.style.backgroundImage=`url(img/A_Z/${letter}.png)`;
            div.style.left=`${left}rem`;
            obj.left=left;
            obj.top=0.9;
            obj.node=div;
            this.letterBox.push(obj);
            this.screen.appendChild(div);
        }
        // console.log(this.letterBox);
    }
    init(){
        this.bgmusic.className="Astart";
        this.life.innerText="10";
        this.score.innerText="0";
        this.flag.className="end";
        this.letterBox=[];
        this.lifeNow=10;
        this.scoreNow=0;
        this.sudu=0.1;
        this.t="";
        this.screen.innerText="";
        // this.flag="";
        this.death.style.display="none";
    }
    IFhas(letter){
        for(let item of this.letterBox){
            if(letter==item.name){
                return true
            }
        }
        return false;
    }
    isRepeat(left){
        for(let item of this.letterBox){
            let bool=Math.abs(left-item.left)<this.letterWidth;
            if(bool){
                return true;
            }
        }
        return false;
    }
    dowm(){
        /* let that=this;
        this.t=setInterval(function(){
            that.letterBox.forEach(function(element,index){
                element.top+=0.1;
                element.node.style.top=element.top+"rem";
                if(element.top>7.25){
                    that.screen.removechild(element.node);
                    that.letterBox.splice(index,1);
                    that.createLetter();
                }
            })
        },200) */
        this.t=setInterval(()=>{
            this.letterBox.forEach((item,index)=>{
                item.top+=this.sudu;
                if(item.top>7.25){
                    this.lifeNow--;
                    this.reducelife();
                    this.screen.removeChild(item.node);
                    this.letterBox.splice(index,1);
                    this.createLetter();
                }
                item.node.style.top=item.top+"rem";
            })
        },200)
    }
    delKey(words){
        this.letterBox.forEach((item,index)=>{
            if(item.name==words){
                this.scoreNow++;
                this.addscore();
                this.screen.removeChild(item.node);
                this.letterBox.splice(index,1);
                this.createLetter();
            }
        })
    }
    addscore(){
        this.score.innerText=this.scoreNow;
        this.sudu=this.scoreNow/100+0.1;
    }
    reducelife(){
        this.life.innerText=this.lifeNow;
        if(this.lifeNow<=0){
            this.death.style.display="block";
            this.pause();
            this.death.childNodes[1].childNodes[1].innerText=this.scoreNow;
        }
    }
    pause(){
        clearInterval(this.t);
    }
    replay(){
        this.init();
        this.createLetter(5);
        /* let that=this;
        this.death.childNodes[1].childNodes[3].onclick=function(){
            that.death.style.display="none";
            that.init();
        } */
    }
}