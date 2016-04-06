// Jeremiah Crowley - Drawing on the Web
// Drawing 1
var HIGHSCORE  = 0;
var FIRSTTIME  = true;
var STARTGAME  = false;
var DIFFICULTY = 100;
var GRAVITY    = .5;
var FLAP       = -7;

var bird; 
var pipes;
var topBorder;
var bottomBorder;
var currentScore; 
var birdImg;

function setup() {
	createCanvas(288,384);

	birdImg = loadImage("bird.png");

	createBird();
	createBorder();

	pipes  = new Group();
	camera.position.y = height/2;
	currentScore = 0;
}

function createBorder(){
	topBorder    = createSprite(0,0,width*2,1);
	bottomBorder = createSprite(0,height,width*2,1);
}

function createBird() {
	bird = createSprite((0 + (width/4)), height/2, 36, 26);
	bird.rotateToDirection = true;
	bird.velocity.x = 4;
	bird.setCollider("circle", 0,0,20);
	bird.addImage(birdImg);
}

function createPipe() {
	var pipeWidth   = 52;
	var pipe1Height = random(25,200);
	var pipe1Origin = (height-(pipe1Height/2));

	var pipe1 = createSprite(bird.position.x + width, pipe1Origin, pipeWidth, pipe1Height);

	colorMode(RGB);
	pipe1.shapeColor = color(95,127,50);
	pipes.add(pipe1);

	if(random(0,5) > 1){ //20% chance of creating one pipe
		var pipe2Height = (height-pipe1Height-(bird.height * 4));
		var pipe2Origin = (pipe2Height/2);

		var pipe2 = createSprite(bird.position.x + width, pipe2Origin, pipeWidth, pipe2Height);

		colorMode(RGB);
		pipe2.shapeColor = color(95,127,50);
		pipes.add(pipe2);
	}
}

function draw() {
	if(STARTGAME == true){
		if(mouseDown()){
			bird.velocity.y = FLAP;
		}

		bird.velocity.y += GRAVITY;

		bird.collide(pipes, endGame);
		bird.collide(topBorder, endGame);
		bird.collide(bottomBorder, endGame);

		if(frameCount%DIFFICULTY == 0) {
			createPipe();
		}

	    topBorder.position.x    = bird.position.x + width/4;
	    bottomBorder.position.x = bird.position.x + width/4;
		camera.position.x       = bird.position.x + width/4;

		colorMode(RGB);
		background(110, 190, 200);	

		for(var i = 0; i < pipes.length; i++){
			if(pipes[i].position.x < (bird.position.x-(width/2))){
				pipes[i].remove();
				currentScore++;
				if(DIFFICULTY >= 30){
					DIFFICULTY-=2;
				}
			}
		}
		 
		drawSprites();
	}

	else if(STARTGAME == false){
		// Set text color
	  	fill(0);
	  	textSize(32);

	  	if(FIRSTTIME == true){
	  		var line2Origin = -100;
	  		var line1Origin = -80;
	  		var line3Origin = -80;
	  	}
	  	else{
	  		var line1Origin = (width/5);
	  		var line2Origin = (width/5)-5;
	  		var line3Origin = (width/5);
	  	}

	  	if(FIRSTTIME == false){
	  		var line2 = text('High Score: ' + HIGHSCORE, line2Origin,(height/2));
	  	}

	  	var line1 = text('Flappy Bird',line1Origin,(height/2)-50);
	  	var line3 = text('Click to play', line3Origin, (height/2)+50);
	}
}

function endGame(){
	if(currentScore >= HIGHSCORE){
		HIGHSCORE = currentScore; 
	}

	if(FIRSTTIME == true){
		FIRSTTIME = false;
	}

	bird.remove();
	pipes.removeSprites();
	DIFFICULTY = 100;

	setup();
 
	STARTGAME = false;
}

function mousePressed() {
	if(STARTGAME == false){
		STARTGAME = true;
		bird.velocity.y = .5;
		bird.velocity.x = 5;
	}

	bird.velocity.y = FLAP;
}