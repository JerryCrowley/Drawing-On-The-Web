// Jeremiah Crowley - Drawing on the Web
// Drawing 2
var img;
var bird;

function setup() {
  createCanvas(600, 450);
  img = loadImage("flappy-background.png"); 

  //create a sprite
  bird = createSprite(10, (height/2), 50, 100);
  
  bird.addAnimation("floating", "firstFrame.png", "secondFrame.png", "thirdFrame.png");
  bird.addAnimation("flipped", "flippedFirstFrame.png", "flippedSecondFrame.png", "flippedThirdFrame.png");

  bird.changeAnimation('floating');
  bird.velocity.x = 1; 
}

function draw() {
	// Drawing code goes here
	image(img, 0, 0);

  	if (bird.position.x > (width+bird.width)) {
    	bird.changeAnimation('flipped');
    	bird.velocity.x = -1; 
  	}

  	else if (bird.position.x < (0-bird.width)) {
  		bird.changeAnimation('floating');
    	bird.velocity.x = 1; 	
  	}

  	drawSprites();
}