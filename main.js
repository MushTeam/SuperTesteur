window.requestAnimFrame = 	(
	function(){
		return  window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(callback, element){
			window.setTimeout(callback, 1000 / 60);
		};
	}
)();

//global beurk
var context;
var canvasHeight;
var canvasWidth;
var gl;
var controls = {
	up:0,
	down:0,
	right:0,
	left:0
};

var GameLoop = function() {
	var player = new Player();
	var camera = new Camera(level);
	console.log(player.pos);
	this.update = function() {
		console.log("update");
		player.update();
	}
	this.render = function() {
		camera.draw(player);
		player.drawHud();
	}
}




document.addEventListener('keydown', function(event) {
	switch(event.keyCode) {
		case 37:
			controls.left = 1;
		break;
		case 39: 
			controls.right = 1;
		break;
		case 38:
			controls.up = 1;
		break;
		case 40:
			controls.down = 1;
		break;
	};
});
document.addEventListener('keyup', function(event) {
	switch(event.keyCode) {
		case 37:
			controls.left = 0;
		break;
		case 39: 
			controls.right = 0;
		break;
		case 38:
			controls.up = 0;
		break;
		case 40:
			controls.down = 0;
		break;
	};
});

//Fonction  d'initialisation
window.onload = function(){
	var canvas = document.getElementById("canvas");
	canvas.height = canvasHeight = 720;
	canvas.width = canvasWidth = 1280;
	context = canvas.getContext("2d");
	gl = new GameLoop();
	
	run();
}

//boucle d'affichage des frames
function run(){
	requestAnimFrame(run);
	gl.update();
	gl.render();
}