//Jeremiah Crowley
//Drawing on the Web
//Assignment 5 - Java Script

function play(){
	var tmp = document.getElementById('animation');
	tmp.style.animationPlayState="running";	

	var tmp1 = document.getElementById('clickPrompt');
	tmp1.innerHTML = 'Click the play button to play!';
}

function pause(){
	var tmp = document.getElementById('animation');
	tmp.style.animationPlayState="paused";	

	var tmp1 = document.getElementById('clickPrompt');
	tmp1.innerHTML = 'Click the pause button to pause!';
}