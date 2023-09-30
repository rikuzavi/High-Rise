c=document.getElementById('canvas');
c.width = window.innerWidth-20;
c.height = window.innerHeight-20;
can = c.getContext('2d');

const B = new Image();
B.src = "image/baloon.png";
B.onload = function(){
    baloon();
};

var H = '🔆';
var S = 0;
//🟡🔆
var obstacles=[]
var speed =2;
var lastObstacle = 0;
var obstacleInterval = 1800;

var lastScreenTime = 0;
var ScreenTime = 2000;

const OBS = new Image();
OBS.src="image/obstacle.png";

const TREE = new Image();
TREE.src="image/tree.png"

var x=(c.width/2)-25;
var y=c.height-150;
function baloon(){
    can.drawImage(B,x,y,50,50);
}

function obstacle(x,y){
    can.drawImage(OBS,x,y,230,50)
}

function health(){ 
    can.font = "250px Arial";
    can.fillText(H,-130,130)
}

function developer(){
    can.font="12px Arial"
    can.fillStyle="black";
    can.fillText('@RikuZavi',c.width-65,15);
}

function score(){
    can.font = "20px Arial";
    can.fillStyle="black";
    can.fillText('score :',c.width-130,60);
    can.fillText(S,c.width-50,61);
}

function game_over(){
    clearCanvas();
    can.font = "20px Arial";
    can.fillStyle="black";
    can.fillText('Game Over !',c.width/2-100,c.height/2);
    can.fillText('Refresh the page to restart',c.width/2-100,(c.height/2)+50);
}

function tree(){
    can.drawImage(TREE,-8,c.height-100,c.width+10,110)
}

function clearCanvas(){
    can.clearRect(0,0,c.width,c.height);
}

function update_canvas(){
    clearCanvas();
    baloon();
    health();
    score();
    tree();
    developer();
    for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].y += speed;
        obstacle(obstacles[i].x, obstacles[i].y);


        // distance y have important distance 
        if(x+35 >= obstacles[i].x && x<=obstacles[i].x+210 && obstacles[i].y > y-30 && obstacles[i].y < y+10){
            H='⚫'
        }
        
        if(obstacles[i].y > window.innerHeight){
            obstacles.splice(i, 1);
            i--;
        }
    }
}

//  COMPUTER movement
var key
document.onkeydown=function(event){
    key=event.keyCode;
    if(key==37){
        if(x>5){
            x=x-10;
        }
    }
    if(key==39){
        if(x<c.width-50){
            x=x+10;
        }
    }
    
   // update_canvas();         
}

//  MOBILE movement
c.addEventListener("touchmove", function (event) {
    var touchX = event.touches[0].clientX
    if (touchX > 1 && touchX < c.width - 25) {
        x = touchX;
    }
    baloon()
});

function generate_OBS(){
    var x_obs = Math.random() * (c.width)-100; 
    var y_obs = 0; 
    obstacles.push({ x: x_obs, y: y_obs });
}

function gameLoop(timestamp) {
    update_canvas()
    //obs time
    if (timestamp - lastObstacle >= obstacleInterval) {
        generate_OBS();
        lastObstacle = timestamp;
        //console.log("running")
        S+=1
    }

    //sokal
    if(S==20){
        speed=3
        obstacleInterval = 1500;
        H = '🟡';
        c.style = "background-color: darkblue;";
    }
    //ratri
    if(S==50){
        speed=4
        obstacleInterval = 1200;
        H = '🔆';
        c.style = "background-color: lightblue;";
    }
    //bhor / sondhe
    if(S==90){
        speed=5
        obstacleInterval = 800;
        c.style = "background-color: lightcoral;";
        H='⚪';
    }
    //morejaoa
    if(S==100){
        speed=5.5
        obstacleInterval = 500;
        c.style = "background-color: lightcoral;";
        H='⚪';
    }
    

    if(H=='⚫'){
        game_over()
        score()
        tree()
        health()
        developer()
        document.addEventListener("mousedown",()=>{
            alert("Please REFRESH the page 🔅")
        })
    } else {
        requestAnimationFrame(gameLoop)   
    }
    
}

gameLoop()



window.addEventListener("resize", function(){
    c.width = this.window.innerWidth-15;
    c.height= this.window.innerHeight-20;
    update_canvas();
});

