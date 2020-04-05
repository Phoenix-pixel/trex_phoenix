var trex,runningtrex
var tt
var ground,gg
var invi,invv
var clo
var o
var b
var s
var oo
var bb
var ss
var score
var cloudgroup
var ObstaclesGroup
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,restart
var rr
var ga

function preload(){
  
runningtrex = loadAnimation("trex1.png","trex3.png","trex4.png");
gg=loadImage("ground2.png")
clo= loadImage("cloud.png")  
  o=loadImage("obstacle1.png")
  b=loadImage("obstacle2.png")
  bb=loadImage("obstacle3.png")
  oo=loadImage("obstacle4.png")
  s=loadImage("obstacle5.png")
  ss=loadImage("obstacle6.png")
  tt=loadAnimation("trex_collided.png")
  rr=loadImage("gameOver.png")
  ga=loadImage("restart.png")
}
function setup() {
  createCanvas(600, 200);

trex=createSprite(50,180,20,50)
  trex.addAnimation("i",runningtrex)
  trex.addAnimation("y",tt)
trex.scale=0.5
  ground=createSprite(200,180,400,20)
ground.addImage("g",gg)
  
invi=createSprite(200,190,400,10)
invi.visible=false
  cloudgroup = new Group()
  ObstaclesGroup= new Group()
  score=0
  gameOver=createSprite(300,100)
  restart=createSprite(300,140)
  gameOver.addImage("z",ga)
  restart.addImage("x",rr)
  gameOver.visible=false
  restart.visible=false
}

function draw() {
  background(0);
  if(gameState==PLAY){ 
  
  ground.velocityX = -2;
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //jump when the space key is pressed
  if(keyDown("space") && trex.y >= 162){
    trex.velocityY = -15 ;
  }
  
  //add gravity
  trex.velocityY = trex.velocityY + 0.8;
  
  //stop trex from falling down
  
  
  console.log(trex.y)
spawnClouds();
  spawnObstacles();
  score = score+Math.round(getFrameRate()/5)
    if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
     // playSound("");
    }
  }
  else if(gameState === END) {
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("y",tt);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    
    //place gameOver and restart icon on the screen
    gameOver.visible=true;
    restart.visible=true;
  }
  if(mousePressedOver(restart)){
    reset();
  }
  text(score,350,50)
  trex.collide(invi)
    drawSprites();
  
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    cloud.addImage("c",clo)
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudgroup.add(cloud);
    
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round (random(1,6));
    switch(rand){
      case 1:
    obstacle.addImage("q",o)
    break;
    case 2:
    obstacle.addImage("w",b)
    break;
    case 4:
    obstacle.addImage("e",s)
    break
    case 5:   
    obstacle.addImage("r",oo)
    break ;
    case 6:
    obstacle.addImage("t",bb)
        break;
        case 3:
    obstacle.addImage("y",ss)
        break;default:break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState=PLAY;
 ObstaclesGroup.destroyEach();
 cloudgroup.destroyEach();
 trex.changeAnimation("i",runningtrex);
  gameOver.visible =false;
 restart.visible = false;
score=0
}
