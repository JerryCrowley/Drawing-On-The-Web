var LOADLEVEL   = false;
var GRIDSIZE    = 25;
var SPLITHEIGHT = 3;
var SPLITWIDTH  = 2;

var numOfEnemies = 5;
var grid         = [];
var emptyGrid    = [];

var blocks;
var enemies;

function setup(){
	createCanvas(600,900);

	blocks  = new Group();
	enemies = new Group();
}

function draw(){
	if(LOADLEVEL == false){
		loadBlocks();
		loadEnemies();
		LOADLEVEL = true;

		for(var i = 0; i < enemies.length; i++){
			enemies.get(i).move();
		}
	}

	enemies.overlap(blocks,hit);

	background(110, 190, 200);

	drawSprites();

}

function digger(){
	
}

function enemy(x,y,type){
	var tmp = createSprite(x,y,GRIDSIZE/2,GRIDSIZE/2);
	tmp.shapeColor = type;
	tmp.type = "ex";

	enemies.add(tmp);

	tmp.move = function() {
		var direction = this.checkDirection();
		this.setSpeed(1,direction);
	}

	tmp.checkDirection = function(){
		var direction; 

		var xpos  = (this.position.x)/GRIDSIZE;
		var ypos  =	((this.position.y)-(height/SPLITHEIGHT))/GRIDSIZE;

		var left  = (this.position.x)-GRIDSIZE;
		var right = (this.position.x)+GRIDSIZE;
		var up    = (this.position.y)-GRIDSIZE;
		var down  = (this.position.y)+GRIDSIZE;
		console.log("RIGHT: "+right+" DOWN: "+down);

		console.log('checking');

		//Check right
		if(!grid[ypos][right/GRIDSIZE]){
			direction = 0
		}
		//Check down
		else if(!grid[((down)-(height/SPLITHEIGHT))/GRIDSIZE][xpos]){
			direction = 90;
		}
		//Check left
		else if(!grid[ypos][left/GRIDSIZE]){
			direction = 180;
		}
		//Check up
		else if(!grid[((up)-(height/SPLITHEIGHT))/GRIDSIZE][xpos]){
			direction = 270;
		}
		return direction;
	}

	return tmp;
}

function hit(enemy, hit){
	if(enemy.velocity.x != 0){
		enemy.velocity.x *= -1;
	}
	if(enemy.velocity.y != 0){
		enemy.velocity.y *= -1;
	}
}

function block(x,y,color){
	var tmp = createSprite(x,y,GRIDSIZE,GRIDSIZE);
	tmp.shapeColor = color; 
	//tmp.setCollider("circle", 0,0, 20);
	return tmp;
}

function killBlock(x,y){
	grid[x][y].remove();
	grid[x][y] = null;
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
	lines = randomLines();
	ypos = (height/SPLITHEIGHT);

	for(var i = 0; i <= ((height-(height/SPLITHEIGHT))/GRIDSIZE); i++){

		blockline = []
		xpos = 0; 

		for(var j = 0; j <= (width/GRIDSIZE); j++){
			var tmpBlock = block(xpos,ypos,color(153, 102, 51));

			blockline.push(tmpBlock);
			blocks.add(tmpBlock);
			xpos += GRIDSIZE;
		}

		grid.push(blockline);
		ypos += GRIDSIZE; 
	}

	for(var k = 0; k < lines.length; k++){
		xpos = (lines[k][0])/GRIDSIZE;
		ypos = ((lines[k][1])-(height/SPLITHEIGHT))/GRIDSIZE;
		if(grid[ypos][xpos])
			grid[ypos][xpos].remove();
		grid[ypos][xpos] = null;
	}
}

function randomLines(){
	var coordinates = [];

	for(var i = 0; i < numOfEnemies; i++){
		var tmp = createLine(coordinates);

		for(var j = 0; j < tmp.length; j++){
			coordinates.push(tmp[j]);
		}
	}

	return coordinates;
}

function createLine(coordinates){
	var tmp  = [];
	var xpos = 0;
	var ypos = 0;

	while(checkIntersection(coordinates,tmp) == true){
		tmp = [];
		var length = Math.floor(random(2,5));
		xpos   = Math.floor(random((GRIDSIZE*1),(width-(GRIDSIZE*6)))/GRIDSIZE) * GRIDSIZE;
		ypos   = Math.floor(random((height/SPLITHEIGHT)+(GRIDSIZE*1),(height-(GRIDSIZE*6)))/GRIDSIZE) * GRIDSIZE;

		var vertFlag = true;

		if(Math.random() >= 0.5){ //Vertical
			console.log("vertical");
			var tmpPos = xpos;
		}else{ //Horizontal
			console.log("horizontal");
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
	for(var i = 0; i < coordinates.length; i++){
		for(var j = 0; j < tmp.length; j++){
			if((coordinates[i][0] === tmp[j][0]) && (coordinates[i][1] === tmp[j][1])){
				return true;
			}
		}
	}
	if(tmp.length === 0){
		console.log("NONE");
		return true; 
	}
	return false;
}