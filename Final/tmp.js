//Jeremiah Crowley
//Drawing on the Web 
//Dig Dug

var LOADLEVEL   = false;
var GRIDSIZE    = 25;
var SPLITHEIGHT = 3;
var SPLITWIDTH  = 2;
var DIGGERSPEED = 25;
var ENEMYSPEED  = 1;

var numOfEnemies = 3;
var grid         = [];
var emptyGrid    = [];

var digger;
var blocks;
var enemies;
var emptyBlocks;

function setup(){
	createCanvas(600,900);

	blocks      = new Group();
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

	if(keyDown(LEFT_ARROW)){
		digger.diggerDirection = 180;
		flipDiggerDirection(digger);
    	digger.position.x -= DIGGERSPEED;
    }
	if(keyDown(RIGHT_ARROW)){
		digger.diggerDirection = 0;
		flipDiggerDirection(digger);
		digger.position.x += DIGGERSPEED;
	}
	if(keyDown(UP_ARROW)){
		digger.diggerDirection = 90;
		flipDiggerDirection(digger);
		digger.position.y -= DIGGERSPEED;
	}
	if(keyDown(DOWN_ARROW)){		
		digger.diggerDirection = 270;
		flipDiggerDirection(digger);
		digger.position.y += DIGGERSPEED;
	}

	enemies.overlap(emptyBlocks,hitEmptyBlock);
	enemies.overlap(blocks,hitBlock);
	enemies.overlap(enemies,hitEnemy);

	digger.overlap(emptyBlocks,diggerHitBlock);
	digger.overlap(blocks,diggerHit);

	background(110, 190, 200);

	drawSprites();
}

function digger(){
	var tmp = createSprite(GRIDSIZE,(height/SPLITHEIGHT)-GRIDSIZE,GRIDSIZE/2,GRIDSIZE/2);
	tmp.shapeColor = color(0,0,255);
	tmp.diggerDirection = 0; 

	return tmp;
}

function enemy(x,y,type){
	var tmp = createSprite(x,y,GRIDSIZE/2,GRIDSIZE/2);
	tmp.shapeColor = type;
	tmp.type = "ex";
	tmp.prevDirection = 0; 

	enemies.add(tmp);

	tmp.move = function() {
		var direction = this.checkDirection();
		this.setSpeed(ENEMYSPEED,direction);
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
		
		if(currentBlock.type === "horizontal"){
			//Check right
			if((grid[[right,ypos]].type === "horizontal") || (grid[[right,ypos]].type === "empty")){
				direction = 0
			}
			//Check left
			else if((grid[[left,ypos]].type === "horizontal") || (grid[[left,ypos]].type === "empty")){
				direction = 180;
			}
			
			if((grid[[right,ypos]].type === "vertical") || (grid[[left,ypos]].type === "vertical")){
				if((grid[[right,ypos]].type === "horizontal") && (this.velocity.x > 0)){
					direction = 0;
				}else{
					flipDirection(this);
				}
			}
		}
		else if(currentBlock.type === "vertical"){
			//Check down
			if((grid[[xpos,down]].type === "vertical") || (grid[[xpos,down]].type === "empty")){
				direction = 90;
			}
			//Check up
			else if((grid[[xpos,up]].type === "vertical") || (grid[[xpos,up]].type === "empty")){
				direction = 270;
			}
			
			if((grid[[xpos,up]].type  === "horizontal") || (grid[[xpos,down]].type  === "horizontal")){
				if((grid[[xpos,down]].type === "vertical") && (this.velocity.y > 0)){
					direction = 90;
				}else{
					flipDirection(this);
				}
			}
		}
		else if(currentBlock.type === "empty"){
			if((this.prevDirection == 0) || (this.prevDirection == 180)){
				//Check down
				if((grid[[xpos,down]].type === "vertical") || (grid[[xpos,down]].type === "empty")){
					direction = 90;
				}
				//Check up
				else if((grid[[xpos,up]].type === "vertical") || (grid[[xpos,up]].type === "empty")){
					direction = 270;
				}
			}
			else if((this.prevDirection == 90) || (this.prevDirection == 270)){
				//Check right
				if((grid[[right,ypos]].type === "horizontal") || (grid[[right,ypos]].type === "empty")){
					direction = 0
				}
				//Check left
				else if((grid[[left,ypos]].type === "horizontal") || (grid[[left,ypos]].type === "empty")){
					direction = 180;
				}
			}
		}

		this.prevDirection = direction;
		return direction;
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
}

function hitEnemy(enemy){
	flipDirection(enemy);
}

function hitEmptyBlock(enemy){
	enemy.checkDirection();
}

function diggerHitBlock(digger,blk){
	var tmp = blk;

	if(block && (keyDown(LEFT_ARROW) || keyDown(RIGHT_ARROW) || keyDown(UP_ARROW) || keyDown(DOWN_ARROW))){
		changeBlock(tmp,"empty");
	}
}

function diggerHit(dig,blk){
	var tmp = blk;
	switch(digger.diggerDirection) {
	    case 0:{
		    	if(tmp.type === "full"){
		    		changeBlock(tmp,"horizontal");
		    	}
	    	}	
	        break;
	    case 90:{
		    	if(tmp.type === "full"){
		    		changeBlock(tmp,"vertical");
		    	}
	    	}	
	        break;
	    case 180:{
		    	if(tmp.type === "full"){
		    		changeBlock(tmp,"horizontal");
		    	}
	    	}	
	        break;
	    case 270:{
		    	if(tmp.type === "full"){
		    		changeBlock(tmp,"vertical");
		    	}
	    	}	
	        break;
	    default:
	}
}

function flipDirection(enemy){
	if(enemy.velocity.x != 0){
		if(enemy.velocity.x > 0)
			enemy.shapeColor = color(200,60,300);
		else
			enemy.shapeColor = color(10,10,10);
		enemy.velocity.x *= -1;
	}

	if(enemy.velocity.y != 0){
		if(enemy.velocity.y > 0)
			enemy.shapeColor = color(100,110,120);
		else
			enemy.shapeColor = color(10,10,10);
		enemy.velocity.y *= -1;
	}
}

function flipDiggerDirection(digger){
	switch(digger.diggerDirection) {
	    case 0:
	        digger.shapeColor = color(0,0,255);
	        break;
	    case 90:
	        digger.shapeColor = color(0,255,0);
	        break;
	    case 180:
	        digger.shapeColor = color(255,0,0);
	        break;
	    case 270:
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