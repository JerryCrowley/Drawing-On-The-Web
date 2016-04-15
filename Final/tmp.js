//Jeremiah Crowley
//Drawing on the Web 
//Dig Dug


/*FIX CHANGING DIRECTIONS ON TOP SQUARE */
/*FIX CHANGING DIRECTIONS */

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
var numOfEnemies = 5;
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

var fullBlock;
var vertBlock;
var horBlock;
var emptyBlock;

function preload(){
	//LOAD IMAGES HERE
	diggerRight1 = loadImage("digDug_05.png"); 
	diggerRight2 = loadImage("digDug_07.png");
	diggerLeft1  = loadImage("digDug_21.png");
	diggerLeft2  = loadImage("digDug_23.png");
	diggerUp1	 = loadImage("digDug_88.png");
	diggerUp2    = loadImage("digDug_89.png");
	diggerDown1  = loadImage("digDug_46.png");
	diggerDown2  = loadImage("digDug_48.png"); 

	startGameImage = loadImage("startScreen.png");

	fygarRight1 = loadImage("digDug_164.png");
	fygarRight2 = loadImage("digDug_166.png");
	fygarLeft1  = loadImage("digDug_204.png");
	fygarLeft2  = loadImage("digDug_205.png");
	fygarUp1    = loadImage("digDug_202.png");
	fygarUp2    = loadImage("digDug_203.png");
	fygarDown1  = loadImage("digDug_200.png");
	fygarDown2  = loadImage("digDug_201.png");


	pookaRight1 = loadImage("digDug_207.png");
	pookaRight2 = loadImage("digDug_206.png");
	pookaLeft1  = loadImage("digDug_213.png");
	pookaLeft2  = loadImage("digDug_212.png");
	pookaUp1    = loadImage("digDug_211.png");
	pookaUp2    = loadImage("digDug_210.png");
	pookaDown1  = loadImage("digDug_209.png");
	pookaDown2  = loadImage("digDug_208.png");

	fullBlock   = loadImage("fullBlock.png");
	vertBlock   = loadImage("vertBlock.png");
	horBlock    = loadImage("horBlock.png");
	emptyBlock  = loadImage("emptyBlock.png");
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
}

function draw(){
	if(STARTGAME == false){
		showStartGame();
	}else{
		if(GAMEOVER == false){
			if(LOADLEVEL == false){
				updateSprites(true);
				loadBlocks();
				loadEnemies();
				loadDigger();
				LOADLEVEL = true;

				for(var i = 0; i < enemies.length; i++){
					enemies.get(i).move();
				}
			}

			if(enemies.length > 0){
				for(var i = 0; i < enemies.length; i++){
						enemies.get(i).checkLocation();
						if(enemies.get(i).pausedState > 0){
							enemies.get(i).pausedState-=2;
							if(enemies.get(i).pausedState == 0){
								deflateEnemy(enemies.get(i));
							}
						}
				}
				if(!keyIsPressed){
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
			    }
				if(keyDown(RIGHT_ARROW)){
					digger.changeAnimation('right');
					digger.diggerDirection = RIGHTDIR;
					digger.position.x += DIGGERSPEED;
					digger.prevDirection = RIGHTDIR;
				}
				if(keyDown(UP_ARROW)){
					digger.changeAnimation('up');
					digger.diggerDirection = DOWNDIR;
					digger.position.y -= DIGGERSPEED;
					digger.prevDirection = DOWNDIR;
				}
				if(keyDown(DOWN_ARROW)){
					digger.changeAnimation('down');		
					digger.diggerDirection = UPDIR;
					digger.position.y += DIGGERSPEED;
			    	digger.prevDirection = UPDIR;
				}
				if(keyWentDown('X')){
					hitOnce = 0;
					switch(digger.diggerDirection){
						case RIGHTDIR:{
							var bullet = createSprite(digger.position.x+(GRIDSIZE/2), digger.position.y,GRIDSIZE,5);
						}break;
						case LEFTDIR:{
							var bullet = createSprite(digger.position.x-(GRIDSIZE/2), digger.position.y,-GRIDSIZE,5);
						}break;
						case UPDIR:{
							var bullet = createSprite(digger.position.x, digger.position.y+(GRIDSIZE/2),-GRIDSIZE,5);
						}break;
						case DOWNDIR:{
							var bullet = createSprite(digger.position.x, digger.position.y-(GRIDSIZE/2),GRIDSIZE,5);
						}break;
						default:{
							var bullet = createSprite(digger.position.x+(GRIDSIZE/2), digger.position.y,GRIDSIZE,5);
						}
					}
					
					bullet.depth = enemies.get(0).depth-1;
					bullet.rotation = digger.diggerDirection;
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
			}else{
				showGameOver();
			}
		}else{
		 	showGameOver();
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

	return tmp;
}

function enemy(x,y,type){
	var tmp = createSprite(x,y,GRIDSIZE/2.5,GRIDSIZE/2.5);
	tmp.type = type;
	tmp.prevDirection = RIGHTDIR; 
	tmp.moves = [];
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
	}else if(tmp.type === "pooka"){
		tmp.addAnimation('stillLeft', pookaLeft1);
		tmp.addAnimation("left", pookaLeft1, pookaLeft2);
		tmp.addAnimation('stillRight', pookaRight2);
		tmp.addAnimation('right',pookaRight1,pookaRight2);
		tmp.addAnimation('stillup', pookaUp1);
		tmp.addAnimation('up',pookaUp1,pookaUp2);
		tmp.addAnimation('stillDown', pookaDown1);
		tmp.addAnimation('down',pookaDown1,pookaDown2);
	}

	enemies.add(tmp);

	tmp.move = function() {
		if(this.blowupState == 0){
			var direction = this.checkDirection();
			if(this.moves.length > LENOFTRACK){
				this.moves.pop();
			}
			this.moves.push(direction);
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
		// Math.round((this.position.x) / GRIDSIZE) * GRIDSIZE;
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

		if(!this.intersections[[xpos,ypos]]){
			tmp = [];
			if((leftBlock)&&(leftBlock.type != "full")){
				if(this.prevDirection == LEFTDIR)
					var cond = true;
				else
					var cond = false;
				tmp[LEFT] = [leftBlock,cond];
			}
			if((rightBlock)&&(rightBlock.type != "full")){
				if(this.prevDirection == RIGHTDIR)
					var cond = true;
				else
					var cond = false;
				tmp[RIGHT] = [rightBlock,cond];
			}
			if((upBlock)&&(upBlock.type != "full")){
				if(this.prevDirection == UPDIR)
					var cond = true;
				else
					var cond = false;
				tmp[UP] = [upBlock,cond];
			}
			if((downBlock)&&(downBlock.type != "full")){
				if(this.prevDirection == DOWNDIR)
					var cond = true;
				else
					var cond = false;
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
			}if(tmp[DOWN] && (tmp[DOWN][1] === false)){
				direction = DOWNDIR;
				tmp[DOWN][1] = true;
			}if(tmp[RIGHT] && (tmp[RIGHT][1] === false)){
				direction = RIGHTDIR;
				tmp[RIGHT][1] = true;
			}if(tmp[LEFT] && (tmp[LEFT][1] === false)){
				direction = LEFTDIR;
				tmp[LEFT][1] = true;
			}
		}else if(direction === "vertical"){
			if(tmp[RIGHT] && (tmp[RIGHT][1] === false)){
				direction = RIGHTDIR;
				tmp[RIGHT][1] = true;
			}if(tmp[LEFT] && (tmp[LEFT][1] === false)){
				direction = LEFTDIR;
				tmp[LEFT][1] = true;
			}if(tmp[UP] && (tmp[UP][1] === false)){
				direction = UPDIR;
				tmp[UP][1] = true;
			}if(tmp[DOWN] && (tmp[DOWN][1] === false)){
				direction = DOWNDIR;
				tmp[DOWN][1] = true;
			}
		}
		return direction;
	}

	tmp.updateMoves = function(){
		if((this.velocity.x != -ENEMYSPEED) || (this.velocity.x != ENEMYSPEED)){
			if(this.moves.length > LENOFTRACK){
				this.moves.pop();
			}
			if(this.velocity.x == 1){
				this.moves.push(RIGHTDIR);
			}else if(this.velocity.x == -1){
				this.moves.push(LEFTDIR);
			}
		}

		if((this.velocity.y != -ENEMYSPEED) || (this.velocity.y != ENEMYSPEED)){
			if(this.moves.length > LENOFTRACK){
				this.moves.pop();
			}
			if(this.velocity.y == 1){
				this.moves.push(DOWNDIR);
			}else if(this.velocity.y == -1){
				this.moves.push(UPDIR);
			}
		}
	}

	return tmp;
}


function block(x,y){
	var tmp = createSprite(x,y,GRIDSIZE,GRIDSIZE);
	tmp.addImage(fullBlock)
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
	var ypos = (height/SPLITHEIGHT);

	for(var i = 0; i <= ((height-(height/SPLITHEIGHT))/GRIDSIZE); i++){
		var xpos = GRIDSIZE/2; 

		for(var j = 0; j <= (width/GRIDSIZE); j++){
			if(j%2 == 0)
				var tmpBlock = block(xpos,ypos);
			else
				var tmpBlock = block(xpos,ypos);

			blocks.add(tmpBlock);
			grid[[xpos,ypos]] = tmpBlock;
			xpos += GRIDSIZE;
		}
		ypos += GRIDSIZE; 
	}
	randomLines();
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
			switch(enemy.blowupState){
				case 0:{
					enemy.scale = 1.0;
					enemy.blowupState = 1; 
				}break;
				case 1:{
					enemy.scale = 1.2;
					enemy.blowupState = 2;
				}break;
				case 2:{
					enemy.scale = 1.4;
					enemy.blowupState = 3;
				}break;
				case 3:{
					enemy.scale = 1.6;
					enemy.blowupState = 4;
				}break;
				case 4:{
					enemyKilled(enemy);
				}
				default:
					enemy.scale = 0;
			}
		}
	}
	hitOnce = 1;
}

function deflateEnemy(enemy){
	for(var i = enemy.blowupState; i > 1; i--){
		enemy.scale -= .2;
	}
	enemy.blowupState = 0;
	enemy.setSpeed(ENEMYSPEED,enemy.checkDirection());
}

function diggerKilled(enemy){
	for(var i = 0; i < enemies.length; i++){
		enemies.get(i).setSpeed(0,enemies.get(i).direction);
	}
	console.log('DIGGER KILLED - PLAY DEATH SEQUENCE');
	showGameOver();	
}

function enemyKilled(enemy){
	enemy.remove(); //REMOVE ENEMY ANIMATION
	console.log('ENEMY KILED');
}

function showStartGame(){
	//background(0,0,0);
	image(startGameImage, 0, 0, width, height);
	if(keyIsPressed){
		STARTGAME = true;
	}
}
function showGameOver(){
	updateSprites(false);
	GAMEOVER = true;
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
		tmpblock.addImage(horBlock);
	}
	else if(direction === "vertical"){
		tmpblock.type = "vertical";
		tmpblock.addImage(vertBlock);
	}
	else if(direction === "empty"){
		tmpblock.type = "empty";
		tmpblock.addImage(emptyBlock);
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

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
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