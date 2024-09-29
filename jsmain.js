let bg;
let bgWidth = 500;
let bgHeight = 500;
let context;

let playerWidth = 10;
let playerHeight = 50;
let playerVeloY= 0;

let ballW=10;
let ballH =10;

let pscore = 0;
let extraps = 0;
let compscore = 0;
let extracomps = 0;
let comspeed = 0.15;
let hits = 1;
let resetcounter= 0;

let p1 = {
    x:10,
    y:bgHeight/2,
    width:playerWidth,
    height:playerHeight,
    velocityY: playerVeloY
}

let comp = {
    x:bgWidth-playerWidth-10,
    y:bgHeight/2,
    width:playerWidth,
    height:playerHeight,
    velocityY: playerVeloY
}

let ball = {
    x:bgWidth/2,
    y:bgHeight/2,
    width:ballW,
    height:ballH,
    velocityX:1,
    velocityY:2.5
}


window.onload = function() {
    canvas = document.getElementById("canvas");
    canvas.height = bgHeight;
    canvas.width = bgWidth;
    context=canvas.getContext("2d");

    context.fillStyle = "rgb(60, 255, 60)";
    context.fillRect(p1.x,p1.y,p1.width,p1.height)

    context.fillStyle = "rgb(60, 255, 60)";
    context.fillRect(comp.x,comp.y,comp.width,comp.height)

    context.fillStyle = "blue";
    ball.y += ball.velocityY;
    ball.x += ball.velocityX;
    context.fillRect(ball.x,ball.y,ball.width,ball.height)

    requestAnimationFrame(gameloop);
    document.addEventListener("keyup", moveP);
}

function gameloop(){
    requestAnimationFrame(gameloop);
    context.clearRect(0,0,bgWidth,bgHeight)

    context.fillStyle = "rgb(60, 255, 60)";
    let p1veloY = p1.y+p1.velocityY;
    if (!outCanvas(p1veloY)){
        p1.y=p1veloY;
    }
    context.fillRect(p1.x,p1.y,p1.width,p1.height)

    context.fillStyle = "rgb(60, 255, 60)";
    comp.y+=comspeed*(ball.y-comp.y-25);
    context.fillRect(comp.x,comp.y,comp.width,comp.height)

    context.fillStyle = "orange";
    ball.y += ball.velocityY;
    ball.x += ball.velocityX;
    context.fillRect(ball.x,ball.y,ball.width,ball.height)

    if (ball.y<=0 || ball.y+ball.height > bgHeight){
        ball.velocityY *=-1;
    }

    if (bounce(ball,p1)){
        if(ball.x <= p1.x + p1.width){
            ball.velocityX*=-1;
            hits++;
        }
    } else if (bounce(ball,comp)){
        if (ball.x+ball.width>=comp.x){
            ball.velocityX*=-1;
            hits++;
        }
    }

    if (ball.x<0){
        compscore++;
        extracomps++;
        reset(1)
        resetcounter++;
    } else if (ball.x+ball.width>bgWidth){
        pscore++;
        extraps++;
        reset(-1);
        comspeed+=0.01;
        resetcounter++;
    }

    if (hits%4 == 0){

        ball.velocityY *=1.06;
        hits=1;
    }

    if(extraps==1 || extracomps==1){
        ball.velocityY*=1.07;
        extracomps = 0;
        extraps = 0;
    }

    context.fillStyle = "white";
    context.font = "45px sans-serif"
    context.fillText(pscore,bgWidth/5,45)
    context.fillText(compscore,bgWidth*4/5-45,45)
    context.fillStyle = "rgb(60, 255, 60)";
    for (let i =10; i<bgHeight;i+=25){
        context.fillRect(bgWidth/2-10,i,3,10);
    }
    console.log(ball.velocityX)
}

function outCanvas(ypos){
    return (ypos<0 || ypos + playerHeight > bgHeight);
}

function moveP(e){
    if (e.code=="ArrowUp"){
        p1.velocityY=-3;
    } else if(e.code=="ArrowDown"){
        p1.velocityY=3;
    }
}

function bounce(a,b){
    return (a.x<b.x+b.width && a.x + a.width > b.x && a.y < b.y+b.height && a.y+a.height>b.y);
}

function reset(direction){
    hits=1;
    ball = {
        x:bgWidth/2,
        y:bgHeight/2,
        width:ballW,
        height:ballH,
        velocityX: direction*(1.02**resetcounter),
        velocityY:2.5*(1.07**resetcounter)
    }
}

