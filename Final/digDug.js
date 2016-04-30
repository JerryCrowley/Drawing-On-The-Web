//Jeremiah Crowley
//Drawing on the Web 
//Dig Dug

var LOADLEVEL;
var GAMEOVER;
var STARTGAME;

var GRIDSIZE    = 50;
var SPLITHEIGHT = 3;
var SPLITWIDTH  = 2;
var DIGGERSPEED = 2;
var ENEMYSPEED  = 1;
var LENOFTRACK  = 2;
var UPDIR       = 270;
var DOWNDIR     = 90;
var LEFTDIR     = 180;
var RIGHTDIR    = 0;

var LEFT  = 0;
var RIGHT = 1;
var UP    = 2;
var DOWN  = 3; 

var hitOnce      = 0;
var numOfEnemies = getRandomIntInclusive(5,8);
var grid         = [];
var emptyGrid    = [];
var randomXPos   = [75,125,175,225,275,325,375,425,475,525,575];

var digger;
var blocks;
var enemies;
var emptyBlocks;

var diggerRight1; 
var diggerRight2;
var diggerLeft1;
var diggerLeft2;
var diggerUp1;
var diggerUp2;
var diggerDown1;
var diggerDown2;

var startGameImage;

var fygarRight1; 
var fygarRight2; 
var fygarLeft1; 
var fygarLeft2;
var fygarUp1; 
var fygarUp2; 
var fygarDown1; 
var fygarDown2;

var pookaRight1;
var pookaRight2;
var pookaLeft1;
var pookaLeft2;
var pookaUp1;
var pookaUp2;
var pookaDown1;
var pookaDown2;

var blueFullBlock;
var blueVertBlock;
var blueHorBlock;
var blueEmptyBlock;

var goldFullBlock;
var goldVertBlock;
var goldHorBlock;
var goldEmptyBlock;

var redFullBlock;
var redVertBlock;
var redHorBlock;
var redEmptyBlock;

var greenFullBlock;
var greenVertBlock;
var greenHorBlock;
var greenEmptyBlock;

var upBullet;   
var downBullet;  
var leftBullet; 
var rightBullet; 

var pookaRightBlow1; 
var pookaRightBlow2;
var pookaRightBlow3;
var pookaDownBlow1;  
var pookaDownBlow2;  
var pookaDownBlow3;  
var pookaLeftBlow1; 
var pookaLeftBlow2; 
var pookaLeftBlow3;  
var pookaUpBlow1;    
var pookaUpBlow2;   
var pookaUpBlow3;

var fygarRightBlow1; 
var fygarRightBlow2;
var fygarRightBlow3;
var fygarDownBlow1;  
var fygarDownBlow2;  
var fygarDownBlow3;  
var fygarLeftBlow1; 
var fygarLeftBlow2; 
var fygarLeftBlow3;  
var fygarUpBlow1;    
var fygarUpBlow2;   
var fygarUpBlow3;

var diggerDeath;
var diggerDeath1;
var diggerDeath2;
var diggerDeath3;
var diggerDeath4;
var diggerDeath5;
var diggerDeathCounter = 20;

var gameOverFlag    = false;
var diggerDeathFlag = false;

var gameover; 
var winner;
var cloud1;
var cloud2;
var tree; 

var gameStartMusic;
var digDugWalkMusic;
var digDugDieMusic;
var gameOverMusic;
var gameFinishMusic;
var pumpingMusic;

function preload(){
	//LOAD IMAGES 
	diggerRight1 = loadImage("assets/digDug_05.png"); 
	diggerRight2 = loadImage("assets/digDug_07.png");
	diggerLeft1  = loadImage("assets/digDug_21.png");
	diggerLeft2  = loadImage("assets/digDug_23.png");
	diggerUp1	 = loadImage("assets/digDug_88.png");
	diggerUp2    = loadImage("assets/digDug_89.png");
	diggerDown1  = loadImage("assets/digDug_46.png");
	diggerDown2  = loadImage("assets/digDug_48.png"); 

	startGameImage = loadImage("assets/startScreen.png");

	fygarRight1 = loadImage("assets/digDug_164.png");
	fygarRight2 = loadImage("assets/digDug_166.png");
	fygarLeft1  = loadImage("assets/digDug_204.png");
	fygarLeft2  = loadImage("assets/digDug_205.png");
	fygarUp1    = loadImage("assets/digDug_202.png");
	fygarUp2    = loadImage("assets/digDug_203.png");
	fygarDown1  = loadImage("assets/digDug_200.png");
	fygarDown2  = loadImage("assets/digDug_201.png");


	pookaRight1 = loadImage("assets/digDug_207.png");
	pookaRight2 = loadImage("assets/digDug_206.png");
	pookaLeft1  = loadImage("assets/digDug_213.png");
	pookaLeft2  = loadImage("assets/digDug_212.png");
	pookaUp1    = loadImage("assets/digDug_211.png");
	pookaUp2    = loadImage("assets/digDug_210.png");
	pookaDown1  = loadImage("assets/digDug_209.png");
	pookaDown2  = loadImage("assets/digDug_208.png");

	blueFullBlock   = loadImage("assets/blueFullBlock.png");
	blueVertBlock   = loadImage("assets/blueVertBlock.png");
	blueHorBlock    = loadImage("assets/blueHorBlock.png");
	blueEmptyBlock  = loadImage("assets/blueEmptyBlock.png");

	goldFullBlock   = loadImage("assets/goldFullBlock.png");
	goldVertBlock   = loadImage("assets/goldVertBlock.png");
	goldHorBlock    = loadImage("assets/goldHorBlock.png");
	goldEmptyBlock  = loadImage("assets/goldEmptyBlock.png");

	redFullBlock   = loadImage("assets/redFullBlock.png");
	redVertBlock   = loadImage("assets/redVertBlock.png");
	redHorBlock    = loadImage("assets/redHorBlock.png");
	redEmptyBlock  = loadImage("assets/redEmptyBlock.png");

	greenFullBlock   = loadImage("assets/greenFullBlock.png");
	greenVertBlock   = loadImage("assets/greenVertBlock.png");
	greenHorBlock    = loadImage("assets/greenHorBlock.png");
	greenEmptyBlock  = loadImage("assets/greenEmptyBlock.png");

	upBullet    = loadImage('assets/digDug_110.png');
	downBullet  = loadImage('assets/digDug_115.png');
	leftBullet  = loadImage('assets/digDug_112.png');
	rightBullet = loadImage('assets/digDug_121.png'); 

	pookaUpBlow1    = loadImage('assets/digDug_220.png');
	pookaUpBlow2    = loadImage('assets/digDug_221.png');
	pookaUpBlow3    = loadImage('assets/digDug_222.png');
	pookaLeftBlow1  = loadImage('assets/digDug_223.png');
	pookaLeftBlow2  = loadImage('assets/digDug_224.png');
	pookaLeftBlow3  = loadImage('assets/digDug_225.png');
	pookaRightBlow1 = loadImage('assets/digDug_226.png');
	pookaRightBlow2 = loadImage('assets/digDug_227.png');
	pookaRightBlow3 = loadImage('assets/digDug_228.png');
	pookaDownBlow1  = loadImage('assets/digDug_229.png');
	pookaDownBlow2  = loadImage('assets/digDug_230.png');
	pookaDownBlow3  = loadImage('assets/digDug_231.png');

	fygarDownBlow1  = loadImage('assets/digDug_238.png');
	fygarDownBlow2  = loadImage('assets/digDug_239.png');
	fygarDownBlow3  = loadImage('assets/digDug_240.png');
	fygarRightBlow1 = loadImage('assets/digDug_235.png');
	fygarRightBlow2 = loadImage('assets/digDug_236.png');
	fygarRightBlow3 = loadImage('assets/digDug_237.png');
	fygarLeftBlow1  = loadImage('assets/digDug_232.png');
	fygarLeftBlow2  = loadImage('assets/digDug_233.png');
	fygarLeftBlow3  = loadImage('assets/digDug_234.png');
	fygarUpBlow1    = loadImage('assets/digDug_241.png');
	fygarUpBlow2    = loadImage('assets/digDug_242.png');
	fygarUpBlow3    = loadImage('assets/digDug_243.png');

	diggerDeath1 = loadImage('assets/digDug_301.png');
	diggerDeath2 = loadImage('assets/digDug_302.png');
	diggerDeath3 = loadImage('assets/digDug_303.png');
	diggerDeath4 = loadImage('assets/digDug_304.png');
	diggerDeath5 = loadImage('assets/digDug_305.png');

	gameover = loadImage('assets/gameOver.png');
	winner   = loadImage('assets/winner.png');
	cloud1   = loadImage('assets/cloud1.png');
	cloud2   = loadImage('assets/cloud2.png');
	tree     = loadImage('assets/tree.png');

	gameStartMusic  = loadSound('assets/02-game-start-music.mp3');
	digDugWalkMusic = loadSound('assets/03-digdug-walking.mp3');
	digDugDieMusic  = loadSound('assets/10-diddug-disappearing.mp3');
	gameOverMusic   = loadSound('assets/11-game-over-music.mp3');
	gameFinishMusic = loadSound('assets/12-high-score-music.mp3');
	pumpingMusic    = loadSound('assets/23-pumping.mp3');
}

function setup(){
	createCanvas(600,900);

	blocks      = new Group();
	bullets     = new Group();
	enemies     = new Group();
	emptyBlocks = new Group();

	LOADLEVEL   = false;
	GAMEOVER    = false;
	STARTGAME   = false;

	gameStartMusic.play();

	digDugWalkMusic.setVolume(0.0);
	digDugWalkMusic.loop();
	digDugWalkMusic.play();

	digDugDieMusic.setVolume(0.0);
	digDugDieMusic.play();

	gameOverMusic.setVolume(0.0);
	gameOverMusic.play();

	gameFinishMusic.setVolume(0.0);
	gameFinishMusic.play();

	pumpingMusic.setVolume(0.0);
	pumpingMusic.play();
}

function draw(){
	if(STARTGAME == false){
		showStartGame();
	}else{
		if(gameStartMusic.isPlaying()){
			gameStartMusic.stop();
			digDugWalkMusic.jump();
		}
		if(GAMEOVER == false){
			if(LOADLEVEL == false){
				updateSprites(true);
				loadBlocks();
				loadClouds();
				loadEnemies();
				loadDigger();

				diggerDeath = false;
				LOADLEVEL = true;

				for(var i = 0; i < enemies.length; i++){
					enemies.get(i).move();
				}
			}

			if((diggerDeath == false) && (enemies.length > 0)){
				//For each enemy, check if they had been hit by the bullet
				//If hit, subtract one from its paused state
				//Should stay paused for 30 frames
				for(var i = 0; i < enemies.length; i++){
						enemies.get(i).checkLocation();
						if(enemies.get(i).pausedState > 0){
							enemies.get(i).pausedState-=1;
							if(enemies.get(i).pausedState == 0){
								deflateEnemy(enemies.get(i));
							}
						}
				}

				//Digger direction
				if(!keyIsPressed){
					if(digDugWalkMusic.isPlaying()){
						digDugWalkMusic.setVolume(0.0);
					}
					switch(digger.prevDirection){
						case RIGHTDIR:{
							digger.changeAnimation('stillRight');
						}break;
						case LEFTDIR:{
							digger.changeAnimation('stillLeft');
						}break;
						case UPDIR:{
							digger.changeAnimation('stillDown');
						}break;
						case DOWNDIR:{
							digger.changeAnimation('stillup');
						}break;
						default:{
							digger.changeAnimation('stillRight');
						}
					}
				}
			
				if(keyDown(LEFT_ARROW)){
					digger.changeAnimation('left');
					digger.diggerDirection = LEFTDIR;
			    	digger.position.x -= DIGGERSPEED;
			    	digger.prevDirection = LEFTDIR;
			    	digDugWalkMusic.setVolume(1.0);
			    }
				if(keyDown(RIGHT_ARROW)){
					digger.changeAnimation('right');
					digger.diggerDirection = RIGHTDIR;
					digger.position.x += DIGGERSPEED;
					digger.prevDirection = RIGHTDIR;
					digDugWalkMusic.setVolume(1.0);
				}
				if(keyDown(UP_ARROW)){
					digger.changeAnimation('up');
					digger.diggerDirection = DOWNDIR;
					digger.position.y -= DIGGERSPEED;
					digger.prevDirection = DOWNDIR;
					digDugWalkMusic.setVolume(1.0);
				}
				if(keyDown(DOWN_ARROW)){
					digger.changeAnimation('down');		
					digger.diggerDirection = UPDIR;
					digger.position.y += DIGGERSPEED;
			    	digger.prevDirection = UPDIR;
			    	digDugWalkMusic.setVolume(1.0);
				}

				//Shoot bullet
				if(keyWentDown('X')){
					hitOnce = 0;
					var bullet;
					switch(digger.diggerDirection){
						case RIGHTDIR:{
							bullet = createSprite(digger.position.x+(GRIDSIZE/2), digger.position.y);
							bullet.addImage(rightBullet);
						}break;
						case LEFTDIR:{
							bullet = createSprite(digger.position.x-(GRIDSIZE/2), digger.position.y);
							bullet.addImage(rightBullet);
						}break;
						case UPDIR:{
							bullet = createSprite(digger.position.x, digger.position.y+(GRIDSIZE/2));
							bullet.addImage(downBullet);
						}break;
						case DOWNDIR:{
							bullet = createSprite(digger.position.x, digger.position.y-(GRIDSIZE/2));
							bullet.addImage(upBullet);
						}break;
						default:{
							bullet = createSprite(digger.position.x+(GRIDSIZE/2), digger.position.y,GRIDSIZE,5);
							bullet.addImage(rightBullet);
						}
					}
					
					bullet.depth = enemies.get(0).depth-1;
					bullet.setCollider("rectangle", 0,0, GRIDSIZE,5);
			   		bullet.life = 10;
			   		bullets.add(bullet);
				}

				enemies.overlap(blocks,hitBlock);
				enemies.overlap(enemies,hitEnemy);
				enemies.overlap(emptyBlocks,hitEmptyBlock);
				enemies.overlap(digger, diggerKilled);

				digger.overlap(emptyBlocks,diggerHitBlock);
				digger.overlap(blocks,diggerHit);

				bullets.overlap(enemies,diggerHitEnemy);
			}else if(enemies.length == 0){
				showGameOverScreen(true);
			  	if((keyIsPressed) && (keyCode != 120)){
			  		resetSketch();
			  	}
			}else{
				showGameOver();
			}
		}else{
		  	showGameOverScreen(false);
		  	if((keyIsPressed) && (keyCode != 120)){
		  		resetSketch();
		  	}
		}

		background(110, 190, 200);

		drawSprites();
	}
}

function createDigger(){
	var tmp = createSprite(GRIDSIZE,(height/SPLITHEIGHT)-GRIDSIZE,GRIDSIZE/2,GRIDSIZE/2);
	tmp.diggerDirection; 
	tmp.prevDirection;

	tmp.addAnimation('stillLeft', diggerLeft1);
	tmp.addAnimation("left", diggerLeft1, diggerLeft2);
	tmp.addAnimation('stillRight', diggerRight1);
	tmp.addAnimation('right',diggerRight1,diggerRight2);
	tmp.addAnimation('stillup', diggerUp1);
	tmp.addAnimation('up',diggerUp1,diggerUp2);
	tmp.addAnimation('stillDown', diggerDown1);
	tmp.addAnimation('down',diggerDown1,diggerDown2);
	tmp.addAnimation('death',diggerDeath1,diggerDeath2,diggerDeath3,diggerDeath4,diggerDeath5);

	return tmp;
}

function enemy(x,y,type){
	var tmp = createSprite(x,y,GRIDSIZE/2.5,GRIDSIZE/2.5);
	tmp.type = type;
	tmp.prevDirection = RIGHTDIR; 
	//tmp.moves = [];
	tmp.intersections = [];
	tmp.blowupState = 0.0;
	tmp.pausedState = 0;

	if(tmp.type === "fygar"){
		tmp.addAnimation('stillLeft', fygarLeft1);
		tmp.addAnimation("left", fygarLeft1, fygarLeft2);
		tmp.addAnimation('stillRight', fygarRight2);
		tmp.addAnimation('right',fygarRight1,fygarRight2);
		tmp.addAnimation('stillup', fygarUp1);
		tmp.addAnimation('up',fygarUp1,fygarUp2);
		tmp.addAnimation('stillDown', fygarDown1);
		tmp.addAnimation('down',fygarDown1,fygarDown2);

		tmp.addAnimation('deflateRight2',fygarRightBlow2,fygarRightBlow1,fygarRight1);
		tmp.addAnimation('deflateRight1',fygarRightBlow1,fygarRight1);
		tmp.addAnimation('deflateRight',fygarRight1);

		tmp.addAnimation('deflateLeft2',fygarLeftBlow2,fygarLeftBlow1,fygarLeft1);
		tmp.addAnimation('deflateLeft1',fygarLeftBlow1,fygarLeft1);
		tmp.addAnimation('deflateLeft',fygarLeft1);

		tmp.addAnimation('deflateUp2',fygarUpBlow2,fygarUpBlow1,fygarUp1);
		tmp.addAnimation('deflateUp1',fygarUpBlow1,fygarUp1);
		tmp.addAnimation('deflateUp',fygarUp1);

		tmp.addAnimation('deflateDown2',fygarDownBlow2,fygarDownBlow1,fygarDown1);
		tmp.addAnimation('deflateDown1',fygarDownBlow1,fygarDown1);
		tmp.addAnimation('deflateDown',fygarDown1);

		tmp.addAnimation('rightBlow1',fygarRightBlow1);
		tmp.addAnimation('rightBlow2',fygarRightBlow2);
		tmp.addAnimation('rightBlow3',fygarRightBlow3);

		tmp.addAnimation('leftBlow1',fygarLeftBlow1);
		tmp.addAnimation('leftBlow2',fygarLeftBlow2);
		tmp.addAnimation('leftBlow3',fygarLeftBlow3);

		tmp.addAnimation('upBlow1',fygarUpBlow1);
		tmp.addAnimation('upBlow2',fygarUpBlow2);
		tmp.addAnimation('upBlow3',fygarUpBlow3);

		tmp.addAnimation('downBlow1',fygarDownBlow1);
		tmp.addAnimation('downBlow2',fygarDownBlow2);
		tmp.addAnimation('downBlow3',fygarDownBlow3);
	}else if(tmp.type === "pooka"){
		tmp.addAnimation('stillLeft', pookaLeft1);
		tmp.addAnimation("left", pookaLeft1, pookaLeft2);
		tmp.addAnimation('stillRight', pookaRight2);
		tmp.addAnimation('right',pookaRight1,pookaRight2);
		tmp.addAnimation('stillup', pookaUp1);
		tmp.addAnimation('up',pookaUp1,pookaUp2);
		tmp.addAnimation('stillDown', pookaDown1);
		tmp.addAnimation('down',pookaDown1,pookaDown2);

		tmp.addAnimation('deflateRight2',pookaRightBlow2,pookaRightBlow1,pookaRight1);
		tmp.addAnimation('deflateRight1',pookaRightBlow1,pookaRight1);
		tmp.addAnimation('deflateRight',pookaRight1);

		tmp.addAnimation('deflateLeft2',pookaLeftBlow2,pookaLeftBlow1,pookaLeft1);
		tmp.addAnimation('deflateLeft1',pookaLeftBlow1,pookaLeft1);
		tmp.addAnimation('deflateLeft',pookaLeft1);

		tmp.addAnimation('deflateUp2',pookaUpBlow2,pookaUpBlow1,pookaUp1);
		tmp.addAnimation('deflateUp1',pookaUpBlow1,pookaUp1);
		tmp.addAnimation('deflateUp',pookaUp1);

		tmp.addAnimation('deflateDown2',pookaDownBlow2,pookaDownBlow1,pookaDown1);
		tmp.addAnimation('deflateDown1',pookaDownBlow1,pookaDown1);
		tmp.addAnimation('deflateDown',pookaDown1);

		tmp.addAnimation('rightBlow1',pookaRightBlow1);
		tmp.addAnimation('rightBlow2',pookaRightBlow2);
		tmp.addAnimation('rightBlow3',pookaRightBlow3);

		tmp.addAnimation('leftBlow1',pookaLeftBlow1);
		tmp.addAnimation('leftBlow2',pookaLeftBlow2);
		tmp.addAnimation('leftBlow3',pookaLeftBlow3);

		tmp.addAnimation('upBlow1',pookaUpBlow1);
		tmp.addAnimation('upBlow2',pookaUpBlow2);
		tmp.addAnimation('upBlow3',pookaUpBlow3);

		tmp.addAnimation('downBlow1',pookaDownBlow1);
		tmp.addAnimation('downBlow2',pookaDownBlow2);
		tmp.addAnimation('downBlow3',pookaDownBlow3);		
	}

	enemies.add(tmp);

	tmp.move = function() {
		if(this.blowupState == 0){
			var direction = this.checkDirection();
			// if(this.moves.length > LENOFTRACK){
			// 	this.moves.pop();
			// }
			// this.moves.push(direction);
			this.setSpeed(ENEMYSPEED,direction);
			this.prevDirection = direction;
			this.changeAnimationDirection(direction);
		}
	}

	tmp.changeAnimationDirection = function(direction){
		switch(direction){
			case RIGHTDIR:{
				this.changeAnimation('right');
			}break;
			case LEFTDIR:{
				this.changeAnimation('left');
			}break;
			case UPDIR:{
				this.changeAnimation('up');
			}break;
			case DOWNDIR:{
				this.changeAnimation('down');
			}break;
			default:{
				this.changeAnimation('right');
			}
		}
	}

	tmp.checkLocation = function(){		
		if(this.position.y == ((height/SPLITHEIGHT)-GRIDSIZE)){
			if(this.position.x < (width/2)){
				direction = LEFTDIR;
			}
			else{
				direction = RIGHTDIR;
			}

			if(this.pausedState == 0){
				this.setSpeed(ENEMYSPEED,direction);
				this.prevDirection = direction;
				this.changeAnimationDirection(direction);
			}
		}

		if((this.position.y == ((height/SPLITHEIGHT)-GRIDSIZE)) && ((this.position.x == 0) || (this.position.x == width))){
			console.log('GAME OVER');
			showGameOverScreen(false);
		}else if((this.position.x == RIGHTDIR) || (this.position.x == width) || (this.position.y == height)){
			flipDirection(this);
		}

		var currentBlock = grid[[this.position.x,this.position.y]];
		if((currentBlock) && (currentBlock.type === "empty")){
			switch(this.prevDirection) {
			    case RIGHTDIR:
			    case LEFTDIR:{
				    	direction = this.changeDirection('horizontal',currentBlock);
						this.setSpeed(ENEMYSPEED,direction);
						this.changeAnimationDirection(direction);
						this.prevDirection = direction;
			    	}break;
			    case DOWNDIR:
			    case UPDIR:{
				    	direction = this.changeDirection('vertical',currentBlock);
						this.setSpeed(ENEMYSPEED,direction);
						this.changeAnimationDirection(direction);
						this.prevDirection = direction;
			    	}break;
			    default:
			}
		}
	}

	tmp.checkDirection = function(){
		var direction; 

		var xpos  = closest(this.position.x,randomXPos);
		var ypos  =	Math.round((this.position.y) / GRIDSIZE) * GRIDSIZE;

		var left  = xpos-GRIDSIZE;
		var right = xpos+GRIDSIZE;
		var up    = ypos-GRIDSIZE;
		var down  = ypos+GRIDSIZE;

		var currentBlock = grid[[xpos,ypos]];
		if(currentBlock){
			if(currentBlock.type === "horizontal"){
				if(grid[[right,ypos]] && grid[[left,ypos]]){
					//Check right
					if((grid[[right,ypos]].type === "horizontal") || (grid[[right,ypos]].type === "empty")){
						direction = RIGHTDIR
					}
					//Check left
					else if((grid[[left,ypos]].type === "horizontal") || (grid[[left,ypos]].type === "empty")){
						direction = LEFTDIR;
					}
					
					if((grid[[right,ypos]].type === "vertical") || (grid[[left,ypos]].type === "vertical")){
						if((grid[[right,ypos]].type === "horizontal") && (this.velocity.x > RIGHTDIR)){
							direction = RIGHTDIR;
						}else{
							flipDirection(this);
						}
					}
				}
			}
			else if(currentBlock.type === "vertical"){
				if(grid[[xpos,up]] && grid[[xpos,down]]){
					//Check down
					if((grid[[xpos,down]].type === "vertical") || (grid[[xpos,down]].type === "empty")){
						direction = DOWNDIR;
					}
					//Check up
					else if((grid[[xpos,up]].type === "vertical") || (grid[[xpos,up]].type === "empty")){
						direction = UPDIR;
					}
					
					if((grid[[xpos,up]].type  === "horizontal") || (grid[[xpos,down]].type  === "horizontal")){
						if((grid[[xpos,down]].type === "vertical") && (this.velocity.y > RIGHTDIR)){
							direction = DOWNDIR;
						}else{
							flipDirection(this);
						}
					}
				}
			}
		}
		return direction;
	}

	tmp.changeDirection = function(direction,currentBlock){
		var xpos  = currentBlock.position.x;
		var ypos  =	currentBlock.position.y;

		var leftBlock  = grid[[xpos-GRIDSIZE,ypos]];
		var rightBlock = grid[[xpos+GRIDSIZE,ypos]];
		var upBlock    = grid[[xpos,ypos-GRIDSIZE]];
		var downBlock  = grid[[xpos,ypos+GRIDSIZE]];

		//When an enemy hits an empty block (a vertical and horizontal path available)
		//Then we take note of the interestion and possible paths to take
		//Then we take a path and take note of the direction we went
		//So that if we get back to the intersection, we can see what paths we took 

		if(!this.intersections[[xpos,ypos]]){
			tmp = [];
			if((leftBlock)&&((leftBlock.type != "full")&&(leftBlock.type != "vertical"))){
				if(this.prevDirection == RIGHTDIR){
					var cond = true;
				}
				else{
					var cond = false;
				}
				tmp[LEFT] = [leftBlock,cond];
			}
			if((rightBlock)&&((rightBlock.type != "full")&&(rightBlock.type != "vertical"))){
				if(this.prevDirection == LEFTDIR){
					var cond = true;
				}
				else{
					var cond = false;
				}
				tmp[RIGHT] = [rightBlock,cond];
			}
			if((upBlock)&&((upBlock.type != "full")&&(upBlock.type != "horizontal"))){
				if(this.prevDirection == UPDIR){
					var cond = true;
				}
				else{
					var cond = false;
				}
				tmp[UP] = [upBlock,cond];
			}
			if((downBlock)&&((downBlock.type != "full")&&(downBlock.type != "horizontal"))){
				if(this.prevDirection == DOWNDIR){
					var cond = true;
				}
				else{
					var cond = false;
				}
				tmp[DOWN] = [downBlock,cond];
			}
			this.intersections[[xpos,ypos]] = tmp;
		 }else{
		 	var count = 0;
		 	var tmp   = [];

		 	if(this.intersections[[xpos,ypos]][LEFT]){
		 		count += 1;
		 		if(this.intersections[[xpos,ypos]][LEFT][1] == true){
		 			tmp.push(LEFT);
		 		}
		 	}
		 	if(this.intersections[[xpos,ypos]][RIGHT]){
		 		count += 1;
		 		if(this.intersections[[xpos,ypos]][RIGHT][1] == true){
		 			tmp.push(RIGHT);		 		
		 		}
		 	}
		 	if(this.intersections[[xpos,ypos]][UP]){
		 		count += 1;
		 		if(this.intersections[[xpos,ypos]][UP][1] == true){
		 			tmp.push(UP);
		 		}
		 	}
		 	if(this.intersections[[xpos,ypos]][DOWN]){
		 		count += 1;
		 		if(this.intersections[[xpos,ypos]][DOWN][1] == true){
		 			tmp.push(DOWN);
		 		}
		 	}
		 	if(count == tmp.length){
		 		for(var i = 0; i < count; i++){
		 			this.intersections[[xpos,ypos]][tmp.pop()][1] = false;
		 		}
		 	}
		}
		
		var tmp = this.intersections[[xpos,ypos]];
		if(direction === "horizontal"){
			if(tmp[UP] && (tmp[UP][1] === false)){
				direction = UPDIR;
				tmp[UP][1] = true;
			}else if(tmp[DOWN] && (tmp[DOWN][1] === false)){
				direction = DOWNDIR;
				tmp[DOWN][1] = true;
			}else if(tmp[RIGHT] && (tmp[RIGHT][1] === false)){
				direction = RIGHTDIR;
				tmp[RIGHT][1] = true;
			}else if(tmp[LEFT] && (tmp[LEFT][1] === false)){
				direction = LEFTDIR;
				tmp[LEFT][1] = true;
			}else{
				direction = flipDirection(direction);
			}
		}else if(direction === "vertical"){
			if(tmp[RIGHT] && (tmp[RIGHT][1] === false)){
				direction = RIGHTDIR;
				tmp[RIGHT][1] = true;
			}else if(tmp[LEFT] && (tmp[LEFT][1] === false)){
				direction = LEFTDIR;
				tmp[LEFT][1] = true;
			}else if(tmp[UP] && (tmp[UP][1] === false)){
				direction = UPDIR;
				tmp[UP][1] = true;
			}else if(tmp[DOWN] && (tmp[DOWN][1] === false)){
				direction = DOWNDIR;
				tmp[DOWN][1] = true;
			}else{
				direction = flipDirection(direction);
			}
		}
		return direction;
	}

	// tmp.updateMoves = function(){
	// 	if((this.velocity.x != -ENEMYSPEED) || (this.velocity.x != ENEMYSPEED)){
	// 		if(this.moves.length > LENOFTRACK){
	// 			this.moves.pop();
	// 		}
	// 		if(this.velocity.x == 1){
	// 			this.moves.push(RIGHTDIR);
	// 		}else if(this.velocity.x == -1){
	// 			this.moves.push(LEFTDIR);
	// 		}
	// 	}

	// 	if((this.velocity.y != -ENEMYSPEED) || (this.velocity.y != ENEMYSPEED)){
	// 		if(this.moves.length > LENOFTRACK){
	// 			this.moves.pop();
	// 		}
	// 		if(this.velocity.y == 1){
	// 			this.moves.push(DOWNDIR);
	// 		}else if(this.velocity.y == -1){
	// 			this.moves.push(UPDIR);
	// 		}
	// 	}
	// }

	return tmp;
}


function block(x,y,blkcolor){
	var tmp = createSprite(x,y,GRIDSIZE,GRIDSIZE);
	tmp.blkcolor = blkcolor;
	switch(blkcolor){
			case "green":{
				tmp.addImage(greenFullBlock);
			}break;
			case "red":{
				tmp.addImage(redFullBlock);
			}break;
			case "gold":{
				tmp.addImage(goldFullBlock);
			}break;
			case "blue":{
				tmp.addImage(blueFullBlock);
			}break;
			default:
	}
	tmp.type = "full";

	return tmp;
}

function loadDigger(){
	digger = createDigger();
}

function loadEnemies(){
	for(var i = 0; i < numOfEnemies; i++){
		if(Math.random() >= 0.5){
			var tmpEnemy = enemy(emptyGrid[i][0][0],emptyGrid[i][0][1],"pooka");
		}else{
			var tmpEnemy = enemy(emptyGrid[i][0][0],emptyGrid[i][0][1],"fygar");
		}
	}
}

function loadBlocks(){
	var ypos  = (height/SPLITHEIGHT);
	var count = 0;

	for(var i = 0; i <= ((height-(height/SPLITHEIGHT))/GRIDSIZE); i++){
		var xpos = GRIDSIZE/2; 

		for(var j = 0; j <= (width/GRIDSIZE); j++){
			var color; 
			if(count < (((height-(height/SPLITHEIGHT))/GRIDSIZE)/4)){
				color = "blue";
			}else if((count >= (((height-(height/SPLITHEIGHT))/GRIDSIZE)/4)) && (count < (((height-(height/SPLITHEIGHT))/GRIDSIZE)/2))){
				color = "green";
			}else if((count >= (((height-(height/SPLITHEIGHT))/GRIDSIZE)/2)) && (count < (3*(((height-(height/SPLITHEIGHT))/GRIDSIZE)/4)))){
				color = "gold";
			}else if((height > (3*(((height-(height/SPLITHEIGHT))/GRIDSIZE)/4)))){
				color = "red"
			}
			
			var tmpBlock = block(xpos,ypos,color);

			blocks.add(tmpBlock);
			grid[[xpos,ypos]] = tmpBlock;
			xpos += GRIDSIZE;
		}
		ypos += GRIDSIZE; 
		count += 1;
	}
	randomLines();
}

function loadClouds(){
	var cld1 = createSprite(150,75,GRIDSIZE,GRIDSIZE);
	cld1.addImage(cloud1);
	var cld2 = createSprite(450,130,GRIDSIZE,GRIDSIZE);
	cld2.addImage(cloud2);
	var tree1  = createSprite(width-30, (height-((height/3)*2))-53, GRIDSIZE, GRIDSIZE);
	tree1.addImage(tree);
}

function hitBlock(enemy){
	flipDirection(enemy);
}

function hitEnemy(enemy){
	flipDirection(enemy);
}

function hitEmptyBlock(enemy,blk){
	if(blk.type != "empty"){
		enemy.checkDirection();
	}
}

function diggerHitBlock(digger,blk){
	if(blk.type == "vertical"){
		if(blk.position.x != digger.position.x){
	    	digger.position.x = blk.position.x;
	    	if(keyDown(LEFT_ARROW) || keyDown(RIGHT_ARROW)){
		    	changeBlock(blk,"empty");
		    }
		}
	}
	else if(blk.type == "horizontal"){
		if(blk.position.y != digger.position.y){
			digger.position.y = blk.position.y;
			if(keyDown(UP_ARROW) || keyDown(DOWN_ARROW)){
				changeBlock(blk,"empty");
			}
		}
	}

	if(keyIsPressed){
		if(((keyCode == UP_ARROW) || (keyCode == DOWN_ARROW)) && (blk.type === 'horizontal')){
			if(blk.position.x != digger.position.x){
	    		digger.position.x = blk.position.x;
	    		changeBlock(blk,"empty");
		    }
		}else if(((keyCode == LEFT_ARROW) || (keyCode == RIGHT_ARROW)) && (blk.type === 'vertical')){
			if(blk.position.y != digger.position.y){
				digger.position.y = blk.position.y;
			    changeBlock(blk,"empty");
			}
		}
	}
}

function diggerHit(dig,blk){
	var tmp = blk;
	switch(digger.diggerDirection) {
	    case RIGHTDIR:{
		    	if(tmp.type === "full"){
		    		changeBlock(tmp,"horizontal");
		    	}
	    	}	
	        break;
	    case DOWNDIR:{
		    	if(tmp.type === "full"){
		    		changeBlock(tmp,"vertical");
		    	}
	    	}	
	        break;
	    case LEFTDIR:{
		    	if(tmp.type === "full"){
		    		changeBlock(tmp,"horizontal");
		    	}
	    	}	
	        break;
	    case UPDIR:{
		    	if(tmp.type === "full"){
		    		if(blk.position.x != digger.position.x){
	    				digger.position.x = blk.position.x;
		    		}
		    		changeBlock(tmp,"vertical");
		    	}
	    	}	
	        break;
	    default:
	}
}

function diggerHitEnemy(bullet,enemy){
	if(hitOnce == 0){
		enemy.setSpeed(0,enemy.prevDirection);
		enemy.pausedState = 30;

		if(keyWentDown('X')){	
			pumpingMusic.jump();
			pumpingMusic.setVolume(1.0);
			switch(enemy.blowupState){
				case 0:{
					enemy.scale = 1.0;
					enemy.blowupState = 1; 
				}break;
				case 1:{
					switch(enemy.checkDirection()){
						case RIGHTDIR:{
						    enemy.changeAnimation('rightBlow1');
						}break;
					    case DOWNDIR:{
							enemy.changeAnimation('downBlow1'); 	   
				    	}break;
					    case LEFTDIR:{
						    enemy.changeAnimation('leftBlow1');
				    	}break;
					    case UPDIR:{
							enemy.changeAnimation('upBlow1');   	
				    	}break;
					    default:{}
					}
					enemy.blowupState = 2;
				}break;
				case 2:{
					switch(enemy.checkDirection()){
						case RIGHTDIR:{
						    enemy.changeAnimation('rightBlow2');
						}break;
					    case DOWNDIR:{
							enemy.changeAnimation('downBlow2'); 	   
				    	}break;
					    case LEFTDIR:{
						    enemy.changeAnimation('leftBlow2');
				    	}break;
					    case UPDIR:{
							enemy.changeAnimation('upBlow2');   	
				    	}break;
					    default:{}
					}
					enemy.blowupState = 3;
				}break;
				case 3:{
					switch(enemy.checkDirection()){
						case RIGHTDIR:{
						    enemy.changeAnimation('rightBlow3');
						}break;
					    case DOWNDIR:{
							enemy.changeAnimation('downBlow3'); 	   
				    	}break;
					    case LEFTDIR:{
						    enemy.changeAnimation('leftBlow3');
				    	}break;
					    case UPDIR:{
							enemy.changeAnimation('upBlow3');   	
				    	}break;
					    default:{}
					}
					enemy.blowupState = 4;
					enemyKilled(enemy);
				}break;
				default:
					enemy.scale = 0;
			}
		}
	}
	hitOnce = 1;
}

function deflateEnemy(enemy){
	switch(enemy.blowupState){
		case 3:{
			switch(enemy.checkDirection()){
				case RIGHTDIR:{
				    enemy.changeAnimation('deflateRight2');
				}break;
			    case DOWNDIR:{
					enemy.changeAnimation('deflateDown2'); 	   
		    	}break;
			    case LEFTDIR:{
				    enemy.changeAnimation('deflateLeft2');
		    	}break;
			    case UPDIR:{
					enemy.changeAnimation('deflateUp2');   	
		    	}break;
			    default:{}
			}
		}break;
		case 2:{
			switch(enemy.checkDirection()){
				case RIGHTDIR:{
				    enemy.changeAnimation('deflateRight1');
				}break;
			    case DOWNDIR:{
					enemy.changeAnimation('deflateDown1'); 	   
		    	}break;
			    case LEFTDIR:{
				    enemy.changeAnimation('deflateLeft1');
		    	}break;
			    case UPDIR:{
					enemy.changeAnimation('deflateUp1');   	
		    	}break;
			    default:{}
			}
		}break;
		default:{
			switch(enemy.checkDirection()){
				case RIGHTDIR:{
				    enemy.changeAnimation('deflateRight');
				}break;
			    case DOWNDIR:{
					enemy.changeAnimation('deflateDown'); 	   
		    	}break;
			    case LEFTDIR:{
				    enemy.changeAnimation('deflateLeft');
		    	}break;
			    case UPDIR:{
					enemy.changeAnimation('deflateUp');   	
		    	}break;
			    default:{}
			}
		}
	}

	hitOnce = 0;
	enemy.blowupState = 0;
	enemy.setSpeed(ENEMYSPEED,enemy.checkDirection());
	enemy.move();
}

function diggerKilled(enemy){
	for(var i = 0; i < enemies.length; i++){
		enemies.get(i).setSpeed(0,enemy.prevDirection);
	}
	enemy.remove();
	diggerDeath = true;
}

function enemyKilled(enemy){
	enemy.remove();
	console.log('ENEMY KILED');
}

function showStartGame(){
	image(startGameImage, 0, 0, width, height);
	if(keyIsPressed){
		STARTGAME = true;
	}
}

function showGameOver(){
	digger.changeAnimation('death');
	diggerDeathCounter -= 1; 

	if(diggerDeathFlag == false){
		digDugWalkMusic.stop();
		digDugDieMusic.jump();
		digDugDieMusic.setVolume(1.0);
		diggerDeathFlag = true;
	}

	if(diggerDeathCounter == 0){
		updateSprites(false);
		LOADLEVEL = false; 
		GAMEOVER  = true;
	}
}

function showGameOverScreen(flag){
	var gameovr = createSprite(300,400,GRIDSIZE,GRIDSIZE);
	gameovr.addImage(gameover);	
	if(flag){
		var win = createSprite(300,500,GRIDSIZE,GRIDSIZE);
		win.addImage(winner);
		if(gameOverFlag == false){
			digDugWalkMusic.stop();
			gameFinishMusic.jump();
			gameFinishMusic.setVolume(1.0);
			gameOverFlag = true;
		}
	}else{
		if(gameOverFlag == false){
			gameOverMusic.jump();
			gameOverMusic.setVolume(1.0);
			gameOverFlag = true;
		}
	}
}

function resetSketch(){
	window.location.reload(true); 
}

function flipDirection(enemy){
	var direction;
	if((enemy.velocity.x != 0) && ((enemy.velocity.x <= ENEMYSPEED) || (enemy.velocity.x >= -ENEMYSPEED))){
		if(enemy.velocity.x > 0){
			enemy.prevDirection = RIGHTDIR;
			direction = LEFTDIR;
		}
		else{
			enemy.prevDirection = LEFTDIR;
			direction = RIGHTDIR;
		}
		enemy.velocity.x *= -1;
	}

	if((enemy.velocity.y != 0) && ((enemy.velocity.y <= ENEMYSPEED) || (enemy.velocity.y >= -ENEMYSPEED))){
		if(enemy.velocity.y > 0){
			enemy.prevDirection = DOWNDIR;
			direction = UPDIR;
		}
		else{
			enemy.prevDirection = UPDIR;
			direction = DOWNDIR;
		}
		enemy.velocity.y *= -1;
	}
	enemy.changeAnimationDirection(direction);
	return direction;
}

function changeBlock(tmpblock,direction){
	xpos = tmpblock.position.x;
	ypos = tmpblock.position.y;

	if(direction === "horizontal"){
		tmpblock.type = "horizontal";
		switch(tmpblock.blkcolor){
				case "green":{
					tmpblock.addImage(greenHorBlock);
				}break;
				case "red":{
					tmpblock.addImage(redHorBlock);
				}break;
				case "gold":{
					tmpblock.addImage(goldHorBlock);
				}break;
				case "blue":{
					tmpblock.addImage(blueHorBlock);
				}break;
				default:
		}
	}
	else if(direction === "vertical"){
		tmpblock.type = "vertical";
		switch(tmpblock.blkcolor){
			case "green":{
				tmpblock.addImage(greenVertBlock);
			}break;
			case "red":{
				tmpblock.addImage(redVertBlock);
			}break;
			case "gold":{
				tmpblock.addImage(goldVertBlock);
			}break;
			case "blue":{
				tmpblock.addImage(blueVertBlock);
			}break;
			default:
		}
	}
	else if(direction === "empty"){
		tmpblock.type = "empty";
		switch(tmpblock.blkcolor){
			case "green":{
				tmpblock.addImage(greenEmptyBlock);
			}break;
			case "red":{
				tmpblock.addImage(redEmptyBlock);
			}break;
			case "gold":{
				tmpblock.addImage(goldEmptyBlock);
			}break;
			case "blue":{
				tmpblock.addImage(blueEmptyBlock);
			}break;
			default:
		}
	}

	blocks.remove(tmpblock);
	emptyBlocks.add(tmpblock);
}

function randomLines(){
	var coordinates = [];

	for(var i = 0; i < numOfEnemies; i++){
		coordinates.push(createLine(coordinates));
	}

	for(var k = 0; k < coordinates.length; k++){
		for(var j = 0; j < coordinates[k].length; j++){
			xpos = (coordinates[k][j][0]);
			ypos = (coordinates[k][j][1]);

			var direction;
			if(coordinates[k][j][0] != coordinates[k][coordinates[k].length-1][0]){
				direction = "horizontal";
			}
			else if(coordinates[k][j][1] != coordinates[k][coordinates[k].length-1][1]){
				direction = "vertical";
			}
			if(grid[[xpos,ypos]]){
				changeBlock(grid[[xpos,ypos]],direction);
			}
		}
	}
	console.log(coordinates);
}

function createLine(coordinates){
	var tmp  = [];
	var xpos = 0;
	var ypos = 0;

	while(checkIntersection(coordinates,tmp) == true){
		var length = Math.floor(random(2,5));
		var vertFlag = true;
		var ran = getRandomIntInclusive(0,9);

		tmp  = [];
		xpos = randomXPos[ran];  
		ypos = Math.floor(random((height/SPLITHEIGHT)+(GRIDSIZE*1),(height-(GRIDSIZE*6)))/GRIDSIZE) * GRIDSIZE;

		if(Math.random() >= 0.5){ //Vertical
			var tmpPos = xpos;
		}else{ //Horizontal
			var tmpPos = ypos;
			vertFlag = false;
		}

		for (var i = 0; i < length; i++){
			tmp.push([xpos,ypos]);
			if(vertFlag == true){
				ypos+=GRIDSIZE;
			}else{
				xpos+=GRIDSIZE;
			}
		}
	}
	emptyGrid.push(tmp);
	return tmp;
}

function checkIntersection(coordinates,tmp){
	if(tmp.length == 0)
		return true; 

	for(var i = 0; i < coordinates.length; i++){
		for(var j = 0; j < coordinates[i].length; j++){
			for(var k = 0; k < tmp.length; k++){
				if((coordinates[i][j][0] == tmp[k][0]) && (coordinates[i][j][1] == tmp[k][1])){
					return true;
				}
			}
		}
	}

	return false;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function closest (num, arr) {
    var curr = arr[0];
    var diff = Math.abs (num - curr);
    for (var val = 0; val < arr.length; val++) {
        var newdiff = Math.abs (num - arr[val]);
        if (newdiff < diff) {
            diff = newdiff;
            curr = arr[val];
        }
    }
    return curr;
}