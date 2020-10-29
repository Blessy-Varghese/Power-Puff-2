
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var gameState="intro";
var edges;
var obstaclesGroup; 
var life=3;
var confidence=0;

function preload()
{
	stand=loadImage("girl.png");
	building1=loadImage("building1.png");
	building2=loadImage("building2.png");
	building3=loadImage("building3.png");
	building4=loadImage("building4.png");
	final=loadImage("final.png");
	final2=loadImage("final2.png");
	fly=loadImage("fly.png");
	kick=loadImage("kick.png");
	logo=loadImage("logo.png");
	mayor=loadImage("mayor.gif");
	villan1=loadImage("villan1.png");
	villan2=loadImage("villan2.png");
	villan3=loadImage("villan3.png");
	villan4=loadImage("villan4.png");
	villan5=loadImage("villan5.png");
	confidenceImage=loadImage("confidence.png");
}

function setup() {
	createCanvas(1000, 600);
	edges=createEdgeSprites();

	

	World.frameCount=10;

	girl=createSprite(60,500);
	girl.addImage(stand);
	girl.scale=0.15;
	girl.visible=false;

	obstaclesGroup=new Group();

	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background("lightpink");
 // girl.addImage(stand);
  girl.collide(edges);

	if(keyDown(UP_ARROW)){
		girl.y-=20;	
		girl.addImage(fly);
		girl.scale=0.15;
	}

	if(keyDown(DOWN_ARROW)){
		girl.y+=5;
		girl.addImage(stand);
	}

	if(keyDown(LEFT_ARROW)){
		girl.x-=5;
		girl.addImage(stand);
	}

	if(keyDown(RIGHT_ARROW) && girl.y < 550){
		girl.x+=5;
		girl.addImage(fly);
		girl.scale=0.15;
	}


  //gravity to bring her down
	girl.velocityY+=0.1;

  if(gameState==="intro"){
	  intro();
  }

  if(gameState==="level1"){
		level1();
  }

  if(gameState==="level2"){
		level2();
  }

if(girl.isTouching(obstaclesGroup)){
	obstaclesGroup.destroyEach();
	life--;
	confidence++;
	girl.addImage(kick);
	girl.scale=0.3;
  }

 
  drawSprites();
 
}

function intro(){
	//logos at the top
	image(logo,380,10,500,200);
	image(final,0,-80,400,400);

	//villan and their texts
	textSize(18);
	fill("black");
	image(villan1,40,320,100,100);
	text("FAILURE",120,420);
	image(villan2,180,320,200,100);
	text("BULLY",350,420);
	image(villan3,440,320,100,100);
	text("PRIDE",540,420);
	image(villan4,640,320,100,100);
	text("GREED",740,420);
	image(villan5,780,320,200,100);
	text("SADNESS",900,420);

	//to text to start game
	push();
	textSize(30);
	stroke("black");
	fill("green");
	strokeWeight(3);
	text("Save THE CITY OF YOUR MIND from these villans",150,300);
	stroke("white");
	fill("purple");
	strokeWeight(2);
	text("Use the ARROW KEYS to keep your mind at peace",200,550);
	textSize(20);
	fill("black");
	stroke("black");
	text("Press << ENTER >> to start the game",400,580);
	pop();

	//to go to the next level
	if(keyDown("ENTER")){
		gameState="level1";
	}
}
function level1(){

	background(building4);
	
	
	//to display lifetime
	stroke("black");
	strokeWeight(4);
	text("L  I  F  E ", 850,45);
	strokeWeight(2);
	text("C O N F I D E N C E ", 785,20);
	rectMode(CENTER);

	if(life===3){
		
		fill(17,226,53);
		rect(950,40,90,30);
	}

	if(life===2){
		
		fill(17,226,53);
		rect(935,40,60,30);
	}

	if(life===1){
		
		fill(17,226,53);
		rect(925,40,30,30);
	}
	if(life===0){
		gameState="over";
	}

	if(frameCount%1000===0){
		confidence++;
	}

	for(var i=1; i<=confidence; i++){
		image(confidenceImage,880+(i*25),5,20,20);

	}

	if(confidence===3){
		gameState="level2";
	}

	girl.visible=true;
	push();
	fill("red");
	stroke("black");
	strokeWeight(4);
	textSize(20);
	text("LEVEL 1: Protect your mind from the villans!!",250,20);
	
	strokeWeight(2);
	text("Deal with them but do not let them kill you--you have 3 lives",200,50);
	text("To go to the next level reach a confidence level of 3 -- ALL THE BEST",150,70);
	pop();
	textSize(20);
	text(".........................................................................",250,30);

	if(frameCount % 250 === 0) {
		var obstacle = createSprite(1000,165,10,40);
		//obstacle.debug = true;
		//obstacle.velocityX = -(6 + 3*score/100);
		obstacle.velocityX = -5;
		obstacle.y = Math.round(random(250,550));
		obstacle.debug=true;
		//generate random obstacles
		var rand = Math.round(random(1,5));
		switch(rand) {
		  case 1: obstacle.addImage(villan1);
				  break;
		  case 2: obstacle.addImage(villan2);
				  break;
		  case 3: obstacle.addImage(villan3);
				  break;
		  case 4: obstacle.addImage(villan4);
				  break;
		  case 5: obstacle.addImage(villan5);
				  break;
		  
		  default: break;
		}
		
		//assign scale and lifetime to the obstacle           
		obstacle.scale = 0.3;
		obstacle.lifetime = 400;
		//add each obstacle to the group
		obstaclesGroup.add(obstacle);
	  }

	 
	
}

function level2(){
	life=3;
	confidence=0;
	
	text("Good job!! You have developed enought confidence to fight these villans",300,300);
}

