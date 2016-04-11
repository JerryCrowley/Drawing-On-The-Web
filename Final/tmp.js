//Jeremiah Crowley
//Drawing on the Web 
//Dig Dug

var LOADLEVEL   = false;
var GRIDSIZE    = 25;
var SPLITHEIGHT = 3;
var SPLITWIDTH  = 2;
var DIGGERSPEED = 5;
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

var digger;
var blocks;
var enemies;
var emptyBlocks;

function setup(){
	createCanvas(600,900);

	blocks      = new Group();
	bullets     = new Group();
	enemies     = new Group();
	emptyBlocks = new Group();
}

function draw(){
	if(LOADLEVEL == false){
		loadBlocks();
		loadEnemies();
		loadDigger();
		LOADLEVEL = true;

		for(var i = 0; i < enemies.length; i++){
			enemies.get(i).move();
		}
	}

	for(var i = 0; i < enemies.length; i++){
			enemies.get(i).checkLocation();
			if(enemies.get(i).pausedState > 0){
				console.log(enemies.get(i).pausedState);
				enemies.get(i).pausedState-=2;
				if(enemies.get(i).pausedState == 0){
					deflateEnemy(enemies.get(i));
				}
			}
	}

	if(keyDown(LEFT_ARROW)){
		digger.diggerDirection = LEFTDIR;
		flipDiggerDirection(digger);
    	digger.position.x -= DIGGERSPEED;
    	digger.prevDirection = LEFTDIR;
    }
	if(keyDown(RIGHT_ARROW)){
		digger.diggerDirection = RIGHTDIR;
		flipDiggerDirection(digger);
		digger.position.x += DIGGERSPEED;
		digger.prevDirection = RIGHTDIR;
	}
	if(keyDown(UP_ARROW)){
		digger.diggerDirection = DOWNDIR;
		flipDiggerDirection(digger);
		digger.position.y -= DIGGERSPEED;
		digger.prevDirection = DOWNDIR;
	}
	if(keyDown(DOWN_ARROW)){		
		digger.diggerDirection = UPDIR;
		flipDiggerDirection(digger);
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

	background(110, 190, 200);

	drawSprites();
}

function digger(){
	var tmp = createSprite(GRIDSIZE,(height/SPLITHEIGHT)-GRIDSIZE,GRIDSIZE/2,GRIDSIZE/2);
	tmp.shapeColor = color(0,0,255);
	tmp.diggerDirection; 
	tmp.diggerPrevDirection;

	return tmp;
}

function enemy(x,y,type){
	var tmp = createSprite(x,y,GRIDSIZE/2,GRIDSIZE/2);
	tmp.shapeColor = type;
	tmp.type = "ex";
	tmp.prevDirection = RIGHTDIR; 
	tmp.moves = [];
	tmp.intersections = [];
	tmp.blowupState = 0.0;
	tmp.pausedState = 0;

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
			this.setSpeed(ENEMYSPEED,direction);
			this.prevDirection = direction;
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
						this.prevDirection = direction;
			    	}break;
			    case DOWNDIR:
			    case UPDIR:{
				    	direction = this.changeDirection('vertical',currentBlock);
						this.setSpeed(ENEMYSPEED,direction);
						this.prevDirection = direction;
			    	}break;
			    default:
			}
		}
	}

	tmp.checkDirection = function(){
		var direction; 

		var xpos  = Math.round((this.position.x) / GRIDSIZE) * GRIDSIZE;
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
			if(leftBlock.type != "full"){
				if(this.prevDirection == LEFTDIR)
					var cond = true
				else
					var cond = false
				tmp[LEFT] = [leftBlock,cond];
			}
			if(rightBlock.type != "full"){
				if(this.prevDirection == RIGHTDIR)
					var cond = true
				else
					var cond = false
				tmp[RIGHT] = [rightBlock,cond];
			}
			if(upBlock.type != "full"){
				if(this.prevDirection == UPDIR)
					var cond = true
				else
					var cond = false
				tmp[UP] = [upBlock,cond];
			}
			if(downBlock.type != "full"){
				if(this.prevDirection == DOWNDIR)
					var cond = true
				else
					var cond = false
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
				direction = flipDirection(this);
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
				direction = flipDirection(this);
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


function block(x,y,color){
	var tmp = createSprite(x,y,GRIDSIZE,GRIDSIZE);
	tmp.shapeColor = color; 
	tmp.type = "full";

	return tmp;
}

function loadDigger(){
	digger = digger();
}

function loadEnemies(){
	for(var i = 0; i < numOfEnemies; i++){
		if(i==0){
			var tmpEnemy = enemy(emptyGrid[i][0][0],emptyGrid[i][0][1],color(100,45,88));
		}else{
			var tmpEnemy = enemy(emptyGrid[i][0][0],emptyGrid[i][0][1],color(10,10,10));
		}
	}
}

function loadBlocks(){
	var ypos = (height/SPLITHEIGHT);

	for(var i = 0; i <= ((height-(height/SPLITHEIGHT))/GRIDSIZE); i++){
		var xpos = 0; 

		for(var j = 0; j <= (width/GRIDSIZE); j++){
			var tmpBlock = block(xpos,ypos,color(153, 102, 51));

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
	enemy.updateMoves();
}

function hitEnemy(enemy){
	flipDirection(enemy);
	enemy.updateMoves();
}

function hitEmptyBlock(enemy,blk){
	if(blk.type != "empty"){
		//enemy.checkDirection(enemy.prevDirection,blk);
		enemy.checkDirection();
		enemy.updateMoves();
	}
}

function diggerHitBlock(digger,blk){
	if((blk.type == "vertical") && (keyDown(LEFT_ARROW) || keyDown(RIGHT_ARROW))){
		if(blk.position.x != digger.position.x){
	    	digger.position.x = blk.position.x;
	    }
		changeBlock(blk,"empty");
	}
	else if((blk.type == "horizontal") && (keyDown(UP_ARROW) || keyDown(DOWN_ARROW))){
		if(blk.position.y != digger.position.y){
	    	digger.position.y = blk.position.y;
		}
		changeBlock(blk,"empty");
	}

	if(keyIsPressed){
		if(((keyCode == UP_ARROW) || (keyCode == DOWN_ARROW)) && (blk.type === 'horizontal')){
			if(blk.position.y != digger.position.y){
		    	digger.position.y = blk.position.y;
		    }
			changeBlock(blk,"empty");
		}else if(((keyCode == LEFT_ARROW) || (keyCode == RIGHT_ARROW)) && (blk.type === 'vertical')){
			if(blk.position.x != digger.position.x){
		    	digger.position.x = blk.position.x;
		    }
			changeBlock(blk,"empty");
		}
	}
}

function diggerHit(dig,blk){
	var tmp = blk;
	switch(digger.diggerDirection) {
	    case RIGHTDIR:{
		    	if(tmp.type === "full"){
		    		if(blk.position.y != dig.position.y){
		    			dig.position.y = blk.position.y;
		    		}
		    		changeBlock(tmp,"horizontal");
		    	}
	    	}	
	        break;
	    case DOWNDIR:{
		    	if(tmp.type === "full"){
		    		if(blk.position.x != dig.position.x){
		    			dig.position.x = blk.position.x;
		    		}
		    		changeBlock(tmp,"vertical");
		    	}
	    	}	
	        break;
	    case LEFTDIR:{
		    	if(tmp.type === "full"){
		    		if(blk.position.y != dig.position.y){
		    			dig.position.y = blk.position.y;
		    		}
		    		changeBlock(tmp,"horizontal");
		    	}
	    	}	
	        break;
	    case UPDIR:{
		    	if(tmp.type === "full"){
		    		if(blk.position.x != dig.position.x){
		    			dig.position.x = blk.position.x;
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
		enemy.setSpeed(0,enemy.checkDirection());
		enemy.pausedState = 30;

		if(keyWentDown('X')){	
			//bullet.life += 10; 
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
	enemy.setSpeed(ENEMYSPEED,enemy.checkDirection());
}

function diggerKilled(enemy){
	enemy.remove();
	console.log('DIGGER KILLED - PLAY DEATH SEQUENCE');
}

function enemyKilled(enemy){
	enemy.remove(); //REMOVE ENEMY ANIMATION
	console.log('ENEMY KILED');
}

function flipDirection(enemy){
	var direction;
	if(enemy.velocity.x != 0){
		if(enemy.velocity.x > 0){
			enemy.prevDirection = RIGHTDIR;
			direction = LEFTDIR;
			enemy.shapeColor = color(200,60,300);
		}
		else{
			enemy.prevDirection = LEFTDIR;
			direction = RIGHTDIR;
			enemy.shapeColor = color(10,10,10);
		}
		enemy.velocity.x *= -1;
	}

	if(enemy.velocity.y != 0){
		if(enemy.velocity.y > 0){
			enemy.prevDirection = DOWNDIR;
			direction = UPDIR;
			enemy.shapeColor = color(100,110,120);
		}
		else{
			enemy.prevDirection = UPDIR;
			direction = DOWNDIR;
			enemy.shapeColor = color(10,10,10);
		}
		enemy.velocity.y *= -1;
	}
	return direction;
}

function flipDiggerDirection(digger){
	switch(digger.diggerDirection) {
	    case RIGHTDIR:
	        digger.shapeColor = color(0,0,255);
	        break;
	    case DOWNDIR:
	        digger.shapeColor = color(0,255,0);
	        break;
	    case LEFTDIR:
	        digger.shapeColor = color(255,0,0);
	        break;
	    case UPDIR:
	        digger.shapeColor = color(0,0,0);
	        break;
	    default:
	        digger.shapeColor = color(0,0,255);
	}
}

function changeBlock(tmpblock,direction){
	xpos = tmpblock.position.x;
	ypos = tmpblock.position.y;

	if(direction === "horizontal"){
		tmpblock.type = "horizontal";
		tmpblock.shapeColor = color(300,340,40);
	}
	else if(direction === "vertical"){
		tmpblock.type = "vertical";
		tmpblock.shapeColor = color(230,100,40);
	}
	else if(direction === "empty"){
		tmpblock.type = "empty";
		tmpblock.shapeColor = color(100,100,100);
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

		tmp  = [];
		xpos = Math.floor(random((GRIDSIZE*1),(width-(GRIDSIZE*6)))/GRIDSIZE) * GRIDSIZE;
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