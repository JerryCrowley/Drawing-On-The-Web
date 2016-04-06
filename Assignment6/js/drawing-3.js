// Jeremiah Crowley - Drawing on the Web
// Drawing 3
var img;
var bird;

function setup() {
  createCanvas(600, 450);
  img = loadImage("flappy-background.png"); 

  //create a sprite
  bird = createSprite((width/2), (height/2), 50, 100);
  
  bird.addAnimation("floating", "bird.png");
  bird.addAnimation("moving", "firstFrame.png", "secondFrame.png", "thirdFrame.png");
  bird.addAnimation("flipped", "flippedFirstFrame.png", "flippedSecondFrame.png", "flippedThirdFrame.png");

  bird.changeAnimation('floating');
  bird.velocity.x = 1; 
}

function draw() {
	// Drawing code goes here
	image(img, 0, 0);

	if(mouseX < bird.position.x - 10) {
		bird.changeAnimation("flipped");
		bird.velocity.x = - 2;
	}
	else if(mouseX > bird.position.x + 10) {
		bird.changeAnimation("moving");
		bird.velocity.x = 2;
	}
	else {
		bird.changeAnimation("floating");
		bird.velocity.x = 0;
	}
  
  	drawSprites();

  	textSize(20);
	text('Use your mouse to move me!', (width/2), 40);
}