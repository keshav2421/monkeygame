var PLAY=1
var END=0
var gameState=PLAY
var monkey , monkey_running,hehe
var ground
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var restart,reimg

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 reimg=loadImage("restart-1.png")
  hehe=loadImage("sprite_0.png")
}



function setup() {
  createCanvas(600,450)
  ///////////////////////////////////grond
  ground=createSprite(300,445,1000,10)
  ground.shapeColour="red"
/////////////////////////////////////monkey
  monkey=createSprite(50,380,20,20)
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.2
  ////////////////////////////////////groupe
  FoodGroup = createGroup();
    obstacleGroup = createGroup();
  
    restart=createSprite(300,250,35,30)
restart.addImage("restart",reimg)
}


function draw() {
background("cyan")
  ////////////////////////////////console.log
  console.log(frameCount)
  
  ////////////////////////////////monkey
      if(keyDown("space")&&monkey.y>=370){
        monkey.velocityY=-17
        
      }
        monkey.velocityY=monkey.velocityY + 0.8

//////////////////////////////////jai shree ram
  monkey.collide(ground)
  
  score=score+Math.round(getFrameRate()/62)
  
 
  /////////////////////////////////////play
  if(gameState===PLAY){
    restart.visible=false;  
    
        if(monkey.isTouching(obstacleGroup)){
          gameState=END
        }
  
  }   
  /////////////////////////////////////end
  if(gameState===END){
        restart.visible=true;  
    
    
          monkey.velocityX = 0;
          obstacleGroup.velocityX = 0;

          monkey.changeAnimation("collided",hehe);

    
    
    monkey.collide(obstacleGroup)
        
    obstacleGroup.setVelocityXEach(0)
    FoodGroup.setVelocityXEach(0)

    
        if(mousePressedOver(restart)) {
      reset();
    }
  
  }
  //////////////////////////////////////obstacle
  obstacle();
  //////////////////////////////////////banana
  banana();
  /////////////////////////////////////the end
  drawSprites();
  /////////////////////////////////////text score,text
  textSize(32)
  text("survival time="+score,250,30)
}
//////////////////////////////////////reset
function reset(){
  gameState=PLAY
  FoodGroup.destroyEach();
obstacleGroup.destroyEach();
  score=0
  
  
}


function obstacle(){
  
  if(frameCount%100===0){
var obstacle=createSprite(590,410,20,20)    
obstacle.addImage("move",obstaceImage)
      obstacle.scale=0.2

    obstacle.velocityX=-14  
    obstacle.lifetime=300
        obstacle.depth=monkey.depth

   obstacleGroup.add(obstacle)
    
  }
}

function banana(){
  
  if(frameCount%15===0){
    var banana=createSprite(590,200,20,20)    
    banana.addImage("move",bananaImage)
banana.velocityX=-14
      banana.scale=0.1
banana.y=Math.round(random(0,250))
    monkey.depth=banana.depth
    FoodGroup.add(banana)
    
  }
  
  
  
  
  
}


