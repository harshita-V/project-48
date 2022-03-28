var  PLAY=1;
var END=0;
var gameState= PLAY;


var plane_bg;
var ground;
var bg1;
var ground2;
var runway1_bg,runway2_bg;
var player,obstacle;
var  smoke_bg,tornado_bg,thunder_bg;
var obsgroup;  
 var obstacles;
var ireset,igameover;
var reset1,gameover1;
var score=0;
function preload(){
  plane_bg=loadImage("plane1.png");
 runway1_bg=loadImage("runway1.png");
  runway2_bg=loadImage("runway3.png");
  smoke_bg=loadImage("obstacle1.png");
  tornado_bg=loadImage("obstacle2.png");
  thunder_bg=loadImage("obstacle3.png");
  ireset=loadImage("reset.png");
  igameover=loadImage("gameover.png");
 
}
function setup() {
  createCanvas(500, 435);
    ground2=createSprite(230,236,24,5);
  ground2.addImage(runway2_bg);
 player=createSprite(250,435,24,5);
  player.addImage(plane_bg);
  player.scale=0.2;
 
 //player.velocityY=-0.7;
  obsgroup=new Group();
 
   reset1=createSprite(230,300,5,5);
   reset1.addImage(ireset);
  reset1.visible=false;
    reset1.scale=0.08;
 
gameover1=createSprite(230,236,24,5);
gameover1.addImage(igameover);
gameover1.visible=false;
  gameover1.scale=0.3;
  score=0;
//  ground2.velocity=5;
}

function draw() {
  background(220);
  text("Score: "+ score, 420,50);
   if (gameState===PLAY){
       score = score + Math.round(getFrameRate()/60);
     
      if(keyDown("UP_ARROW") ) {
      player.velocityY =-0.2;
        player.velocityY = player.velocityY - 0.5;
    }
     
     if(keyDown("LEFT_ARROW") ) {
      player.velocityX =-0.7;
               player.velocityY = 0;

    }
     if(keyDown("RIGHT_ARROW") ) {
      player.velocityX =0.7;
               player.velocityY = 0;
    }if(keyDown("DOWN_ARROW") ) {
      player.velocityX =0;
               player.velocityY = 0.5;
    }
     
    //   player.velocityY = player.velocityY - 0.01;
           //player.x=World.mouseX;
  //player.y=World.mouseY;
  if(ground2.y<100){
    ground2.y=ground2.height/2;
  }
   obstacles();
      if(obsgroup.isTouching(player)){
    gameState =END;
          obsgroup.destroyEach();
           obsgroup.setLifetimeEach(-1);
      }
   }
      else if (gameState === END) {
      reset1.visible=true;
        gameover1.visible=true;
       // player.velocityX=0;
        player.velocityY=0;
           obsgroup.setLifetimeEach(-1);
         if(mousePressedOver(reset1)) {
      resetfn();
    }
   }
  drawSprites();
 
}
function obstacles(){
  if(frameCount%160===0){
  obstacle=createSprite(80,200,20,20);
  obstacle.velocityX = 2;
  //obstacle.velocityY = -2;
    var rand=Math.round(random(1,3));
switch(rand){
case 1 :
obstacle.addImage(smoke_bg);
break;
case 2:
obstacle.addImage(thunder_bg);
break;
case 3 :
obstacle.addImage(tornado_bg);
break;
default:
break;
      }
    obstacle.scale=0.1;
    obsgroup.add(obstacle);
  }
}


function resetfn(){
  gameState = PLAY;
 reset1.visible = false;
 gameover1.visible = false;
  obsgroup.destroyEach();
  score = 0;
     player.velocityY=0;
           obsgroup.setLifetimeEach(-1);
}

