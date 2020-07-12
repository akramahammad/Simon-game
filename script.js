$(document).ready(function(){

    let heading = $("#level-title")
    initheading=heading.text();
    let actorder=[];
    let typorder=[];
    const blue=new Audio("./sounds/blue.mp3");
    const yellow=new Audio("./sounds/yellow.mp3");
    const green=new Audio("./sounds/green.mp3");
    const red=new Audio("./sounds/red.mp3");
    const wrong =new Audio("./sounds/wrong.mp3");
    
    
    document.addEventListener("keyup",function(){
        if(heading.text()==initheading){
            heading.text("Level 1");
            genorder();
        }
    })

    $(".blue").click(()=>{
        blue.play();
    })

    $(".green").click(()=>{
        green.play();
    })

    $(".yellow").click(()=>{
        yellow.play();
    })

    $(".red").click(()=>{
        red.play();
    })

    const generateRandom=()=>{
        let n = Math.floor(Math.random()*4);
        return n;
    }

    const genorder=()=>{
        const seq=generateRandom();
        
        setTimeout(()=>{
            $("#"+seq).addClass("flash");
            switch(seq){
                case 0:
                    green.play();
                    break;
                case 1:
                    red.play();
                    break;
                case 2:
                    yellow.play();
                    break;
                case 3:
                    blue.play();
                    break;
            }
        },300)

        setTimeout(()=>{
            $("#"+seq).removeClass("flash");
        },400)
        actorder.push(seq);
        console.log(actorder)
    }

    $(".btn").click((e)=>{
        let clicked=e.target.id;
        const ele=e.target;
        let leng=actorder.length;
        let pos;
        if(!(typorder==undefined)){
            pos =typorder.length;
        }
        else{
            pos=0;
        }
        if(clicked==actorder[pos]){
            ele.classList.add("pressed");
            setTimeout(()=>{
                ele.classList.remove("pressed");
                if(leng==typorder.length){
                    let level = heading.text();
                    level =parseInt(level.split(" ")[1]) +1;
                    heading.text("Level "+level);
                    genorder();
                    typorder=[];
                }
            },100);
            typorder.push(clicked);
        }
        else{
            heading.text("Game Over")
            $("body").addClass("game-over")
            wrong.play();
            actorder=[];
            setTimeout(()=>{
                heading.text(initheading);
                $("body").removeClass("game-over")     
            },2000)
        }
        
    })

})